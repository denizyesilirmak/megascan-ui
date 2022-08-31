import React from 'react'
import './Pulse3.css'
import Indicator from './PulseItems/Indicator'
import Bar from './PulseItems/Bar'

import SocketHelper from '../../../SocketHelper'
import SoundHelper from '../../../SoundHelper'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import Kevgir from '../../../Kevgir'
import KalmanFilter from 'kalmanjs'
import PulseWaitingPopup from '../../PulseWaitingPopup/PulseWaitingPopup'


class Pulse3 extends React.Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.historyArray = new Array(100).fill(0)
    this.kevgir = new Kevgir()
    this.kalman = new KalmanFilter({ R: 0.1, Q: 400 })
    this.absoluteMax = 0
    this.soundToggler = false
    this.time = 0
    this.resultArr = new Array(10).fill(0)


    this.state = {
      raw_value: 0,
      value: 0,
      average: 1108,
      cursor: true,
      sensitivity: 0,
      treshold: 0,
      ratio: 0.5
    }

  }

  componentDidMount() {
    console.log('pulse3-in')
    SocketHelper.attach(this.handleSocket)
    SoundHelper.createOscillator('square')
    SocketHelper.send('H1')
    const popupTimeOut = setTimeout(() => {
      clearTimeout(popupTimeOut)
      this.setState({ ready: true })
      this.kevgir.calibrate()
    }, 7000)
  }

  componentWillUnmount() {
    console.log('pulse3-out')

    SoundHelper.stopOscillator()
    SocketHelper.send('H0')
    SocketHelper.detach()

  }

  handleSocket = (socketData) => {
    //console.log(socketData)
    if (socketData.type === 'button') {
      this.handleButton(socketData.payload)
    }
    else if (socketData.type === 'pulse') {
      const result = this.kevgir.detectorFunction(socketData)
      if (!result.ready) {
        return
      }

      this.setState({
        value: result.sens * 1000,
        ratio: result.ratio
      })


      this.resultArr.push(result.sens)
      this.resultArr.shift()

      const slope = (this.resultArr[0] - this.resultArr[this.resultArr.length - 1] < 0)

      if (slope && result.sens * 600 > (this.state.treshold * 4) + 2) {
        if (result.ratio > 0.6) {
          SoundHelper.changeFrequencyFast(800)
        } else if (result.ratio < 0.4) {
          SoundHelper.changeFrequencyFast(400)
        } else if (result.ratio === 0.5) {
          SoundHelper.changeFrequencyFast(50)
        }
      } else {

        SoundHelper.changeFrequencyFast(0)
      }
    }

  }

  handleButton = (button) => {
    switch (button) {
      case 'left':
        this.setState({
          cursor: true
        })
        break
      case 'right':
        this.setState({
          cursor: false
        })
        break
      case 'up':
        if (this.state.cursor) {
          this.setState({
            sensitivity: this.clamp(this.state.sensitivity - 1, 0, 8)
          }, () => {
            this.kevgir.kf.Q = this.state.sensitivity * 10
          })
        }
        else {
          this.setState({
            treshold: this.clamp(this.state.treshold - 1, 0, 8)
          }, () => {
            this.kevgir.kf.Q = this.state.sensitivity * 10
          })
        }
        break
      case 'down':
        if (this.state.cursor) {
          this.setState({
            sensitivity: this.clamp(this.state.sensitivity + 1, 0, 8)
          })
        }
        else {
          this.setState({
            treshold: this.clamp(this.state.treshold + 1, 0, 8)
          })
        }
        break
      case 'start':
        this.kevgir.calibrate()
        break
      case 'back':
        this.props.navigateTo('detectorModeSelectorScreen')
        return

      default:
        break
    }
  }

  history = (value, raw) => {
    this.setState({
      value: value,
      raw_value: raw
    }, () => {
      this.generateSound(this.state.value)
    })
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
      <>
        <PulseWaitingPopup show={!this.state.ready} />
        <div className="component pulse-3">
          <div className="left">
            <Bar
              label={this.context.strings['sensitivity']}
              left={true}
              level={this.state.sensitivity}
              active={this.state.cursor}
            />
          </div>

          <div className="middle">
            <Indicator
              value={Math.abs(this.state.value)}
              disc={this.state.ratio}
            />
          </div>

          <div className="right">
            <Bar
              label={this.context.strings['treshold']}
              left={false}
              level={this.state.treshold}
              active={!this.state.cursor}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Pulse3