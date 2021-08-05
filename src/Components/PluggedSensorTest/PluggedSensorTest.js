import React from 'react'
import './PluggedSensorTest.css'
import SocketHelper from '../../SocketHelper'

const SENSORCODES = [
  "NONE",
  "IONIC",
  "VERTICAL",
  "HORIZONTAL",
  "SMALL COIL",
  "MIDDLE COIL",
  "LARGE COIL",
  "BACKUP"
]

class PluggedSensorTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSensorCode: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.socketHandler)
    this.interval = setInterval(() => {
      SocketHelper.send('X')
    }, 500)
  }

  socketHandler = (sd) => {
    if (sd.type === 'button' && sd.payload === 'back') {
      clearInterval(this.interval)
      this.props.navigateTo('lockerScreen')
      return
    }

    if (sd.type === 'sensorControl') {
      const index = parseInt(sd.payload)
      this.setState({ currentSensorCode: index })
    }

  }

  componentWillUnmount() {
    clearInterval(this.interval)
    SocketHelper.detach()
  }

  render() {
    return (
      <div className="plugged-sensor-test component">
        <div className="plugged-sensor-title">Plugged Sensor</div>
        <div className="plugged-sensor" >
          {SENSORCODES[this.state.currentSensorCode]}
        </div>

        <div className="plugged-sensor-circles">
          <div className="plugged-sensor-circle" style={{background: this.state.currentSensorCode === 0 ? 'red': '#000000'}}/>
          <div className="plugged-sensor-circle" style={{background: this.state.currentSensorCode === 1 ? 'green': '#000000'}}/>
          <div className="plugged-sensor-circle" style={{background: this.state.currentSensorCode === 2 ? 'blue': '#000000'}}/>
          <div className="plugged-sensor-circle" style={{background: this.state.currentSensorCode === 3 ? 'orange': '#000000'}}/>
          <div className="plugged-sensor-circle" style={{background: this.state.currentSensorCode === 4 ? 'pink': '#000000'}}/>
          <div className="plugged-sensor-circle" style={{background: this.state.currentSensorCode === 5 ? 'cyan': '#000000'}}/>
          <div className="plugged-sensor-circle" style={{background: this.state.currentSensorCode === 6 ? 'darkmagenta': '#000000'}}/>
          <div className="plugged-sensor-circle" style={{background: this.state.currentSensorCode === 7 ? 'lime': '#000000'}}/>
          <div className="plugged-sensor-circle" style={{background: this.state.currentSensorCode === 8 ? 'red': '#000000'}}/>
        </div>
      </div>
    )
  }
}

export default PluggedSensorTest