import React, { Component } from 'react'
import './AntennaCalibration.css'
import SocketHelper from '../../SocketHelper'

class AntennaCalibration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotationAngle: -30
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    this.interval = setInterval(() => {
      if (Math.random() < 0.5)
        this.setState({
          rotationAngle: Math.random() * 50
        })
      else
        this.setState({
          rotationAngle: Math.random() * -60
        })
    }, 1000);
  }

  handleSocket = (socketData) => {
    console.log(socketData)
  }

  render() {
    return (
      <div className="antenna-calibration component">
        <div className="title">LRL ANTENNA CALIBRATION</div>
        <div className="radial" />
        <div className="cal-gauge" style={{ transform: `rotate(${this.state.rotationAngle}deg)` }}>
          <span className="degree">{this.state.rotationAngle.toFixed(1)}</span>
        </div>
        <div className="cal-guide" />
      </div>
    )
  }

}

export default AntennaCalibration
