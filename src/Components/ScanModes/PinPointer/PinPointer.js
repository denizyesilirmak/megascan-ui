import React, { Component } from 'react'
import "./PinPointer.css"
import CalibrationIcon from '../../../Assets/MenuIcons/calibration.png'
import ResetIcon from '../../../Assets/MenuIcons/reset-sensor.png'
import socketHelper from '../../../SocketHelper'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import Sensitivity from './Sensitivity'
import dbStorage from '../../../DatabaseHelper'

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
      calibration: 127,
      selectedButton: 3 * 100,
      sensitivity: 5
    }
  }

  beep = (to) => {
    this.oscillator = this.audio_context.createOscillator();
    this.oscillator.connect(this.audio_context.destination);
    let currentTime = this.audio_context.currentTime;
    if (Math.abs(this.state.sensorValue) > 10) {
      this.oscillator.frequency.value = this.state.sensorValue * 3;
      this.oscillator.start(currentTime);
      this.oscillator.stop(currentTime + 0.1);
    }else{
      // oscillator.frequency.value = 300;
      // oscillator.start(currentTime);
      // oscillator.stop(currentTime + 0.1);
    }
    this.timeout  = setTimeout(() => {
      this.beep()
    }, Math.pow((255 - this.state.sensorValue), 0.9) * 2);
  }

  async componentDidMount() {
    console.log("general volume: ", this.props.generalVolume)
    console.log("search volume: ", this.props.searchVolume)
    this.totalVolume = this.props.searchVolume * this.props.generalVolume / 10000 - 1
    console.log(this.totalVolume)


    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audio_context = new (window.AudioContext || window.webkitAudioContex)({
      latencyHint: 'interactive',
      sampleRate: 3000,
    });

    this.gainnode = this.audio_context.createGain()
    this.gainnode.connect(this.audio_context.destination)


    this.gainnode.gain.value = this.totalVolume

    this.beep(1000)


    this.setState({
      sensitivity: await dbStorage.getItem('sensitivity_pinpointer') || 5
    })

    socketHelper.attach(this.handleKeyDown)
    this.interval = setInterval(() => {
      socketHelper.send('J')
    }, 60);
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
              calibration: this.state.rawSensorValue
            })
          }

          if (this.state.selectedButton % 3 === 1) {
            this.setState({
              calibration: 127
            })
          }
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
        sensorValue: this.state.calibration - parseInt(socketData.payload),
        rawSensorValue: parseInt(socketData.payload),
      })
    }

  }


  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }



  componentWillUnmount() {
    this.oscillator.stop()
    clearTimeout(this.timeout)
    clearInterval(this.interval)
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
                  <line key={i} className="pin-pointer-line" fill="none" stroke={this.state.sensorValue / (11 - this.state.sensitivity) > 0 ? e[0] : e[1]} x1={7 + (i * 30)} y1="128" x2={7 + (i * 30)} y2={(128 - (this.state.sensorValue / (11 - this.state.sensitivity) * Math.sin(i / 7.1)))} id="svg_8" strokeWidth="12" strokeLinecap="butt" />
                )
              })
            }
          </g>
        </svg>

        <div className="pinpointer-button-container">

          <div className="pinpointer-button" style={{ background: this.state.selectedButton % 3 === 0 ? this.context.theme.button_bg_selected : null }}>
            <img src={CalibrationIcon} alt="calibraiton"></img>
            <div className="label">CALIBRATION</div>
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