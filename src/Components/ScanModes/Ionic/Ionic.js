import React, { Component } from 'react'
import './Ionic.css'
import Depth_Icon from '../../../Assets/MenuIcons/icon-depth-2.png'
import IonicVideo from '../../../Assets/ionic.mp4'
import LeftArrow from '../../../Assets/MenuIcons/left-arrow3.png'
import RightArrow from '../../../Assets/MenuIcons/right-arrow3.png'

import LeftRight from '../../../Assets/MenuIcons/leftright.svg'

import LineChart from '../Bionic/LineChat'

import socketHelper from '../../../SocketHelper'

import { DeviceContext } from '../../../Contexts/DeviceContext'

import dbStorage from '../../../DatabaseHelper'

import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const DEPTHMAX = 10
const DEPTHMIN = 0
const DEPTHSTEP = 1


class Ionic extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      cursorIndex: 1000,
      sensitivity: 50,
      gain: 50,
      depth: 10,
      depthPopup: false,
      sensorData: 0,
      calibrationValue: 0
    }
  }

  async componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.ionic.style.opacity = 1
    }, 20);
    this.testInterval = setInterval(() => {
      socketHelper.send('J')
    }, 120);

    this.setState({
      sensitivity: await dbStorage.getItem("ionic_sensitivity") || 50,
      gain: await dbStorage.getItem("ionic_gain") || 50
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

  handleKeyDown = (socketData) => {
    if (socketData.type === 'button') {
      console.log("buttom")
      let tmpCursorIndex = this.state.cursorIndex
      let tmpSensitivity = this.state.sensitivity
      let tmpGain = this.state.gain
      switch (socketData.payload) {
        case 'left':
          console.log("asdasd")
          tmpCursorIndex--
          break;
        case 'right':
          tmpCursorIndex++
          break;
        case 'up':

          break
        case 'down':

          break
        case 'ok':
          break
        case 'start':
          this.setState({
            calibrationValue: this.state.sensorData
          })
          break
        case 'back':
          this.saveToDb()

          clearInterval(this.testInterval);
          console.log("mainmenu: ok")
          this.refs.ionic.style.transform = "translateY(400px)"
          this.refs.ionic.style.opacity = 0


          setTimeout(() => {
            socketHelper.detach()
            this.props.navigateTo("menuScreen")
          }, 500);


          return
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

  componentWillUnmount() {
    socketHelper.detach(this.handleKeyDown)
  }

  saveToDb = () => {
    console.log("ionic save to db")
    dbStorage.setItem("ionic_sensitivity", this.state.sensitivity)
    dbStorage.setItem("ionic_gain", this.state.gain)
  }


  render() {
    return (
      <div ref="ionic" className="ionic component">
        {
          this.state.depthPopup ?
            <div className="depth-popup">
              <img src={Depth_Icon} alt="depthicon" style={{ marginBottom: 10 }} />
              <span style={{ marginBottom: 20 }}>Ionic Depth Selection</span>

              <div className="frequency-selector" style={{ marginBottom: 0 }}>
                <img src={LeftArrow} alt="left" style={{ filter: this.context.theme.arrorHueRotation }} />
                <div className="frequency-value">{this.state.depth} m</div>
                <img src={RightArrow} alt="right" style={{ filter: this.context.theme.arrorHueRotation }} />
              </div>
            </div>
            :
            null
        }


        {/* <div className={`b-button ${(this.state.cursorIndex % 4 === 0) ? "selected" : ""}`} id="depth-button">
          <img src={Depth_Icon} alt="depthicon" />
          <div className="label">Depth</div>
        </div> */}
        {/* 
        <div className={`b-button ${(this.state.cursorIndex % 4 === 1) ? "selected" : ""}`} id="save-button">
          <img src={Save_Icon} alt="saveicon" />
          <div className="label">Save</div>
        </div> */}

        {/* <img className="ionic-icon" src={IonicIcon} alt="ionic" /> */}

        <div className="ionic-value">
          {this.state.sensorData}
        </div>

        <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg" className="ionic-icon">
          <g>
            <ellipse stroke="#ffffff" ry="70" rx="70" id="svg_4" cy="75" cx="75" strokeWidth="6" fill="none" />
            <line strokeLinecap="null" strokeLinejoin="null" id="svg_6" y2="75" x2="150" y1="75" x1="0" strokeOpacity="null" strokeWidth="8" stroke="#fff" fill="none" />
            <line strokeLinecap="null" strokeLinejoin="null" id="svg_9" y2="150" x2="75" y1="0" x1="75" fillOpacity="null" strokeOpacity="null" strokeWidth="8" stroke="#fff" fill="none" />
            <ellipse
              style={{ transition: "0.3s all" }}
              stroke={'#' + (this.state.sensorData < 10 ? '0' : '') + (this.state.sensorData).toString(16) + (255 - this.state.sensorData < 10 ? '0' : '') + (255 - this.state.sensorData).toString(16) + '00'}
              ry={(this.state.sensorData) / 4 + 5 + (this.state.sensitivity + this.state.gain) / 5}
              rx={(this.state.sensorData) / 4 + 5 + (this.state.sensitivity + this.state.gain) / 5} id="svg_2" cy="75" cx="75" strokeWidth="9" fill="#ff000060" />
          </g>
        </svg>

        <video className="ionic-video" src={IonicVideo} autoPlay muted loop />

        <div className="ionic-chart">
          <LineChart value={this.state.sensorData} />
        </div>

        <div className={`dial gain-dial ${(this.state.cursorIndex % 2 === 1) ? "selected" : ""}`}>
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
              textSize: 10,
              pathTransitionDuration: 0.2,
            })}
          />
        </div>

        <div className={`dial sens-dial ${(this.state.cursorIndex % 2 === 0) ? "selected" : ""}`}>
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
              textSize: 10,
              pathTransitionDuration: 0.2,
            })}
          />
        </div>
      </div>
    )
  }
}
export default Ionic