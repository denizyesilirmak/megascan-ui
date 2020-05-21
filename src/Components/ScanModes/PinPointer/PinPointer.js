import React, { Component } from 'react'
import "./PinPointer.css"
import CalibrationIcon from '../../../Assets/MenuIcons/calibration.png'
import socketHelper from '../../../SocketHelper'

const lines = [
  ["#26ff00", "#26ff00",],
  ["#28ff03", "#28ff03",],
  ["#42ff08", "#42ff08",],
  ["#7eff09", "#7eff09",],
  ["#93fe04", "#34f4a9",],
  ["#e5fe03", "#42ff08",],
  ["#fafb03", "#36f3b3",],
  ["#f9ce0f", "#34f4a9",],
  ["#f9b412", "#43edf7",],
  ["#f87f15", "#42c6ff",],
  ["#f84e11", "#3e8bff",],
  ["#f81806", "#3c61fe",],//--
  ["#f81806", "#3c61fe",],//--
  ["#f87f15", "#3e8bff",],
  ["#f9b412", "#42c6ff",],
  ["#f9ce0f", "#43edf7",],
  ["#fafb03", "#42eef0",],
  ["#e5fe03", "#34f4a9",],
  ["#93fe04", "#34f4a9",],
  ["#7eff09", "#7eff09",],
  ["#42ff08", "#42ff08",],
  ["#28ff03", "#28ff03",],
  ["#28ff03", "#28ff03",],
]
// console.log(lines.length)

// const COLORS = {
//   jet: [
//     { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
//     { pct: 63, color: { r: 0x00, g: 0xff, b: 0xff } },
//     { pct: 127, color: { r: 0x00, g: 0xad, b: 0x00 } },
//     { pct: 190, color: { r: 0xff, g: 0xff, b: 0x00 } },
//     { pct: 255, color: { r: 0xff, g: 0x00, b: 0x00 } }
//   ]
// }

class PinPointer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sensorValue: 127
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    this.interval = setInterval(() => {
      this.setState({
        sensorValue: this.map(Math.random() * 255, 0, 255, -120, 120)
      })
    }, 1000);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempIndex = this.state.yesNo
    switch (socketData.payload) {
      case 'left':

        break
      case 'right':
        break
      case 'back':
        clearInterval(this.interval)
        this.props.navigateTo("menuScreen")
        return
      default:
        break
    }

    this.setState({
      yesNo: tempIndex
    })
  }


  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }




  render() {
    return (
      <div className="pin-pointer component">
        <svg className="pin-pointer-grid" width="700" height="260">
          <g>
            <rect fill="none" x="0.49995" y="0.43749" width="699" height="259" id="svg_2" stroke="#ffffff80" />
            <line fill="none" stroke="#ffffff60" x1="0" y1="128" x2="700" y2="128" id="svg_3" />
            <line fill="none" stroke="#ffffff60" x1="0" y1="65" x2="700" y2="65" id="svg_4" />
            <line fill="none" stroke="#ffffff60" x1="0" y1="195" x2="700" y2="195" id="svg_5" />
            <line fill="none" stroke="#ffffff60" x1="350" y1="0" x2="350" y2="300" id="svg_6" />
            <line fill="none" stroke="#ffffff60" x1="525" y1="0" x2="525" y2="300" id="svg_7" />
            <line fill="none" stroke="#ffffff60" x1="175" y1="0" x2="175" y2="300" id="svg_8" />
          </g>
        </svg>

        <svg className="pin-pointer-lines" width="700" height="260">
          <g>
            <rect fill="none" x="0.49995" y="0.43749" width="699" height="259" id="svg_2" stroke="#ff000080" />
            {
              lines.map((e, i) => {
                return (
                  <line key={i} className="pin-pointer-line" fill="none" stroke={this.state.sensorValue > 0 ? e[0] : e[1]} x1={7 + (i * 30)} y1="128" x2={7 + (i * 30)} y2={128 - (this.state.sensorValue * Math.sin(i / 7.1))} id="svg_8" strokeWidth="12" strokeLinecap="butt" />
                )
              })
            }
          </g>
        </svg>

        <div className="pinpointer-button-container">

          <div className="pinpointer-button selected">
            <img src={CalibrationIcon} alt="calibraiton"></img>
            <div className="label">Calibrate</div>
          </div>

          <div className="pinpointer-button">
            <img src={CalibrationIcon} alt="calibraiton"></img>
            <div className="label">Sensitivity</div>
          </div>

        </div>


      </div>
    )
  }
}

export default PinPointer