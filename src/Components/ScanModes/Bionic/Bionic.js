import React, { Component } from 'react'
import './Bionic.css'
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import socketHelper from '../../../SocketHelper'

import Depth_Icon from '../../../Assets/MenuIcons/icon-depth-2.png'
import Save_Icon from '../../../Assets/MenuIcons/icon-save-outline.png'
import Bionic_Rotator from '../../../Assets/MenuIcons/bionic-rotator.png'

import LineChart from './LineChat'


class Bionic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sensorData: 0,
      cursorIndex: 4 * 1000
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.bionic.style.opacity = 1
    }, 20);
    this.testInterval = setInterval(() => {
      socketHelper.send('Q')
    }, 60);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type === 'button') {
      let tmpCursorIndex = this.state.cursorIndex
      switch (socketData.payload) {
        case 'left':
          tmpCursorIndex--
          break
        case 'right':
          tmpCursorIndex++
          break
        case 'down':

          break
        case 'up':

          break
        case 'ok':

          return
        case 'back':
          clearInterval(this.testInterval);
          this.refs.bionic.style.opacity = 0
          this.refs.bionic.style.transform = "translateY(400px)"
          setTimeout(() => {
            this.props.navigateTo("menuScreen")
          }, 500);
        default:
          break
      }
      this.setState({
        cursorIndex: tmpCursorIndex
      })
    }
    else if (socketData.type === 'sensor') {
      this.setState({
        sensorData: socketData.payload
      })
    }
  }

  render() {
    return (
      <div ref="bionic" className="bionic component">

        <div className={`b-button ${(this.state.cursorIndex % 4 === 0) ? "selected" : ""}`} id="depth-button">
          <img src={Depth_Icon} alt="depthicon" />
          <div className="label">Depth</div>
        </div>

        <div className={`b-button ${(this.state.cursorIndex % 4 === 3) ? "selected" : ""}`} id="save-button">
          <img src={Save_Icon} alt="saveicon" />
          <div className="label">Save</div>
        </div>

        <div className="rotating-indicator-container">
          <img ref="Rotator" className="rotator" src={Bionic_Rotator} alt="rotator" />
        </div>

        <div className="line-chart">
          <LineChart value={this.state.sensorData} />
        </div>

        <div className={`dial gain-dial ${(this.state.cursorIndex % 4 === 1) ? "selected" : ""}`}>
          <CircularProgressbar
            value={20}
            text="Gain"
            background
            backgroundPadding={3}
            styles={buildStyles({
              backgroundColor: "#1bc122",
              textColor: "#000",
              pathColor: "#000",
              trailColor: "transparent",
              textSize: 11
            })}
          />
        </div>

        <div className={`dial sens-dial ${(this.state.cursorIndex % 4 === 2) ? "selected" : ""}`}>
          <CircularProgressbar
            value={50}
            text="Sensitivity"
            background
            backgroundPadding={3}
            styles={buildStyles({
              backgroundColor: "#1bc122",
              textColor: "#000",
              pathColor: "#000",
              trailColor: "transparent",
              textSize: 11
            })}
          />
        </div>


      </div>
    )
  }
}
export default Bionic