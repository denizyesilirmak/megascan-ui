import React, { Component } from 'react'
import './Bionic.css'
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import socketHelper from '../../../SocketHelper'

import Bionic_Rotator from '../../../Assets/MenuIcons/bionic-rotator.png'
import LeftRight from '../../../Assets/MenuIcons/leftright.svg'
import LineChart from './LineChat'

import dbStorage from '../../../DatabaseHelper'

class Bionic extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sensorData: 0,
      cursorIndex: 4 * 1000,
      sensitivity: 50,
      gain: 50
    }
  }

  async componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
   
    setTimeout(() => {
      this.refs.bionic.style.opacity = 1
    }, 20);
    this.testInterval = setInterval(() => {
      socketHelper.send('J')
    }, 60);


    this.setState({
      sensitivity: await dbStorage.getItem("bionic_sensitivity") || 50,
      gain: await dbStorage.getItem("bionic_gain") || 50,
    })
  }

  handleKeyDown = (socketData) => {
    if (socketData.type === 'button') {
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
        case 'ok':

          return
        case 'back':
          clearInterval(this.testInterval);
          this.refs.bionic.style.opacity = 0
          this.refs.bionic.style.transform = "translateY(400px)"
          this.saveToDb()

          setTimeout(() => {
            this.props.navigateTo("menuScreen")
          }, 500);
          break
        default:
          break
      }
      this.setState({
        cursorIndex: tmpCursorIndex,
        sensitivity: tmpSensitivity,
        gain: tmpGain
      })
    }
    else if (socketData.type === 'bionic') {
      this.setState({
        sensorData: parseInt(socketData.payload)
      })
    }
  }


  saveToDb = () => {
    dbStorage.setItem("bionic_sensitivity", this.state.sensitivity)
    dbStorage.setItem("bionic_gain", this.state.gain)
  }

  render() {
    return (
      <div ref="bionic" className="bionic component">
        <div className="rotating-indicator-container">
          <img ref="Rotator" className="rotator" src={Bionic_Rotator} alt="rotator" style={{ transform: `rotate(${this.state.sensorData * 1.4 - 20}deg)`, filter: `hue-rotate(${-this.state.sensorData / 2 - 30}deg)` }} />
        </div>

        <div className="line-chart">
          <LineChart value={this.state.sensorData} />
        </div>

        <div className={`dial gain-dial ${(this.state.cursorIndex % 2 === 0) ? "selected" : ""}`}>
          <span>{this.state.gain}</span>
          <img alt="left-right" src={LeftRight} className="left-right-icon"></img>
          <CircularProgressbar
            value={this.state.gain}
            text="Gain"
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
          <span>{this.state.sensitivity}</span>
          <img alt="left-right" src={LeftRight} className="left-right-icon"></img>
          <CircularProgressbar
            value={this.state.sensitivity}
            text="Sensitivity"
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
      </div>
    )
  }
}
export default Bionic