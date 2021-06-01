import React from 'react'
import './Pulse.css'

import Toggle from './PulseItems/Toggle'
import PulseDial from './PulseItems/PulseDial'
import Indicator from './PulseItems/Indicator'
import SocketHelper from '../../../SocketHelper'

class Pulse extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      discrimination: false,
      raw_value: 0,
      value: 0,
      average: 0,
      sensitivity: 0,
      treshold: 0,
      cursorX: 0,
      cursorY: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
  }

  componentWillUnmount() {
    SocketHelper.detach()
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      this.moveCursor(socketData.payload)
    }
  }

  moveCursor = (button) => {
    switch (button) {
      case 'up':
        if (this.state.cursorX === 0) {
          this.setState({
            cursorY: this.clamp(this.state.cursorY - 1, 0, 4)
          })
        } else if (this.state.cursorX === 1) {
          this.setState({
            cursorY: this.clamp(this.state.cursorY - 1, 0, 1)
          })
        }

        break
      case 'down':
        if (this.state.cursorX === 0) {
          this.setState({
            cursorY: this.clamp(this.state.cursorY + 1, 0, 4)
          })
        } else if (this.state.cursorX === 1) {
          this.setState({
            cursorY: this.clamp(this.state.cursorY + 1, 0, 1)
          })
        }


        break
      case 'left':
        this.setState({
          cursorX: this.clamp(this.state.cursorX - 1, 0, 1),
          cursorY: 0
        })
        break
      case 'right':
        this.setState({
          cursorX: this.clamp(this.state.cursorX + 1, 0, 1),
          cursorY: 0
        })
        break
      case 'ok':

        break
      case 'back':

        break
      case 'start':

        break
      default:
        break
    }
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
      <div className="pulse2-component component">
        <div className="left">
          <Toggle
            label="Disc."
            active={this.state.cursorX === 0 && this.state.cursorY === 0}
            on={true}
          />
          <div className="button-group">
            <Toggle
              label="ALL METALS"
              active={this.state.cursorX === 0 && this.state.cursorY === 1}
              on={false}
            />
            <Toggle
              label="NON-FE."
              active={this.state.cursorX === 0 && this.state.cursorY === 2}
              on={true}
            />
            <Toggle
              label="FERROUS"
              active={this.state.cursorX === 0 && this.state.cursorY === 3}
              on={false}
            />
          </div>
          <Toggle
            label="SOUND"
            active={this.state.cursorX === 0 && this.state.cursorY === 4}
            on={false}
          />

        </div>
        <div className="middle">
          <Indicator
            value={this.state.value}
            groundBalance={this.state.groundBalance}
          />
        </div>
        <div className="right">
          <PulseDial
            label="Treshold"
            active={this.state.cursorX === 1 && this.state.cursorY === 0}
          />
          <PulseDial
            label="Sens."
            active={this.state.cursorX === 1 && this.state.cursorY === 1}
          />

        </div>
      </div>
    )
  }
}

export default Pulse