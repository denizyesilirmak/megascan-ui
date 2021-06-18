import React from 'react'
import './ResistivityCalibration.css'
import SocketHelper from '../../SocketHelper'

class ResistivityCalibration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'no data'
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    this.interval = setInterval(() => {
      SocketHelper.send('F')
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    SocketHelper.detach()
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button' && socketData.payload === 'back') {
      this.props.navigateTo('lockerScreen')
      return
    }
    else if (socketData.type === 'resistivity') {
      this.setState({
        value: socketData.payload
      })
    }
  }

  render() {
    return (
      <div className="resitivity-calibration component">
        <div className="res-info">
          Use 1 kΩ resistor to calibrate value to 400.
        </div>

        <div className="res-value" style={{
          color: this.state.value > 390 && this.state.value < 410 ? 'lime' : 'red'
        }}>
          {this.state.value}
        </div>
      </div>
    )
  }
}

export default ResistivityCalibration