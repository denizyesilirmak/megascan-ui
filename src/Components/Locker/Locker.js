import React from 'react'
import './Locker.css'
import SocketHelper from '../../SocketHelper'

class Locker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedCursor: 0,
      currentCode: [0, 0, 0, 0, 0, 0]
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
  }

  handleSocket = (socketData) => {
    if (socketData.type !== 'button')
      return

    switch (socketData.payload) {
      case 'left':
        if (this.state.selectedCursor > 0) {
          this.setState({ selectedCursor: this.state.selectedCursor - 1 })
        }
        break;

      case 'right':
        if (this.state.selectedCursor < 5) {
          this.setState({ selectedCursor: this.state.selectedCursor + 1 })
        }
        break;
      case 'up':
        if (this.state.currentCode[this.state.selectedCursor] < 9) {
          const temp = this.state.currentCode
          temp[this.state.selectedCursor] = temp[this.state.selectedCursor] + 1
          this.setState({
            currentCode: temp
          })
        }
        break;
      case 'down':
        if (this.state.currentCode[this.state.selectedCursor] > 0) {
          const temp = this.state.currentCode
          temp[this.state.selectedCursor] = temp[this.state.selectedCursor] - 1
          this.setState({
            currentCode: temp
          })
        }
        break;
      case 'ok':
        const currentCodeString = this.state.currentCode.join('')
        if (currentCodeString === '158694') {
          SocketHelper.detach()
          this.props.navigateTo('compassCalibrationScreen')
        }
        else if (currentCodeString === '569128') {
          SocketHelper.detach()
          this.props.navigateTo('serialCodeChangerScreen')
        }
        else if (currentCodeString === '012540') {
          SocketHelper.detach()
          this.props.navigateTo('groundScanSensorCalibration')
        }
        else if (currentCodeString === '005263') {
          SocketHelper.detach()
          this.props.navigateTo('antennaCalibrationScreen')
        }
        else if (currentCodeString === '160791') {
          SocketHelper.detach()
          this.props.navigateTo('supriseScreen')
        }
        else if (currentCodeString === '003645') {
          SocketHelper.detach()
          this.props.navigateTo('resistivityCalibrationScreen')
        }
        else{
          this.setState({
            currentCode: [0, 0, 0, 0, 0, 0]
          })
        }

        break;
      case 'back':
        SocketHelper.detach()
        this.props.navigateTo('menuScreen')
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className="locker component">
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