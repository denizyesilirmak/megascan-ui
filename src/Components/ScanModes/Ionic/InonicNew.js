import React from 'react'
import './IonicNew.css'
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import LeftRight from '../../../Assets/MenuIcons/leftright.svg'



import SocketHelper from '../../../SocketHelper'
import SoundHelper from '../../../SoundHelper'


class Ionic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      cursorIndex: 4 * 1000,
      sensitivity: 50,
      gain: 50
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
        this.refs.indicator.style.width = this.map(parseInt(socketData.payload), 0, 255, 30, 250) + "px"
        this.refs.indicator.style.height = this.map(parseInt(socketData.payload), 0, 255, 30, 250) + "px"
        this.refs.indicator.style.background = `rgb(${this.map(parseInt(socketData.payload), 0, 255, 0, 255)},0,0)`
      }
      this.setState({
        value: parseInt(socketData.payload)
      })
      if (this.state.value > 20) {
        SoundHelper.changeFrequencySmooth(this.state.value * 2)
      } else {
        SoundHelper.changeFrequencySmooth(0)
      }
    }
    else if (socketData.type === "button") {
      switch (socketData.payload) {
        case 'back':
          clearInterval(this.dataSensorInterval)
          SoundHelper.stopOscillator()
          this.props.navigateTo('menuScreen')
          return
        default:
          return
      }
    }
  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  render() {
    return (
      <div className="ionic-new component">


        <div className={`dial gain-dial ${(this.state.cursorIndex % 2 === 0) ? "selected" : ""}`}>
          <div className="dial-label">Gain</div>
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
          <div className="dial-label">Sensitivity</div>
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