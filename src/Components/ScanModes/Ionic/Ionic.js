import React, { Component } from 'react'
import './Ionic.css'
import Depth_Icon from '../../../Assets/MenuIcons/icon-depth-2.png'
import Save_Icon from '../../../Assets/MenuIcons/icon-save-outline.png'
import IonicVideo from '../../../Assets/ionic.mp4'
import IonicIcon from '../../../Assets/MenuIcons/ionic-icon.png'

import LineChart from '../Bionic/LineChat'

import socketHelper from '../../../SocketHelper'

import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';



class Ionic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursorIndex: 1000,
      sensitivity: 50,
      gain: 50
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    console.log("connected")
    setTimeout(() => {
      this.refs.ionic.style.opacity = 1
    }, 20);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tmpCursorIndex = this.state.cursorIndex
    let tmpSensitivity = this.state.sensitivity
    let tmpGain = this.state.gain
    switch (socketData.payload) {
      case 'up':
        console.log("ionic up")
        if (this.state.cursorIndex % 4 === 2) {
          tmpSensitivity += 5
        }
        else if (this.state.cursorIndex % 4 === 3) {
          tmpGain += 5
        }
        break;
      case 'down':
        console.log("ionic down")
        if (this.state.cursorIndex % 4 === 2) {
          tmpSensitivity -= 5
        }
        else if (this.state.cursorIndex % 4 === 3) {
          tmpGain -= 5
        }
        break;
      case 'left':
        tmpCursorIndex -= 5
        break
      case 'right':
        tmpCursorIndex += 5
        break
      case 'back':
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

  componentWillMount(){
    socketHelper.detach(this.handleKeyDown)
  }

  render() {
    return (
      <div ref="ionic" className="ionic component">
        <div className={`b-button ${(this.state.cursorIndex % 4 === 0) ? "selected" : ""}`} id="depth-button">
          <img src={Depth_Icon} alt="depthicon" />
          <div className="label">Depth</div>
        </div>

        <div className={`b-button ${(this.state.cursorIndex % 4 === 1) ? "selected" : ""}`} id="save-button">
          <img src={Save_Icon} alt="saveicon" />
          <div className="label">Save</div>
        </div>

        <img className="ionic-icon" src={IonicIcon} alt="ionic" />

        <video className="ionic-video" src={IonicVideo} autoPlay muted loop />

        <div className="ionic-chart">
          <LineChart value={125} />
        </div>

        <div className={`dial gain-dial ${(this.state.cursorIndex % 4 === 3) ? "selected" : ""}`}>
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
              textSize: 11
            })}
          />
        </div>

        <div className={`dial sens-dial ${(this.state.cursorIndex % 4 === 2) ? "selected" : ""}`}>
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
              textSize: 11
            })}
          />
        </div>
      </div>
    )
  }
}
export default Ionic