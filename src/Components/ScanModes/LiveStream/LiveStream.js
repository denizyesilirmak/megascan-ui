import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './LiveStream.css'
import calibrationIcon from '../../../Assets/MenuIcons/calibration.png'
import SpeedIcon from '../../../Assets/MenuIcons/speed.svg'
import Left from '../../../Assets/MenuIcons/left-arrow3.png'
import right from '../../../Assets/MenuIcons/right-arrow3.png'
import SoundHelper from '../../../SoundHelper'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import WarningIcon from '../../../Assets/MenuIcons/warning.png'

const COLORS = {
  jet: [
    { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 256, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 512, color: { r: 0x00, g: 0xad, b: 0x00 } },
    { pct: 768, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 1023, color: { r: 0xff, g: 0x00, b: 0x00 } }
  ]
}

class LiveStrem extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.count = 0
    this.instantData = 0
    this.total = 0
    this.state = {
      stream: [512, 512, 512, 512, 512, 512, 512, 512, 512, 512],
      started: true,
      calibration: true,
      speed: 0,
      speedWarning: false
    }
  }

  componentDidMount() {
    SoundHelper.createOscillator('square')
    socketHelper.attach(this.handleKeyDown)



    setTimeout(() => {
      this.refs.livestream.style.opacity = 1
    }, 60);

    this.startInterval(300)


  }

  startInterval = (speed) => {
    clearInterval(this.testInterval)
    this.testInterval = setInterval(() => { this.requestSensorData() }, speed);
  }

  componentWillUnmount() {
    SoundHelper.stopOscillator()
    clearInterval(this.testInterval)
  }


  getColor = (pct) => {
    for (var i = 1; i < COLORS.jet.length - 1; i++) {
      if (pct < COLORS.jet[i].pct) {
        break;
      }
    }
    const lower = COLORS.jet[i - 1];
    const upper = COLORS.jet[i];
    const range = upper.pct - lower.pct;
    const rangePct = (pct - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  }

  requestSensorData = () => {
    if (this.state.started)
      socketHelper.send('Q' + parseInt(this.state.stream[9] / 4))
  }

  handleKeyDown = (socketData) => {
    let tmpSpeed = this.state.speed
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'left':
          if (tmpSpeed > 0) {
            tmpSpeed = tmpSpeed - 1
            this.setState({
              speed: tmpSpeed,
              speedWarning: true
            })
          }
          break
        case 'right':
          if (tmpSpeed < 5) {
            tmpSpeed = tmpSpeed + 1
            this.setState({
              speed: tmpSpeed,
              speedWarning: true
            })
          }
          break
        case 'down':

          break
        case 'up':

          break
        case 'ok':

          return

        case 'start':
          if (this.state.speedWarning === true) {
            this.setState({
              speedWarning: false
            }, () => {
              this.startInterval((6 - this.state.speed) * 80)
            })
          }
          break
        case 'back':
          // this.playpause()
          clearInterval(this.testInterval)
          this.refs.livestream.style.opacity = 0
          this.refs.livestream.style.transform = "translateY(200px)"
          setTimeout(() => {
            this.props.navigateTo("menuScreen")
          }, 500);
          return
        default:
          break
      }
    }
    else if (socketData.type === 'sensor') {
      var c = this.refs.streamCanvas
      var ctx = c.getContext("2d");
      if (this.state.calibration) {
        this.instantData = parseInt(socketData.payload)
      }
      else {
        if (parseInt(socketData.payload) < this.total) {
          this.instantData = this.map(parseInt(socketData.payload), 0, this.total, 0, 512)
        } else {
          this.instantData = this.map(parseInt(socketData.payload), this.total, 1023, 512, 1023)
        }
      }

      SoundHelper.changeFrequencySmooth(this.instantData)
      this.calibration(this.instantData)
      let tmpStream = this.state.stream
      tmpStream.push(parseInt(this.instantData))
      tmpStream.shift()
      this.setState({
        stream: tmpStream,
      })
      var grd = ctx.createLinearGradient(0, 0, 560, 0);
      grd.addColorStop(0, this.getColor(this.state.stream[0]));
      grd.addColorStop(.1, this.getColor(this.state.stream[1]));
      grd.addColorStop(.2, this.getColor(this.state.stream[2]));
      grd.addColorStop(.3, this.getColor(this.state.stream[3]));
      grd.addColorStop(.4, this.getColor(this.state.stream[4]));
      grd.addColorStop(.5, this.getColor(this.state.stream[5]));
      grd.addColorStop(.6, this.getColor(this.state.stream[6]));
      grd.addColorStop(.7, this.getColor(this.state.stream[7]));
      grd.addColorStop(.8, this.getColor(this.state.stream[8]));
      grd.addColorStop(.9, this.getColor(this.state.stream[9]));

      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 560, 280);

      // ANGLE
      // this.refs.indicatorRef.style.transform = `translateY(${this.clamp(this.state.angle * 1.5 - 145, -130, 130)}px)`
    }
  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return Math.trunc((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
  }

  clamp = (num, min, max) => {
    return num <= min ? min : num >= max ? max : num;
  }

  calibration = (sensor) => {
    this.count++
    if (this.count <= 15) {
      // console.log(this.count)
      this.total += Math.trunc(sensor / 14)
      // console.log("total", this.total)
      this.refs.calib.style.width = (100 / 15) * this.count + "%"
    }
    else {
      this.setState({
        calibration: false
      })
    }

  }

  renderCalibrationPopup = () => {
    return (
      <div className="live-stream-calibration">
        <img src={calibrationIcon} alt="cal"></img>
        <div className="calibration-warning">{this.context.strings["calibrationwarning"]}</div>
        <div className="calibration-preloader-holder">
          <div ref="calib" className="calibration-preloader-value" style={{ background: this.context.theme.button_bg_selected }}>

          </div>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div ref="livestream" className="live-stream-component component">
        {
          this.state.calibration ? this.renderCalibrationPopup() : ''
        }
        <div className="live-stream-top">
          <div className="stream-plot">
            <canvas ref="streamCanvas" width="560" height="280">

            </canvas>
          </div>

          <div className="sensor-numeric-value">
            {this.map(this.state.stream[9], 0, 1023, 0 , 100)}
          </div>

          {/* <div className="stream-orientation">
            <div className="line" >
              <div ref="indicatorRef" className="indicator-angle"><span>Normal</span></div>
            </div>
          </div> */}
        </div>
        <div className="live-stream-bottom">
          <div className="speed-holder">
            <img className="speed-icon" src={SpeedIcon} alt="speed"></img>
            <img className="arrows" src={Left} alt="speed"></img>
            <span>{this.state.speed + 1}</span>
            <img className="arrows" src={right} alt="speed"></img>
          </div>
        </div>

        <div className="speed-warning" style={{ display: this.state.speedWarning ? 'flex' : 'none' }}>
          <img alt="warn" src={WarningIcon} />
        Speed is changed. Press START to apply
        </div>


      </div>

    )
  }
}

export default LiveStrem

// () => {
//   
// }