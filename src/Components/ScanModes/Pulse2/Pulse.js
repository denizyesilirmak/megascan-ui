import React from 'react'
import './Pulse.css'

import Toggle from './PulseItems/Toggle'
// import PulseDial from './PulseItems/PulseDial'
import Indicator from './PulseItems/Indicator'
import Slider from './PulseItems/Slider'

import SocketHelper from '../../../SocketHelper'
import SoundHelper from '../../../SoundHelper'
import { DeviceContext } from '../../../Contexts/DeviceContext'

const MINLIMIT = -40
const MAXLIMIT = 40

class Pulse extends React.Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.pulseCounter = 0

    this.state = {
      discrimination: false,
      raw_value: 0,
      value: 0,
      average: 1108,
      sensitivity: 0,
      treshold: 0,
      cursorX: 0,
      cursorY: 0,
      selectedDiscrimination: 0,
      toggledDial: 0,
      sound: true
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    SocketHelper.send('H2')
    SoundHelper.createOscillator('square')
  }

  componentWillUnmount() {
    SocketHelper.send('H0')
    SoundHelper.stopOscillator()
    SocketHelper.detach()
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      this.moveCursor(socketData.payload)
    }
    else if (socketData.type === 'pulse') {
      //-------------------------------------------------------
      const raw = parseInt(socketData.payload)
      if (this.pulseCounter < 30) {
        this.pulseCounter++
        console.log('ayar')
        this.setState({
          average: raw
        })
      }

      this.setState({
        raw_value: raw,
        value: parseInt(raw - this.state.average)
      }, () => {
        if (this.state.sound) {
          if (this.state.selectedDiscrimination === 0) {
            if (this.state.value > MAXLIMIT + (this.state.treshold * 65)) {
              SoundHelper.changeFrequencySmooth(800 + this.state.value * 2)
            } else if (this.state.value < MINLIMIT - (this.state.treshold * 65)) {
              SoundHelper.changeFrequencySmooth(this.state.value / -3)
            } else {
              SoundHelper.changeFrequencySmooth(0)
            }
          }
          else if (this.state.selectedDiscrimination === 1) {
            if (this.state.value > MAXLIMIT + (this.state.treshold * 65)) {
              SoundHelper.changeFrequencySmooth(800 + this.state.value * 2)
            } else if (this.state.value < MINLIMIT - (this.state.treshold * 65)) {
              // SoundHelper.changeFrequencySmooth(this.state.value / -3)
            } else {
              SoundHelper.changeFrequencySmooth(0)
            }

          }
          else if (this.state.selectedDiscrimination === 2) {
            if (this.state.value > MAXLIMIT + (this.state.treshold * 65)) {
              // SoundHelper.changeFrequencySmooth(800 + this.state.value * 2)
            } else if (this.state.value < MINLIMIT - (this.state.treshold * 65)) {
              SoundHelper.changeFrequencySmooth(this.state.value / -3)
            } else {
              SoundHelper.changeFrequencySmooth(0)
            }
          }
        } else {
          SoundHelper.changeFrequencyFast(0)
        }

      })

      //-------------------------------------------------------
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
            treshold: this.clamp(this.state.treshold - 1, 0, 10)
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
            treshold: this.clamp(this.state.treshold + 1, 0, 10)
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
        if (this.state.cursorX === 0) {
          //left side
          if (this.state.cursorY === 1) {
            //all metals
            this.setState({
              selectedDiscrimination: 0
            }, () => {
              SoundHelper.changeFrequencyType('sine')
            })
          }
          else if (this.state.cursorY === 2) {
            //Non ferrous
            this.setState({
              selectedDiscrimination: 1
            }, () => {
              SoundHelper.changeFrequencyType('sawtooth')
            })
          }
          else if (this.state.cursorY === 3) {
            //ferrous
            this.setState({
              selectedDiscrimination: 2
            }, () => {
              SoundHelper.changeFrequencyType('square')
            })
          }
          else if (this.state.cursorY === 0) {
            //calibration
            this.setState({
              average: this.state.raw_value
            })
          }
          else if (this.state.cursorY === 4) {
            //sound
            this.setState({
              sound: !this.state.sound
            })
          }
        }
        else if (this.state.cursorX === 1) {
          //right side

        }
        break
      case 'back':
        this.props.navigateTo('detectorModeSelectorScreen')

        return
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

  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
  }

  calculateIndicatorValue = () => {
    if (this.state.selectedDiscrimination === 0) {
      return Math.trunc(this.map(Math.abs(this.state.value), 0, 1100, 0, 100))
    }
    else if (this.state.selectedDiscrimination === 1) {
      return Math.trunc(this.map(Math.abs(this.state.value), 0, 1100, 0, 100))
    }
    else if (this.state.selectedDiscrimination === 2) {
      return Math.trunc(this.map(Math.abs(this.state.value), 0, 1100, 0, 100))
    }
    return 0
  }

  render() {
    return (
      <div className="pulse2-component component">
        <div className="left">
          <Toggle
            label={this.context.strings['calibration']}
            passive={true}
            active={this.state.cursorX === 0 && this.state.cursorY === 0}
            on={true}
          />
          <div className="button-group">
            <Toggle
              label={this.context.strings['allMetals']}
              active={this.state.cursorX === 0 && this.state.cursorY === 1}
              on={this.state.selectedDiscrimination === 0}
            />
            <Toggle
              label={this.context.strings['nonFerrous']}
              active={this.state.cursorX === 0 && this.state.cursorY === 2}
              on={this.state.selectedDiscrimination === 1}
            />
            <Toggle
              label={this.context.strings['Ferrous']}
              active={this.state.cursorX === 0 && this.state.cursorY === 3}
              on={this.state.selectedDiscrimination === 2}
            />
          </div>
          <Toggle
            label={this.context.strings['sound']}
            active={this.state.cursorX === 0 && this.state.cursorY === 4}
            on={this.state.sound}
          />

        </div>
        <div className="middle">
          <Indicator
            value={this.state.value}
            valueIndicator={this.calculateIndicatorValue()}
            groundBalance={this.state.average}
            selectedDiscType={this.state.selectedDiscrimination}
          />
        </div>
        <div className="right">
          {
            <Slider
              active={this.state.cursorX === 1}
              value={this.state.treshold}
            />
          }


          {/* <PulseDial
            label={this.context.strings['treshold']}
            active={this.state.cursorX === 1 && this.state.cursorY === 0}
            toggle={true}
          />
          <PulseDial
            label={this.context.strings['sensitivity']}
            active={this.state.cursorX === 1 && this.state.cursorY === 1}
            toggle={false}
          /> */}
        </div>
      </div>
    )
  }
}

export default Pulse