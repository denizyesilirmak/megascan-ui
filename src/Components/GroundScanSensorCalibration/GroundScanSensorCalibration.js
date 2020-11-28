import React from 'react'
import './GroundScanSensorCalibration.css'
import SocketHelper from '../../SocketHelper'

const COLORS = {
  jet: [
    { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 64, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 127, color: { r: 0x00, g: 0xff, b: 0x00 } },
    { pct: 192, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 256, color: { r: 0xff, g: 0x00, b: 0x00 } }
  ]
}

class GroundScanSensorCalibration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sensorIndex: 4 * 100,
      sensorArray: [0, 0, 0, 0],
      calibrationArray: [0, 0, 0, 0],
      done: false
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    this.interval = setInterval(() => {
      SocketHelper.send('W')
    }, 250);
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      let tempCalibrationArray = this.state.calibrationArray
      switch (socketData.payload) {
        case 'left':
          this.setState({
            sensorIndex: this.state.sensorIndex - 1
          })
          break;
        case 'right':
          this.setState({
            sensorIndex: this.state.sensorIndex + 1
          })
          break;

        case 'up':
          tempCalibrationArray[this.state.sensorIndex % 4] = tempCalibrationArray[this.state.sensorIndex % 4] + 1
          this.setState({
            calibrationArray: tempCalibrationArray
          })
          break

        case 'down':
          tempCalibrationArray[this.state.sensorIndex % 4] = tempCalibrationArray[this.state.sensorIndex % 4] - 1
          this.setState({
            calibrationArray: tempCalibrationArray
          })
          break
        case 'back':
          clearInterval(this.interval)
          this.props.navigateTo('menuScreen')
          return;

        case 'ok':
          console.log(this.state.calibrationArray)
          this.saveCalibration()
          return;

        default:
          break;
      }
    }
    else if (socketData.type === 'multipleSensor') {
      this.setState({ sensorArray: socketData.payload })
    }
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

  saveCalibration = () => {
    fetch(`http://localhost:9090/saveSensorCalibration/${JSON.stringify(this.state.calibrationArray)}`)
      .then(data => data.json())
      .then(result => {
        this.setState({
          done: true
        })
      })

  }

  render() {
    return (
      <div className="ground-scan-sensor-calibration component">
        <div className="container">
          <div className="title" style={{ color: this.state.done ? 'green' : 'red' }}>
            Ground Scan Sensor Calibration
          </div>
          <div className="up-down-buttons">
            <div className={`button-gssc ${this.state.sensorIndex % 4 === 0 ? 'selected' : ''}`}>
              UP
            </div>
            <div className={`button-gssc ${this.state.sensorIndex % 4 === 1 ? 'selected' : ''}`}>
              UP
            </div>
            <div className={`button-gssc ${this.state.sensorIndex % 4 === 2 ? 'selected' : ''}`}>
              UP
            </div>
            <div className={`button-gssc ${this.state.sensorIndex % 4 === 3 ? 'selected' : ''}`}>
              UP
            </div>
          </div>

          <div className="sensor-colors">

            <div className="sensor-color" style={{ background: this.getColor(parseInt(this.state.sensorArray[0]) + this.state.calibrationArray[0]) }}>
              <div>
                {
                  this.state.calibrationArray[0] > 0 ? '+' + this.state.calibrationArray[0] : this.state.calibrationArray[0]
                }
              </div>
              <div>
                {parseInt(this.state.sensorArray[0]) + this.state.calibrationArray[0]}
              </div>
            </div>
            <div className="sensor-color" style={{ background: this.getColor(parseInt(this.state.sensorArray[1]) + this.state.calibrationArray[1]) }}>
              <div>
                {
                  this.state.calibrationArray[1] > 0 ? '+' + this.state.calibrationArray[1] : this.state.calibrationArray[1]
                }
              </div>
              <div>
                {parseInt(this.state.sensorArray[1]) + this.state.calibrationArray[1]}
              </div>
            </div>
            <div className="sensor-color" style={{ background: this.getColor(parseInt(this.state.sensorArray[2]) + this.state.calibrationArray[2]) }}>
              <div>
                {
                  this.state.calibrationArray[2] > 0 ? '+' + this.state.calibrationArray[2] : this.state.calibrationArray[2]
                }
              </div>
              <div>
                {parseInt(this.state.sensorArray[2]) + this.state.calibrationArray[2]}
              </div>
            </div>
            <div className="sensor-color" style={{ background: this.getColor(parseInt(this.state.sensorArray[3]) + this.state.calibrationArray[3]) }}>
              <div>
                {
                  this.state.calibrationArray[3] > 0 ? '+' + this.state.calibrationArray[3] : this.state.calibrationArray[3]
                }
              </div>
              <div>
                {parseInt(this.state.sensorArray[3]) + this.state.calibrationArray[3]}
              </div>
            </div>

          </div>

          <div className="up-down-buttons">
            <div className={`button-gssc ${this.state.sensorIndex % 4 === 0 ? 'selected' : ''}`} >
              DOWN
            </div>
            <div className={`button-gssc ${this.state.sensorIndex % 4 === 1 ? 'selected' : ''}`}>
              DOWN
            </div>
            <div className={`button-gssc ${this.state.sensorIndex % 4 === 2 ? 'selected' : ''}`}>
              DOWN
            </div>
            <div className={`button-gssc ${this.state.sensorIndex % 4 === 3 ? 'selected' : ''}`}>
              DOWN
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GroundScanSensorCalibration