import React, { Component } from 'react'
import "./PinPointer.css"
import CalibrationIcon from '../../../Assets/MenuIcons/calibration.png'
import ResetIcon from '../../../Assets/MenuIcons/reset-sensor.png'
import socketHelper from '../../../SocketHelper'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import Sensitivity from './Sensitivity'
import dbStorage from '../../../DatabaseHelper'
import SoundHelper from '../../../SoundHelper'

const lines = [
  ["#26ff00", "#26ff00",],
  ["#28ff03", "#28ff03",],
  ["#42ff08", "#42ff08",],
  ["#7eff09", "#7eff09",],
  ["#93fe04", "#34f4a9",],
  ["#e5fe03", "#42ff08",],
  ["#fafb03", "#36f3b3",],
  ["#f9ce0f", "#34f4a9",],
  ["#f9b412", "#43edf7",],
  ["#f87f15", "#42c6ff",],
  ["#f84e11", "#3e8bff",],
  ["#f81806", "#3c61fe",],//--
  ["#f81806", "#3c61fe",],//--
  ["#f87f15", "#3e8bff",],
  ["#f9b412", "#42c6ff",],
  ["#f9ce0f", "#43edf7",],
  ["#fafb03", "#42eef0",],
  ["#e5fe03", "#34f4a9",],
  ["#93fe04", "#34f4a9",],
  ["#7eff09", "#7eff09",],
  ["#42ff08", "#42ff08",],
  ["#28ff03", "#28ff03",],
  ["#28ff03", "#28ff03",],
]


class PinPointer extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.state = {
      sensorValue: 0,
      calibration: 512,
      selectedButton: 3 * 100,
      sensitivity: 5
    }
  }



  async componentDidMount() {
    SoundHelper.createOscillator('sawtooth');
    this.setState({
      sensitivity: await dbStorage.getItem('sensitivity_pinpointer') || 5
    })

    socketHelper.attach(this.handleKeyDown)
    this.interval = setInterval(() => {
      socketHelper.send('J')
    }, 60);
  }

  componentWillUnmount() {
    SoundHelper.stopOscillator()
    clearTimeout(this.timeout)
    clearInterval(this.interval)
  }

  handleKeyDown = async (socketData) => {
    // let tmpCalibration = this.state.calibration
    if (socketData.type === 'button') {
      let tmpSelectedButton = this.state.selectedButton
      switch (socketData.payload) {
        case 'left':
          tmpSelectedButton--
          break
        case 'right':
          tmpSelectedButton++
          break
        case 'up':
          if (this.state.selectedButton % 3 === 2) {
            if (this.state.sensitivity < 10)
              this.setState({
                sensitivity: this.state.sensitivity + 1
              })
          }
          break;
        case 'down':
          if (this.state.selectedButton % 3 === 2) {
            if (this.state.sensitivity > 0)
              this.setState({
                sensitivity: this.state.sensitivity - 1
              })
          }
          break;
        case 'ok':
          if (this.state.selectedButton % 3 === 0) {
            this.setState({
              calibration: this.state.rawSensorValue / 8
            })
          }

          if (this.state.selectedButton % 3 === 1) {
            this.setState({
              calibration: 127
            })
          }
          break

        case 'start':
          this.setState({
            calibration: this.state.rawSensorValue / 8
          })
          break
        case 'back':
          await dbStorage.setItem('sensitivity_pinpointer', this.state.sensitivity)
          clearInterval(this.interval)
          this.props.navigateTo("menuScreen")
          return
        default:
          break
      }

      this.setState({
        selectedButton: tmpSelectedButton
      })
    }
    else if (socketData.type === "bionic") {
      this.setState({
        sensorValue: this.clamp(this.state.calibration - parseInt(socketData.payload / 8), -127, 127) * -1,
        rawSensorValue: parseInt(socketData.payload),
      })
      // console.log((this.state.calibration - parseInt(socketData.payload / 8)))
      SoundHelper.changeFrequencySmooth(Math.abs(this.state.sensorValue * 4))
    }

  }


  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
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
      <div className="pin-pointer component">
        <svg className="pin-pointer-grid" width="700" height="260">
          <g>
            <rect fill="#000" x="0.49995" y="0.43749" width="699" height="259" id="svg_2" stroke="#ffffff80" />
            <line fill="none" stroke="#ffffff60" x1="0" y1="128" x2="700" y2="128" id="svg_3" />
            <line fill="none" stroke="#ffffff60" x1="0" y1="65" x2="700" y2="65" id="svg_4" />
            <line fill="none" stroke="#ffffff60" x1="0" y1="195" x2="700" y2="195" id="svg_5" />
            <line fill="none" stroke="#ffffff60" x1="350" y1="0" x2="350" y2="300" id="svg_6" />
            <line fill="none" stroke="#ffffff60" x1="525" y1="0" x2="525" y2="300" id="svg_7" />
            <line fill="none" stroke="#ffffff60" x1="175" y1="0" x2="175" y2="300" id="svg_8" />
          </g>
        </svg>

        <svg className="pin-pointer-lines" width="700" height="260">
          <g>
            <rect fill="none" x="0.49995" y="0.43749" width="699" height="259" id="svg_2" stroke="#ffffff80" />
            {
              lines.map((e, i) => {
                return (
                  <line key={i} className="pin-pointer-line" fill="none" stroke={this.state.sensorValue / (11 - this.state.sensitivity) < 0 ? e[1] : e[0]} x1={7 + (i * 30)} y1="128" x2={7 + (i * 30)} y2={(128 - (this.state.sensorValue / (11 - this.state.sensitivity) * Math.sin(i / 7.1)))} id="svg_8" strokeWidth="12" strokeLinecap="butt" />
                )
              })
            }
          </g>
        </svg>

        <div className="pinpointer-button-container">

          <div className="pinpointer-button" style={{ background: this.state.selectedButton % 3 === 0 ? this.context.theme.button_bg_selected : null }}>
            <img src={CalibrationIcon} alt="calibraiton"></img>
            <div className="label">{this.context.strings["calibration"]}</div>
          </div>

          <div className="pinpointer-button" style={{ background: this.state.selectedButton % 3 === 1 ? this.context.theme.button_bg_selected : null }}>
            <img src={ResetIcon} alt="calibraiton"></img>
          </div>

          <Sensitivity
            value={this.state.sensitivity}
            selected={this.state.selectedButton % 3 === 2}
          />

        </div>


      </div>
    )
  }
}

export default PinPointer