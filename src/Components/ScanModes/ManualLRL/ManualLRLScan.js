import React, { Component } from 'react'
import './ManualLRLScan.css'
import DialImage from '../../../Assets/MenuIcons/dial.png'
import CompassOut from '../../../Assets/MenuIcons/compas-out.png'
import socketHelper from '../../../SocketHelper'

class ManualLRLScan extends Component {
  constructor(props) {
    super(props)
    this.width = 20
    this.amplitute = 15
    this.signal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    this.state = {
      width: 10,
      angle: 0
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    this.compassInterval = setInterval(() => {
      this.requestSensorData()
    }, 150);
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
          this.props.navigateTo("menuScreen")
        }, 500);
        return
      default:
        break
    }

    if(socketData.type === "lrlantenna"){
      this.setState({
        angle: (parseInt(socketData.payload) - 40) * 1.2
      })
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

  render() {
    return (
      <div className="manual-lrl-scan component">
        <div className="compass">
          <img ref="compass" className="compass-out" src={CompassOut} alt="compass-out" />
        </div>

        <div className="gauge">
          <img className="gauge-dial" src={DialImage} alt="dial" style={{transform: `rotate(${this.state.angle}deg)`}} />
        </div>

        <svg className="manual-signal" height="40" width="350">
          <path d={this.generatePathShape()} stroke="white" strokeWidth="1" fill="none" />
        </svg>

        <div className="stream-orientation" style={{ position: "absolute", right: "30px" }}>
          <div className="line" >
            <div ref="indicatorRef" className="indicator-angle"><span>Normal</span></div>
          </div>
        </div>

        <div className="target">

        </div>
      </div>
    )
  }
}
export default ManualLRLScan