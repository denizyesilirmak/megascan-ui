import React, { Component } from 'react'
import './ManualLRLScan.css'
import DialImage from '../../../Assets/MenuIcons/dial.png'
import CompassOut from '../../../Assets/MenuIcons/compas-out.png'
import socketHelper from '../../../SocketHelper'
import dbStorage from '../../../DatabaseHelper'
import {DeviceContext} from '../../../Contexts/DeviceContext'
import SoundHelper from '../../../SoundHelper'

class ManualLRLScan extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.width = 20
    this.amplitute = 15
    this.signal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    this.state = {
      width: 10,
      angle: 0,
      heading: 0
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    SoundHelper.createOscillator('sawtooth')
    this.compassInterval = setInterval(() => {
      this.requestSensorData()
    }, 150);
    this.getCalibrationValues()
  }

  componentWillUnmount() {
    console.log('osilator stoped')
    SoundHelper.stopOscillator()
    clearInterval(this.compassInterval)
  }

  getCalibrationValues = async () => {
    this.left = await dbStorage.getItem('lrlAntennaLeftEnd')
    this.right = await dbStorage.getItem('lrlAntennaRightEnd')
    // console.log(this.left, this.right)
  }


  requestSensorData = () => {
    socketHelper.send('L')
  }

  handleKeyDown = (socketData) => {
    switch (socketData.payload) {
      case 'ok':

        return
      case 'back':
        console.log("back")
        clearInterval(this.compassInterval)
        setTimeout(() => {
          this.props.navigateTo("manualLRLSettingsScreen")

        }, 500);
        return
      default:
        break
    }

    if (socketData.type === "lrlantenna") {
      const angle = this.clamp(this.map(parseInt(socketData.payload), this.left, this.right, 0, 180) - 90, -90, 90)
      this.setState({
        angle: angle,
        heading: socketData.compass,
        tilt: socketData.angle
      })

      const hertz = Math.abs(this.state.angle)

      if(hertz > 75){
        SoundHelper.changeFrequencyFast(1000)
      }else{
        SoundHelper.changeFrequencyFast('0')
      }
    }
  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  generatePathShape = () => {
    let a_pathString = `
    M${0 * this.state.width} ${20 + this.amplitute} 
    L${1 * this.state.width} ${20 - this.amplitute} 
    L${2 * this.state.width} ${20}
    `

    this.signal.forEach((e, i) => {
      a_pathString += `
      L${(3 + (i * 3)) * this.state.width} ${20 + this.amplitute} 
      L${(4 + (i * 3)) * this.state.width} ${20 - this.amplitute} 
      L${(5 + (i * 3)) * this.state.width} ${20} 
      `
    });
    // console.log(a_pathString)
    return a_pathString
  }

  clamp = (value, min, max) => {
    if (value <= min) {
      return min
    }
    if (value >= max) {
      return max
    }
    else return value
  }

  tiltControl = (tilt) => {
    if (tilt >= 20) {
      return 'low'
    }
    else if (tilt < 20 && tilt > -20) {
      return 'normal'
    }
    else if (tilt <= -20) {
      return 'high'
    }
  }

  render() {
    return (
      <div className="manual-lrl-scan component">
        <div className="compass">
          <img ref="compass" className="compass-out" src={CompassOut} alt="compass-out" style={{ transform: `rotateZ(${this.state.heading}deg)` }} />
        </div>

        <div className="gauge">
          <img className="gauge-dial" src={DialImage} alt="dial" style={{ transform: `rotate(${this.state.angle}deg)` }} />
        </div>

        <svg className="manual-signal" height="40" width="350">
          <path d={this.generatePathShape()} stroke="white" strokeWidth="1" fill="none" />
        </svg>

        <div className="stream-orientation" style={{ position: "absolute", right: "30px" }}>
          <div className="line" >
            <div style={{ transform: `translateY(${this.clamp(this.state.tilt, -130, 130)}px)` }} className="indicator-angle">
              <span>
                {this.context.strings[this.tiltControl(this.state.tilt)]}
              </span>
            </div>
          </div>
        </div>

        <div className="target">

        </div>
      </div>
    )
  }
}
export default ManualLRLScan