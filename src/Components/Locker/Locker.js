import React from 'react'
import './Locker.css'
import SocketHelper from '../../SocketHelper'

class Locker extends React.Component {
  constructor(props) {
    super(props)

    this.wrongAttempCounter = 0

    this.state = {
      selectedCursor: 0,
      currentCode: [0, 0, 0, 0, 0, 0]
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
  }

  componentWillUnmount() {
    SocketHelper.detach()
  }

  handleSocket = (socketData) => {
    if (socketData.type !== 'button')
      return

    switch (socketData.payload) {
      case 'left':
        if (this.wrongAttempCounter > 3) {
          return
        }
        if (this.state.selectedCursor > 0) {
          this.setState({ selectedCursor: this.state.selectedCursor - 1 })
        }
        break
      case 'right':
        if (this.wrongAttempCounter > 3) {
          return
        }

        if (this.state.selectedCursor < 5) {
          this.setState({ selectedCursor: this.state.selectedCursor + 1 })
        }
        break
      case 'up':
        if (this.wrongAttempCounter > 3) {
          return
        }


        if (this.state.currentCode[this.state.selectedCursor] < 9) {
          const temp = this.state.currentCode
          temp[this.state.selectedCursor] = temp[this.state.selectedCursor] + 1
          this.setState({
            currentCode: temp
          })
        }
        break
      case 'down':
        if (this.wrongAttempCounter > 3) {
          return
        }

        if (this.state.currentCode[this.state.selectedCursor] > 0) {
          const temp = this.state.currentCode
          temp[this.state.selectedCursor] = temp[this.state.selectedCursor] - 1
          this.setState({
            currentCode: temp
          })
        }
        break
      case 'ok':
        if (this.wrongAttempCounter > 3) {
          return
        }

        const currentCodeString = this.state.currentCode.join('')
        if (currentCodeString === '158694') {
          this.props.navigateTo('compassCalibrationScreen')
          return
        }
        else if (currentCodeString === '569128') {
          this.props.navigateTo('serialCodeChangerScreen')
          return
        }
        else if (currentCodeString === '012540') {
          this.props.navigateTo('groundScanSensorCalibration')
          return
        }
        else if (currentCodeString === '005263') {
          this.props.navigateTo('antennaCalibrationScreen')
          return
        }
        else if (currentCodeString === '160791') {
          this.props.navigateTo('supriseScreen')
          return
        }
        else if (currentCodeString === '230423') {
          this.props.navigateTo('projectHistoryScreen')
          return
        }
        else if (currentCodeString === '003645') {
          this.props.navigateTo('resistivityCalibrationScreen')
          return
        }
        else if (currentCodeString === '002323') {
          this.props.navigateTo('pluggedSensorTestScreen')
          return
        }
        else if (currentCodeString === '120000') {
          this.props.navigateTo('pulseTimingsScreen')
          return
        }
        else if (currentCodeString === '130000') {
          this.props.navigateTo('detectorNoiseLevelScreen')
          return
        }
        else if (currentCodeString === '021000') {
          this.props.navigateTo('lockerMenuScreen')
          return
        }
        else {
          this.wrongAttempCounter++
          this.setState({
            currentCode: [0, 0, 0, 0, 0, 0]
          })
        }

        break
      case 'back':
        this.props.navigateTo('menuScreen')
        break

      default:
        break
    }
  }

  render() {
    return (
      <div className="locker component" style={{ background: this.wrongAttempCounter > 3 ? 'red' : '#000000' }}>

        <div className="locker-title">
          Device Administration
        </div>

        <div className="locker-warning" >
          Changing these device settings other than authorized service will cause your device to be out of warranty.
        </div>

        <div className="digits-container">

          <div className={`single-digit-panel ${this.state.selectedCursor === 0 ? 'selected' : ''}`}>
            <div className="digit-a">{this.state.currentCode[0]}</div>
          </div>

          <div className={`single-digit-panel ${this.state.selectedCursor === 1 ? 'selected' : ''}`}>
            <div className="digit-a">{this.state.currentCode[1]}</div>
          </div>
          <div className={`single-digit-panel ${this.state.selectedCursor === 2 ? 'selected' : ''}`}>
            <div className="digit-a">{this.state.currentCode[2]}</div>
          </div>
          <div className={`single-digit-panel ${this.state.selectedCursor === 3 ? 'selected' : ''}`}>
            <div className="digit-a">{this.state.currentCode[3]}</div>
          </div>
          <div className={`single-digit-panel ${this.state.selectedCursor === 4 ? 'selected' : ''}`}>
            <div className="digit-a">{this.state.currentCode[4]}</div>
          </div>
          <div className={`single-digit-panel ${this.state.selectedCursor === 5 ? 'selected' : ''}`}>
            <div className="digit-a">{this.state.currentCode[5]}</div>
          </div>

        </div>
      </div>
    )
  }
}

export default Locker