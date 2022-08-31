import React, { Component } from 'react'
import './AntennaCalibration.css'
import SocketHelper from '../../SocketHelper'
import dbStorage from '../../DatabaseHelper'

class AntennaCalibration extends Component {
  constructor(props) {
    super(props)
    this.rawPotValue = 0
    this.state = {
      rotationAngle: 0,
      left: 0,
      center: 0,
      right: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    this.interval = setInterval(() => {
      SocketHelper.send('L')
    }, 150)
  }

  componentWillUnmount() {
    SocketHelper.detach()
    clearInterval(this.interval)
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'back':
          this.props.navigateTo('menuScreen')
          return
        case 'left':
          this.setState({
            left: this.rawPotValue
          })
          break
        case 'right':
          this.setState({
            right: this.rawPotValue
          })
          break

        case 'ok':
        case 'start':
          dbStorage.setItem('lrlAntennaLeftEnd', this.state.left)
          dbStorage.setItem('lrlAntennaRightEnd', this.state.right)
          break

        default:
          return
      }
    }
    else if (socketData.type === 'lrlantenna') {
      //sağın solun limitlerini al.
      this.rawPotValue = parseInt(socketData.payload)
      const angle = this.clamp(this.map(this.rawPotValue, 46, 778, 0, 180) - 90, -90, 90)
      this.setState({
        rotationAngle: (angle)
      })
    }
  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
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

  render() {
    return (
      <div className="antenna-calibration component">
        <div className="title">LRL ANTENNA CALIBRATION</div>
        <div className="radial" />
        <div className="cal-gauge" style={{ transform: `rotate(${this.state.rotationAngle}deg)` }}>
          <span className="degree">{this.state.rotationAngle.toFixed(1)}</span>
        </div>
        <div className="cal-guide" />

        <div className="cal-infos">
          <div>0. If you dont know what this menu is about. Press BACK!</div>
          <div>1. Turn antenna to left end, and press LEFT</div>
          <div>2. Turn antenna to right end, and press RIGHT</div>
          <div>3. Save settings by pressing OK or START, then press BACK to exit.</div>
        </div>

        <div className="cal-values">
          <div>
            LEFT: {this.state.left}
          </div>
          <div>
            CENTER: {((this.state.left + this.state.right) / 2).toFixed(1)}
          </div>
          <div>
            RIGHT: {this.state.right}
          </div>
          <div>
            VALUE: {this.rawPotValue}
          </div>
        </div>

      </div>
    )
  }

}

export default AntennaCalibration
