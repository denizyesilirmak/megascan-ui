import React, { Component } from 'react'
import './Pulse.css'
import SoundHelper from '../../../SoundHelper'
import SocketHelper from '../../../SocketHelper'
import { DeviceContext } from '../../../Contexts/DeviceContext'

import Progress from './PulseItems/Progress'
import PulseBar from './PulseItems/PulseBar'

import BalanceIcon from '../../../Assets/MenuIcons/calibration.png'
import ToneIcon from '../../../Assets/MenuIcons/icon-tone.png'

// const FrequencyTypes = ['sawtooth', 'square', 'triangle', 'sine']

class Pulse extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      frequencyTypeIndex: 0,
      threshold: 0,
      gain: 2,
      cursorIndex: 4 * 200,
      datastream: [127, -127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    SoundHelper.createOscillator('square')

    this.dataInterval = setInterval(() => {
      SoundHelper.changeFrequencySmooth((parseInt(Math.random() * 440)))
      this.pushDataToStream()
    }, 60);
  }

  componentWillUnmount() {
    SocketHelper.detach()
    SoundHelper.stopOscillator()
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'ok':

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
  }

  pushDataToStream = () => {
    let data = this.state.datastream
    if (Math.random() < 0.501) {
      data.push(Math.random() * 60)
    } else {
      data.push(Math.random() * -60)
    }
    data.shift(1)
    this.setState({ datastream: data })
  }

  generatePlotString = () => {
    let str = `M`
    this.state.datastream.forEach((e, i) => {
      str += i * 6 + " " + (e + 120) + " "
    });
    return str
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

          <div className={`pulse-options-item`} style={{ flexDirection: 'column', background: this.state.cursorIndex % 4 === 3 ? this.context.theme.button_bg_selected : '#000000' }}>
            <img src={ToneIcon} alt="balance" />
            <div className="label">Tone</div>
          </div>


        </div>

        <div className="pulse-plot">
          <svg width="550" height="240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="35%" stopColor="#ffff00" />
                <stop offset="50%" stopColor="#00ff00" />
                <stop offset="65%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#0000ff" />
              </linearGradient>
            </defs>
            <g>
              {/* <path id="svg_1" d="M0,120 120,160 L200,120 " opacity="0.5" strokeWidth="8.5" stroke="#ff0000" fill="#fff" /> */}
              <path d={this.generatePlotString()} strokeWidth="4" fill="transparent" strokeLinejoin="round" stroke="url(#gradient)" />
            </g>
          </svg>
        </div>

        <div className="pulse-info">
          <Progress value={this.state.datastream[0]} type="gold" label="NON FERROUS" />
          <Progress value={this.state.datastream[30]} type="iron" label="FERROUS" />
        </div>

      </div >
    )
  }
}

export default Pulse