import React, { Component } from 'react'
import '../../../ManualLRL/ManualLRLScan.css'
import DialImage from '../../../../../Assets/MenuIcons/dial.png'
import CompassOut from '../../../../../Assets/MenuIcons/compas-out.png'
import socketHelper from '../../../../../SocketHelper'
import dbStorage from '../../../../../DatabaseHelper'

class CTRLLRLScan extends Component {
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
    this.compassInterval = setInterval(() => {
      this.requestSensorData()
    }, 90);

    this.getCalibrationValues()
  }

  componentWillUnmount() {
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

  clamp = (value, min, max) => {
    if (value <= min) {
      return min
    }
    if (value >= max) {
      return max
    }
    else return value
  }

  handleKeyDown = (socketData) => {
    switch (socketData.payload) {
      case 'ok':

        return
      case 'back':
        // console.log("back")
        clearInterval(this.compassInterval)
        setTimeout(() => {
          this.props.navigateTo("menuScreen")
        }, 500);
        return
      default:
        break
    }

    if (socketData.type === "lrlantenna") {
      const angle = this.clamp(this.map(parseInt(socketData.payload), this.left, this.right, 0, 180) - 90, -90, 90)
      this.setState({
        angle: angle,
        heading: parseInt(socketData.compass) + 720,
        tilt: socketData.angle * 1.3
      })

      // let hertz = 0
      // if (angle < 0) {
      //   hertz = parseInt(angle + 90)
      // } else {
      //   hertz = parseInt(90 - angle)
      // }
      // console.log(hertz)
    }
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

  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
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
            <div style={{ transform: `translateY(${this.state.tilt}px)` }} className="indicator-angle"><span>Normal</span></div>
          </div>
        </div>

        <div className="target">

        </div>
      </div>
    )
  }
}

export default CTRLLRLScan