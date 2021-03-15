import React, { Component } from 'react'
import './Pulse.css'
import SoundHelper from '../../../SoundHelper'
import SocketHelper from '../../../SocketHelper'
import { DeviceContext } from '../../../Contexts/DeviceContext'

import Progress from './PulseItems/Progress'
import PulseBar from './PulseItems/PulseBar'

import BalanceIcon from '../../../Assets/MenuIcons/calibration.png'
import ToneIcon from '../../../Assets/MenuIcons/icon-tone.png'
// import BezierEasing from 'bezier-easing'

import sig_square from '../../../Assets/MenuIcons/signals/square.png'
import sig_triangle from '../../../Assets/MenuIcons/signals/triangle.png'
import sig_sawtooth from '../../../Assets/MenuIcons/signals/sawtooth.png'
import sig_sine from '../../../Assets/MenuIcons/signals/sine.png'
// import soundHelperInstance from '../../../SoundHelper'

const FrequencyTypes = [
  {
    name: 'square',
    icon: sig_square
  },
  {
    name: 'triangle',
    icon: sig_triangle
  },
  {
    name: 'sine',
    icon: sig_sine
  },
  {
    name: 'sawtooth',
    icon: sig_sawtooth
  }
]

class Pulse extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.rawData = 0
    this.signalCursor = 0

    this.state = {
      threshold: 0,
      gain: 0,
      gold: 0,
      iron: 0,
      cursorIndex: 4 * 200,
      average: 1127,
      datastream: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    SoundHelper.createOscillator('square')
    this.generatePlotString()
    SocketHelper.send('H.1')

  }

  componentWillUnmount() {
    SocketHelper.send('H.0')
    SocketHelper.detach()
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'ok':
          if (this.state.cursorIndex % 4 === 3) {
            if (this.signalCursor === 3) {
              this.signalCursor = 0
            } else {
              this.signalCursor++
            }
            SoundHelper.changeFrequencyType(FrequencyTypes[this.signalCursor].name)
          }
          break
        case 'up':
          this.setState({
            cursorIndex: this.state.cursorIndex - 1
          })
          break;
        case 'down':
          this.setState({
            cursorIndex: this.state.cursorIndex + 1
          })
          break;
        case 'left':
          if (this.state.threshold > 0 && this.state.cursorIndex % 4 === 1)
            this.setState({
              threshold: this.state.threshold - 1
            })
          if (this.state.gain > 0 && this.state.cursorIndex % 4 === 2)
            this.setState({
              gain: this.state.gain - 1
            })
          break;
        case 'right':
          if (this.state.threshold < 6 && this.state.cursorIndex % 4 === 1)
            this.setState({
              threshold: this.state.threshold + 1
            })
          if (this.state.gain < 6 && this.state.cursorIndex % 4 === 2)
            this.setState({
              gain: this.state.gain + 1
            })
          break;
        case 'start':
          this.setState({
            average: parseInt(this.rawData)
          })
          break;
        case 'back':
          clearInterval(this.dataInterval)
          SoundHelper.stopOscillator()
          this.props.navigateTo('menuScreen')
          return;

        default:
          return;
      }
      return
    }
    else if (socketData.type === 'pulse') {
      this.pushDataToStream(socketData.payload)
    }
  }

  pushDataToStream = (newData) => {
    this.rawData = newData

    this.normalizedData = (this.rawData - this.state.average) * (1 + (1 / (7 - this.state.gain)))
    // console.log(this.normalizedData)

    let tempArray = this.state.datastream
    tempArray.push(this.normalizedData)
    tempArray.shift()

    this.setState({
      datastream: tempArray
    })


    if (this.normalizedData > 0) {
      this.setState({
        gold: this.map(this.normalizedData, 0, 920, 0, 100),
        iron: 0
      })
    }
    else if (this.normalizedData < 0) {
      this.setState({
        iron: this.map(Math.abs(this.normalizedData), 0, 920, 0, 100),
        gold: 0
      })
    }


    if (Math.abs(this.normalizedData) > this.state.threshold * 90) {
      SoundHelper.changeFrequencySmooth(Math.abs(this.normalizedData) * 3)
    } else {
      SoundHelper.changeFrequencyFast(0)
    }
  }

  generatePlotString = () => {
    let str = `M`
    this.state.datastream.forEach((e, i) => {
      str += i * 6 + "," + this.map(-1 * e, -1050, 920, 10, 210) + " "
    });
    return str
  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return this.clamp((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min, out_min, out_max);
  }

  clamp = (num, min, max) => {
    return num <= min ? min : num >= max ? max : num;
  }


  render() {
    return (
      <div className="pulse component">

        <div className="pulse-options">

          <div className={`pulse-options-item`} style={{ flexDirection: 'column', background: this.state.cursorIndex % 4 === 0 ? this.context.theme.button_bg_selected : '#000000' }}>
            <img src={BalanceIcon} alt="balance" />
            <div className="label">Ground Balance</div>
          </div>

          <div className={`pulse-options-item`} style={{ flexDirection: 'column', background: this.state.cursorIndex % 4 === 1 ? this.context.theme.button_bg_selected : '#000000' }}>
            <div className="label">Treshold</div>
            <PulseBar value={this.state.threshold} />
          </div>

          <div className={`pulse-options-item`} style={{ flexDirection: 'column', background: this.state.cursorIndex % 4 === 2 ? this.context.theme.button_bg_selected : '#000000' }}>
            <div className="label">Gain</div>
            <PulseBar value={this.state.gain} />
          </div>

          <div className={`pulse-options-item`} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', background: this.state.cursorIndex % 4 === 3 ? this.context.theme.button_bg_selected : '#000000' }}>
            <img src={ToneIcon} alt="balance" style={{ marginBottom: 0 }} />
            <div className="label">Tone</div>
            <img src={FrequencyTypes[this.signalCursor].icon} alt="signal" />
          </div>


        </div>

        <div className="pulse-plot">
          <svg width="550" height="240" xmlns="http://www.w3.org/2000/svg" >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="35%" stopColor="#ffff00" />
                <stop offset="50%" stopColor="#00ff00" />
                <stop offset="65%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#0000ff" />
              </linearGradient>

            </defs>
            <g>
              {/* <path id="svg_1" d="M0,120 120,160 L200,120 " opacity="0.5" strokeWidth="8.5" stroke="#ff0000" fill="#fff" /> */}
              <path d={this.generatePlotString()} strokeWidth="10" fill="transparent" strokeLinejoin="round" stroke="url(#gradient)" />
            </g>
          </svg>
        </div>

        <div className="pulse-info">
          <Progress value={this.state.gold} type="gold" label="NON FERROUS" />
          <Progress value={this.state.iron} type="iron" label="FERROUS" />
        </div>

      </div >
    )
  }
}

export default Pulse