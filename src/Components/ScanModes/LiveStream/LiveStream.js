import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './LiveStream.css'
import calibrationIcon from '../../../Assets/MenuIcons/calibration.png'
import SpeedIcon from '../../../Assets/MenuIcons/speed.svg'
import Left from '../../../Assets/MenuIcons/left-arrow3.png'
import right from '../../../Assets/MenuIcons/right-arrow3.png'
import SoundHelper from '../../../SoundHelper'


const COLORS = {
  jet: [
    { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 63, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 127, color: { r: 0x00, g: 0xad, b: 0x00 } },
    { pct: 190, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 255, color: { r: 0xff, g: 0x00, b: 0x00 } }
  ]
}

class LiveStrem extends Component {
  constructor(props) {
    super(props)

    this.count = 0
    this.instantData = 0
    this.total = 0
    this.state = {
      stream: [127, 127, 127, 127, 127, 127, 127, 127, 127, 127],
      started: true,
      calibration: true,
      speed: 0
    }
  }

  componentDidMount() {
    SoundHelper.createOscillator('square')
    socketHelper.attach(this.handleKeyDown)



    setTimeout(() => {
      this.refs.livestream.style.opacity = 1
    }, 60);
    this.testInterval = setInterval(() => { this.requestSensorData() }, 120);
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
      socketHelper.send('Q' + this.state.stream[9])
  }

  handleKeyDown = (socketData) => {
    let tmpSpeed = this.state.speed
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'left':
          if (tmpSpeed > 0) {
            tmpSpeed--
            clearInterval(this.testInterval)
            this.testInterval = setInterval(this.requestSensorData(), tmpSpeed * 10)
            this.setState({
              speed: tmpSpeed
            })
          }
          break
        case 'right':
          if (tmpSpeed < 5) {
            tmpSpeed++
            clearInterval(this.testInterval)
            this.testInterval = setInterval(this.requestSensorData(), tmpSpeed * 10)
            this.setState({
              speed: tmpSpeed
            })
          }
          break
        case 'down':

          break
        case 'up':

          break
        case 'ok':

          return
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
          this.instantData = this.map(parseInt(socketData.payload), 0, this.total, 0, 127)
        } else {
          this.instantData = this.map(parseInt(socketData.payload), this.total, 255, 127, 255)
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
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
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
        <div className="calibration-warning">The device is calibrating the sensor. Keep the sensor perpendicular to the ground. </div>
        <div className="calibration-preloader-holder">
          <div ref="calib" className="calibration-preloader-value">

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
            {this.state.stream[9]}
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
      </div>
    )
  }
}

export default LiveStrem