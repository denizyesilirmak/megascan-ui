import React from 'react'
import './Pulse.css'

import Toggle from './PulseItems/Toggle'
import PulseDial from './PulseItems/PulseDial'
import Indicator from './PulseItems/Indicator'

import SocketHelper from '../../../SocketHelper'
import SoundHelper from '../../../SoundHelper'

class Pulse extends React.Component {
  constructor(props) {
    super(props)

    this.pulseCounter = 0

    this.state = {
      discrimination: false,
      raw_value: 0,
      value: 0,
      average: 0,
      sensitivity: 0,
      treshold: 0,
      cursorX: 0,
      cursorY: 0,
      selectedDiscrimination: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    SocketHelper.send('H.1')

  }

  componentWillUnmount() {
    SocketHelper.send('H.0')
    SoundHelper.stopOscillator()
    SocketHelper.detach()
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      this.moveCursor(socketData.payload)
    }
    else if (socketData.type === 'pulse') {
      const raw = parseInt(socketData.payload)
      if (this.pulseCounter < 4) {
        this.pulseCounter++
        console.log('ayar')
        this.setState({
          average: raw
        })
      }

      this.setState({
        raw_value: raw,
        value: parseInt(raw - this.state.average)
      })
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
        this.setState({
          average: this.state.raw_value
        })

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
            label="BALANCE"
            passive={true}
            active={this.state.cursorX === 0 && this.state.cursorY === 0}
            on={true}
          />
          <div className="button-group">
            <Toggle
              label="ALL METALS"
              active={this.state.cursorX === 0 && this.state.cursorY === 1}
              on={this.state.selectedDiscrimination === 0}
            />
            <Toggle
              label="NON-FE."
              active={this.state.cursorX === 0 && this.state.cursorY === 2}
              on={this.state.selectedDiscrimination === 1}
            />
            <Toggle
              label="FERROUS"
              active={this.state.cursorX === 0 && this.state.cursorY === 3}
              on={this.state.selectedDiscrimination === 2}
            />
          </div>
          <Toggle
            label="SOUND"
            active={this.state.cursorX === 0 && this.state.cursorY === 4}
            on={true}
          />

        </div>
        <div className="middle">
          <Indicator
            value={this.state.value}
            groundBalance={this.state.groundBalance}
            selectedDiscType={this.state.selectedDiscrimination}
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