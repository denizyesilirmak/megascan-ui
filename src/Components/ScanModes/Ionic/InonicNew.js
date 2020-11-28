import React, { Component } from 'react'
import './IonicNew.css'
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import LeftRight from '../../../Assets/MenuIcons/leftright.svg'
import SocketHelper from '../../../SocketHelper'
import SoundHelper from '../../../SoundHelper'

import { DeviceContext } from '../../../Contexts/DeviceContext'


class Ionic extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.state = {
      value: 0,
      cursorIndex: 4 * 1000,
      sensitivity: 50,
      gain: 50,
      calibrationValue: 0,
      isCalibrated: false,
      newValue: 127
    }
  }

  componentDidMount() {
    SoundHelper.createOscillator('sawtooth')


    SocketHelper.attach(this.handleSocketData)
    this.dataSensorInterval = setInterval(() => {
      SocketHelper.send('J')
    }, 50);
  }

  componentWillUnmount() {
    SoundHelper.stopOscillator()
    clearInterval(this.dataSensorInterval)
  }


  handleSocketData = (socketData) => {
    if (socketData.type === "bionic") {
      if (this.refs.indicator) {
        if (!this.state.isCalibrated) {
          this.refs.indicator.style.width = this.map(parseInt(socketData.payload), 0, 2048, 30, 250) + "px"
          this.refs.indicator.style.height = this.map(parseInt(socketData.payload), 0, 2048, 30, 250) + "px"
        }
      }

      this.setState({
        value: parseInt(socketData.payload)
      })

      if (!this.state.isCalibrated) {
        SoundHelper.changeFrequencySmooth(this.state.value * 2 + 1)
      } else {
        if (this.state.value < this.state.calibrationValue) {
          const mv = this.map(this.state.value, 0, this.state.calibrationValue, 0, 1024)
          if (isNaN(mv)) {
            return
          }
          this.setState({
            newValue: mv
          })
          SoundHelper.changeFrequencySmooth((1024 - mv) * 2 + 1)
          this.refs.indicator.style.background = `rgb(0,0,${this.map(1024 - mv, 0, 1024, 100, 255)})`
          this.refs.indicator.style.width = this.map(1024 - mv, 0, 1024, 30, 250) + "px"
          this.refs.indicator.style.height = this.map(1024 - mv, 0, 1024, 30, 250) + "px"
        } else {
          const mv = 1024 - this.map(this.state.value, this.state.calibrationValue, 2048, 0, 1024)
          if (isNaN(mv)) {
            return
          }
          this.setState({
            newValue: mv
          })
          SoundHelper.changeFrequencySmooth((1024 - mv) * 2 + 1)
          this.refs.indicator.style.background = `rgb(${this.map(1024 - mv, 0, 1024, 100, 255)},0,0)`
          this.refs.indicator.style.width = this.map(1024 - mv, 0, 1024, 30, 250) + "px"
          this.refs.indicator.style.height = this.map(1024 - mv, 0, 1024, 30, 250) + "px"
        }


      }






    }
    else if (socketData.type === "button") {
      let tmpCursorIndex = this.state.cursorIndex
      let tmpSensitivity = this.state.sensitivity
      let tmpGain = this.state.gain
      switch (socketData.payload) {
        case 'left':
          tmpCursorIndex--
          break
        case 'right':
          tmpCursorIndex++
          break
        case 'up':
          if (this.state.cursorIndex % 2 === 1) {
            if (tmpSensitivity < 100)
              tmpSensitivity += 5
          }
          else if (this.state.cursorIndex % 2 === 0) {
            if (tmpGain < 100)
              tmpGain += 5
          }
          break;
        case 'down':
          if (this.state.cursorIndex % 2 === 1) {
            if (tmpSensitivity > 0)
              tmpSensitivity -= 5
          }
          else if (this.state.cursorIndex % 2 === 0) {
            if (tmpGain > 0)
              tmpGain -= 5
          }
          break;

        case 'start':
          this.setState({
            isCalibrated: true,
            calibrationValue: this.state.value
          })
          break
        case 'back':
          clearInterval(this.dataSensorInterval)
          SoundHelper.stopOscillator()
          this.props.navigateTo('menuScreen')
          return
        default:
          return
      }
      this.setState({
        cursorIndex: tmpCursorIndex,
        sensitivity: tmpSensitivity,
        gain: tmpGain
      })
    }
  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return parseInt((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
  }

  render() {
    return (
      <div className="ionic-new component">


        <div className={`dial gain-dial ${(this.state.cursorIndex % 2 === 0) ? "selected" : ""}`}>
          <div className="dial-label">{this.context.strings["gain"]}</div>
          <span>{this.state.gain}</span>
          <img alt="left-right" src={LeftRight} className="left-right-icon"></img>
          <CircularProgressbar
            value={this.state.gain}
            background
            backgroundPadding={3}
            styles={buildStyles({
              backgroundColor: "#1bc122",
              textColor: "#000",
              pathColor: "#000",
              trailColor: "transparent",
              textSize: 11,
              pathTransitionDuration: 0.1,

            })}
          />
        </div>


        <div className={`dial sens-dial ${(this.state.cursorIndex % 2 === 1) ? "selected" : ""}`}>
          <div className="dial-label">{this.context.strings["sensitivity"]}</div>
          <span>{this.state.sensitivity}</span>
          <img alt="left-right" src={LeftRight} className="left-right-icon"></img>
          <CircularProgressbar
            value={this.state.sensitivity}
            background
            backgroundPadding={3}
            styles={buildStyles({
              backgroundColor: "#1bc122",
              textColor: "#000",
              pathColor: "#000",
              trailColor: "transparent",
              textSize: 11,
              pathTransitionDuration: 0.1,
            })}
          />
        </div>


        <div className="ionic-radar">
          <div className="radar-indicator" ref="indicator" />
        </div>
      </div>
    )
  }
}

export default Ionic