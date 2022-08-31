import React, { Component } from 'react'
import './LockerMenu.css'
import SocketHelper from '../../SocketHelper'
import { clamp } from 'lodash'


const LOCKER_MENUS = [
  {
    name: 'Compass Calibration Screen',
    target: 'compassCalibrationScreen'
  },
  {
    name: 'Change Serial Number',
    target: 'serialCodeChangerScreen'
  },
  {
    name: 'Ground Scan Horizontal Sensor Calibration',
    target: 'groundScanSensorCalibration'
  },
  {
    name: 'Long Range Antenna Direction Calibration',
    target: 'antennaCalibrationScreen'
  },
  {
    name: 'Resistivity Voltage Calibration',
    target: 'resistivityCalibrationScreen'
  },
  {
    name: 'Plugged Sensor Control Test',
    target: 'pluggedSensorTestScreen'
  },
  {
    name: 'Pulse Detector Timings Settings',
    target: 'pulseTimingsScreen'
  },
  {
    name: 'Detector Noise Level Screen?',
    target: 'detectorNoiseLevelScreen'
  },
]

class LockerMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cursor: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
  }

  handleSocket = (socketData) => {
    if (socketData.type !== 'button')
      return

    if (socketData.payload === 'up') {
      this.setState({
        cursor: clamp(this.state.cursor - 1, 0, LOCKER_MENUS.length - 1)
      })
    }
    else if (socketData.payload === 'down') {
      this.setState({
        cursor: clamp(this.state.cursor + 1, 0, LOCKER_MENUS.length - 1)
      })
    }
    else if (socketData.payload === 'ok') {
      this.props.navigateTo(LOCKER_MENUS[this.state.cursor].target)
      return
    }
    else if(socketData.payload === 'back'){
      this.props.navigateTo('lockerScreen')
    }
  }

  render() {
    return (
      <div className="locker-menu component">
        <div className="locker-menu-title">
          Device Options & Test Menus
        </div>

        <div className="locker-sub-menus">
          {
            LOCKER_MENUS.map((e, i) => {
              return (
                <div
                  className={`locker-sub-menu ${this.state.cursor === i ? 'selected' : ''}`}
                  key={i}
                  style={{
                    animationDelay: (100 + i * 160) + 'ms'
                  }}
                >
                  {e.name}
                </div>
              )
            })
          }

        </div>
      </div>
    )
  }
}

export default LockerMenu