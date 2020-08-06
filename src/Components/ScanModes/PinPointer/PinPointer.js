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

  async componentDidMount() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audio_context = new AudioContext();
    this.oscillator = this.audio_context.createOscillator();
    this.oscillator.frequency.setValueAtTime(0, this.audio_context.currentTime); 
    this.oscillator.start(0)
    this.oscillator.type = "sine"

    this.oscillatorsecond = this.audio_context.createOscillator();
    this.oscillatorsecond.frequency.setValueAtTime(0, this.audio_context.currentTime); 
    this.oscillatorsecond.start(0)
    this.oscillatorsecond.type = "sine"


    // volume = this.audio_context.createGain()
    // this.oscillator.connect(this.volume)
    // this.volume.connect(this.audio_context.desination)
    // this.volume.gain.value = 1

    this.connected = false;
    this.playpause()
    this.setState({
      sensitivity: await dbStorage.getItem('sensitivity_pinpointer') || 5
    })

    socketHelper.attach(this.handleKeyDown)
    this.interval = setInterval(() => {
      socketHelper.send('J')
    }, 60);
  }

  playpause = () => {
    if (!this.connected) {
      this.oscillator.connect(this.audio_context.destination);
      this.oscillatorsecond.connect(this.audio_context.destination);
    }
    else {
      this.oscillator.disconnect();
      this.oscillatorsecond.disconnect();
    }
    this.connected = !this.connected;
  };

  handleKeyDown = async (socketData) => {
    let tmpCalibration = this.state.calibration
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
      // this.oscillator.frequency.value = (tmpCalibration - parseInt(socketData.payload) + 1000 )

      if ((this.state.calibration - parseInt(socketData.payload) > 0)) {
        this.oscillator.type = "sine"
      } else {
        this.oscillator.type = "sawtooth"
      }

      if(Math.abs(this.state.calibration - parseInt(socketData.payload)) > 5 ){
        this.oscillator.frequency.linearRampToValueAtTime((this.state.calibration - parseInt(socketData.payload)) * 4, this.audio_context.currentTime + 0.04);
        this.oscillatorsecond.frequency.linearRampToValueAtTime(((this.state.calibration - parseInt(socketData.payload)) * -8), this.audio_context.currentTime + 0.2);
      }else{
        this.oscillator.frequency.linearRampToValueAtTime(0, this.audio_context.currentTime + 0.05);
        this.oscillatorsecond.frequency.linearRampToValueAtTime(0, this.audio_context.currentTime + 0.05);
      }


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
    this.oscillatorsecond.stop()
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
                  <line key={i} className="pin-pointer-line" fill="none" stroke={this.state.sensorValue / (11 - this.state.sensitivity) > 0 ? e[0] : e[1]} x1={7 + (i * 30)} y1="128" x2={7 + (i * 30)} y2={128 - (this.state.sensorValue / (11 - this.state.sensitivity) * Math.sin(i / 7.1))} id="svg_8" strokeWidth="12" strokeLinecap="butt" />
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