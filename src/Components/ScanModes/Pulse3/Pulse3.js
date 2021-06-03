import React from 'react'
import './Pulse3.css'
import Indicator from './PulseItems/Indicator'
import Bar from './PulseItems/Bar'

import SocketHelper from '../../../SocketHelper'

class Pulse3 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      raw_value: 0,
      value: 0,
      average: 1108,
      cursor: true,
      sensitivity: 0,
      treshold: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    SocketHelper.send('H.1')
  }

  componentWillUnmount() {
    SocketHelper.send('H.0')
    SocketHelper.detach()

  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      this.handleButton(socketData.payload)
    }
    else if (socketData.type === 'pulse') {
      const value = (parseInt(socketData.payload) - this.state.average)
      this.history(value, parseInt(socketData.payload))
    }
  }

  handleButton = (button) => {
    switch (button) {
      case 'left':
        this.setState({
          cursor: true
        })
        break
      case 'right':
        this.setState({
          cursor: false
        })
        break
      case 'up':
        if (this.state.cursor) {
          this.setState({
            sensitivity: this.clamp(this.state.sensitivity - 1, 0, 8)
          })
        }
        else {
          this.setState({
            treshold: this.clamp(this.state.treshold - 1, 0, 8)
          })
        }
        break
      case 'down':
        if (this.state.cursor) {
          this.setState({
            sensitivity: this.clamp(this.state.sensitivity + 1, 0, 8)
          })
        }
        else {
          this.setState({
            treshold: this.clamp(this.state.treshold + 1, 0, 8)
          })
        }
        break
      case 'start':
        this.setState({
          average: this.state.raw_value
        })
        break

      default:
        break
    }
  }

  history = (value, raw) => {
    this.setState({
      value: value,
      raw_value: raw
    })
  }

  clamp = (value, min, max) => {
    if (value <= min) {
      return min
    }
    if (value >= max) {
      return max
    }
    else return value
  }

  render() {
    return (
      <div className="component pulse-3">
        <div className="left">
          <Bar
            label="Sensitivity"
            left={true}
            level={this.state.sensitivity}
            active={this.state.cursor}
          />
        </div>

        <div className="middle">
          <Indicator
            value={Math.abs(this.state.value)}
            disc={this.state.value > 0}
          />
        </div>

        <div className="right">
          <Bar
            label="Treshold"
            left={false}
            level={this.state.treshold}
            active={!this.state.cursor}
          />
        </div>
      </div>
    )
  }
}

export default Pulse3