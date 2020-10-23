import React, { Component } from 'react'
import "./TurnOff.css"
import socketHelper from '../../SocketHelper'
import TurnOffIcon from "../../Assets/MenuIcons/turn-off.png"
import { DeviceContext } from '../../Contexts/DeviceContext'

class TurnOff extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.state = {
      yesNo: false,
      lrlantennacalibrationcounter: 0,
      groundscancalibrationcounter: 0
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.turnOff.style.opacity = 1
      this.refs.turnOff.style.transform = 'scale(1)'
    }, 15);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempIndex = this.state.yesNo
    switch (socketData.payload) {
      case 'ok':
        if (this.state.yesNo % 2 === 1) {
          socketHelper.send(JSON.stringify({
            type: 'settings',
            mode: 'turnoff'
          }))
        }
        else if (this.state.yesNo % 2 === 0) {
          this.refs.turnOff.style.transform = "translateY(400px)"
          this.refs.turnOff.style.opacity = 0
          setTimeout(() => {
            socketHelper.detach()
            this.props.navigateTo("menuScreen")
          }, 500);
        }
        return
      case 'left':
        tempIndex = !tempIndex
        break
      case 'right':
        tempIndex = !tempIndex
        break
      case 'up':
        if (this.state.lrlantennacalibrationcounter < 8) {
          this.setState({
            lrlantennacalibrationcounter: this.state.lrlantennacalibrationcounter + 1
          })
        } else {
          this.props.navigateTo('antennaCalibrationScreen')
        }
        return

      case 'down':
        if (this.state.groundscancalibrationcounter < 8) {
          this.setState({
            groundscancalibrationcounter: this.state.groundscancalibrationcounter + 1
          })
        } else {
          this.props.navigateTo('groundScanSensorCalibration')
        }
        return
      case 'back':
        console.log("mainmenu: ok")
        this.refs.turnOff.style.transform = "translateY(400px)"
        this.refs.turnOff.style.opacity = 0

        setTimeout(() => {
          socketHelper.detach()
          this.props.navigateTo("menuScreen")
        }, 500);
        return
      default:
        break
    }

    this.setState({
      yesNo: tempIndex
    })
  }

  render() {
    return (
      <div ref="turnOff" className="turn-off component">
        <img alt="turn-off" className="turn-off-icon" src={TurnOffIcon} />
        <div className="question">
          {this.context.strings["turnoffquestion"]}
        </div>
        <div className="turn-off-buttons">
          <div style={{ background: this.state.yesNo ? this.context.theme.button_bg_selected : null, borderColor: this.context.theme.border_color }} className={`button ${this.state.yesNo ? "selected" : ""}`}>{this.context.strings['yes']}</div>
          <div style={{ background: !this.state.yesNo ? this.context.theme.button_bg_selected : null, borderColor: this.context.theme.border_color }} className={`button ${!this.state.yesNo ? "selected" : ""}`}>{this.context.strings['no']}</div>
        </div>

      </div>
    )
  }
}
export default TurnOff