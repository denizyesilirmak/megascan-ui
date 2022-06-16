import React, { Component } from 'react'
import './Pulse.css'
import SoundHelper from '../../../SoundHelper'
import SocketHelper from '../../../SocketHelper'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import dbStorage from '../../../DatabaseHelper'

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

import Kevgir from '../../../Kevgir'

import { clamp } from 'lodash'
import PulseWaitingPopup from '../../PulseWaitingPopup/PulseWaitingPopup'

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

    this.previousValue = 0

    this.rawData = 0
    this.signalCursor = 0

    this.counter = 0
    this.ready = false

    this.rawValue = []
    this.calibration = []
    this.ratio = 0
    this.sens = 0
    this.angle = 0

    this.kevgir = new Kevgir()

    this.state = {
      ready: false,
      threshold: 0,
      gain: 0,
      gold: 0,
      iron: 0,
      cursorIndex: 4 * 200,
      average: 1127,
      rV: 0,
      datastream: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  componentDidMount() {
    this.readFromDb()
    SocketHelper.attach(this.handleSocket)
    SoundHelper.createOscillator('square')
    this.generatePlotString()
    SocketHelper.send('H3')
    const popupTimeOut = setTimeout(() => {
      clearTimeout(popupTimeOut)
      this.setState({ ready: true })
      this.kevgir.calibrate()
    }, 7000)
  }

  componentWillUnmount() {
    this.saveToDb()
    SocketHelper.send('H0')
    SocketHelper.detach()
  }

  readFromDb = async () => {
    try {
      const threshold = await dbStorage.getItem('pulse_threshold') || 0
      const gain = await dbStorage.getItem('pulse_gain') || 0
      console.log(threshold, gain)
      this.setState({
        threshold: threshold,
        gain: gain
      })
    } catch (error) {
      console.log(error)
    }
  }

  saveToDb = async () => {
    await dbStorage.setItem('pulse_threshold', this.state.threshold)
    await dbStorage.setItem('pulse_gain', this.state.gain)
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'ok':
          if (!this.state.ready) {
            return
          }

          if (this.state.cursorIndex % 4 === 3) {
            if (this.signalCursor === 3) {
              this.signalCursor = 0
            } else {
              this.signalCursor++
            }
            SoundHelper.changeFrequencyType(FrequencyTypes[this.signalCursor].name)
          } else if (this.state.cursorIndex % 4 === 0) {
            this.setState({
              average: parseInt(this.rawData)
            })
            this.averageSensor = this.sensor
            this.averageRatio = this.ratio
            this.averageDisc = this.disc
          }
          break
        case 'up':
          if (!this.state.ready) {
            return
          }

          this.setState({
            cursorIndex: this.state.cursorIndex - 1
          })
          break
        case 'down':
          if (!this.state.ready) {
            return
          }

          this.setState({
            cursorIndex: this.state.cursorIndex + 1
          })
          break
        case 'left':
          if (!this.state.ready) {
            return
          }

          if (this.state.threshold > 0 && this.state.cursorIndex % 4 === 1)
            this.setState({
              threshold: this.state.threshold - 1
            })
          if (this.state.gain > 0 && this.state.cursorIndex % 4 === 2)
            this.setState({
              gain: this.state.gain - 1
            })
          break
        case 'right':
          if (!this.state.ready) {
            return
          }

          if (this.state.threshold < 15 && this.state.cursorIndex % 4 === 1)
            this.setState({
              threshold: this.state.threshold + 1
            })
          if (this.state.gain < 6 && this.state.cursorIndex % 4 === 2)
            this.setState({
              gain: this.state.gain + 1
            })
          break
        case 'start':
          if (!this.state.ready) {
            return
          }
          
          this.kevgir.calibrate()

          break
        case 'back':
          clearInterval(this.dataInterval)
          SoundHelper.stopOscillator()
          if (this.context.device === "infinity") {
            this.props.navigateTo('menuScreen')
          } else {
            this.props.navigateTo('menuScreen')
          }
          return

        default:
          return
      }
      return
    }
    else if (socketData.type === 'pulse') {
      //this.rawValue = [socketData.payload, socketData.disc, socketData.ratio]



      //here
      const result = this.kevgir.detectorFunction(socketData)
      if (!result.ready) {
        return
      }
      //console.log(result)

      this.ratio = result.ratio
      this.sens = result.sens
      this.angle = result.angle

      if (result.ratio === 0.5) {
        this.setState({
          gold: 0,
          iron: 0
        })
      } else if (result.ratio > 0.5) {
        this.setState({
          gold: clamp((result.ratio - 0.5) * 400, 0, 100),
          iron: 0
        })
      } else if (result.ratio < 0.5) {
        this.setState({
          iron: clamp((0.5 - result.ratio) * 400, 0, 100),
          gold: 0
        })
      }

      const soundFreq = Math.trunc(this.sens * 1000)
      if (soundFreq > this.state.threshold * 5 + 3) {
        SoundHelper.changeFrequencySmooth(soundFreq + 200)
      } else {
        SoundHelper.changeFrequencySmooth(0)
      }

      const tempStream = this.state.datastream
      tempStream.push(result.sens * 500)
      tempStream.shift()
      this.setState({
        datastream: tempStream
      })

    }
  }

  generatePlotString = () => {
    let str = `M`
    this.state.datastream.forEach((e, i) => {
      const data = clamp((240 - this.map(1 * e, 0, 460, 10, 210)), 0, 550)
      str += i * 6 + "," + data + " "
    })
    return str
  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return clamp((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min, out_min, out_max)
  }

  render() {
    return (
      <>
        <PulseWaitingPopup show={!this.state.ready} />

        <div className="pulse component">
          <img alt="calib" src={BalanceIcon} className="pulse-calibration-icon-a" style={{ display: this.ready ? 'none' : 'block' }} />

          <div className="pulse-options">

            <div className={`pulse-options-item`} style={{ flexDirection: 'column', background: this.state.cursorIndex % 4 === 0 ? this.context.theme.button_bg_selected : '#000000' }}>
              <img src={BalanceIcon} alt="balance" />
              <div className="label">{this.context.strings['groundBalance']}</div>
            </div>

            <div className={`pulse-options-item`} style={{ flexDirection: 'column', background: this.state.cursorIndex % 4 === 1 ? this.context.theme.button_bg_selected : '#000000' }}>
              <div className="label">{this.context.strings['treshold']}</div>
              <PulseBar value={this.state.threshold} />
            </div>

            <div className={`pulse-options-item`} style={{ flexDirection: 'column', background: this.state.cursorIndex % 4 === 2 ? this.context.theme.button_bg_selected : '#000000' }}>
              <div className="label">{this.context.strings['gain']}</div>
              <PulseBar value={this.state.gain} />
            </div>

            <div className={`pulse-options-item`} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', background: this.state.cursorIndex % 4 === 3 ? this.context.theme.button_bg_selected : '#000000' }}>
              <img src={ToneIcon} alt="balance" style={{ marginBottom: 0 }} />
              <div className="label">{this.context.strings['tone']}</div>
              <img src={FrequencyTypes[this.signalCursor].icon} alt="signal" />
            </div>


          </div>

          <div className="pulse-plot">
            <svg width="550" height="240" xmlns="http://www.w3.org/2000/svg" >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ff0000" />
                  <stop offset="35%" stopColor="#ffff00" />
                  <stop offset="50%" stopColor="#ffff00" />
                  <stop offset="65%" stopColor="#00ff00" />
                  <stop offset="100%" stopColor="#00ff00" />
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
      </>
    )
  }
}

export default Pulse