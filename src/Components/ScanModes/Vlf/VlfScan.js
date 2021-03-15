import React from 'react'
import './VlfScan.css'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import SoundHelper from '../../../SoundHelper'
import SocketHelper from '../../../SocketHelper'

import Indicator from './Vlf-Components/indicator'

import VLFSettings from './Vlf-Components/settings'
import Modes from './Vlf-Components/modes'

const DISCRIMINATION_TYPES = [
  'OFF',
  'NON-FE.',
  'FE.'
]

const PREDEFINED_SETTINGS = [
  {
    name: 'general',
    treshold: 4,
    sensitivity: 5,
    discrimination: 0,
    tone: 0
  },
  {
    name: 'stable',
    treshold: 6,
    sensitivity: 1,
    discrimination: 0,
    tone: 2
  },
  {
    name: 'highsens',
    treshold: 2,
    sensitivity: 9,
    discrimination: 0,
    tone: 3
  },
  {
    name: 'ferrous',
    treshold: 4,
    sensitivity: 4,
    discrimination: 2,
    tone: 0
  },
  {
    name: 'nonferrous',
    treshold: 4,
    sensitivity: 4,
    discrimination: 1,
    tone: 0
  },
  {
    name: 'custom',
    treshold: 4,
    sensitivity: 4,
    discrimination: 1,
    tone: 0
  },
]

class VlfScan extends React.Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)


    this.leftRef = React.createRef()
    this.rightRef = React.createRef()

    this.state = {
      target_id: 13,
      value: 0,
      cursorModes: 0,
      cursorSettings: 0,
      settingsSelected: false,
      cursorX: 0,
      activeMode: 0,
      treshold: 0,
      sensitivity: 4,
      discrimination: 0,
      tone: 0
    }
  }

  componentDidMount() {
    this.startTimeout = setTimeout(() => {
      this.leftRef.current.style.transform = 'translateX(0px) scale(1)'
      this.rightRef.current.style.transform = 'translateX(0px) scale(1)'
      clearTimeout(this.startTimeout)
    }, 160);


    SoundHelper.createOscillator('sawtooth')
    SocketHelper.attach(this.handleSocket)

    this.interval = setInterval(() => {
      this.setState({
        value: Math.trunc(Math.random() * 100)
      }, () => {
        if (this.state.value > 50) {
          SoundHelper.changeFrequencyType('square')
          SoundHelper.changeFrequencySmooth(this.state.value * 6)
        } else {
          SoundHelper.changeFrequencyType('triangle')
          SoundHelper.changeFrequencySmooth(this.state.value * 10)
        }
      })
    }, 100);
  }

  componentWillUnmount() {
    SoundHelper.stopOscillator()
    SocketHelper.detach()
    clearInterval(this.interval)
  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'left':
          if (this.state.settingsSelected === false) {
            this.setState({
              cursorSettings: 0,
              cursorX: 0
            })
          }
          else if (this.state.settingsSelected === true) {
            if (this.state.cursorSettings === 0) {
              this.setState({
                treshold: this.clamp(this.state.treshold - 1, 0, 10)
              })
            }
            else if(this.state.cursorSettings === 1){
              this.setState({
                sensitivity: this.clamp(this.state.sensitivity - 1, 0, 10)
              })
            }
            else if(this.state.cursorSettings === 2){
              this.setState({
                discrimination: this.clamp(this.state.discrimination - 1, 0, 3)
              })
            }
          }
          break
        case 'right':
          if (this.state.settingsSelected === false) {
            this.setState({
              cursorX: 1
            })
          }
          else if (this.state.settingsSelected === true) {
            if (this.state.cursorSettings === 0) {
              this.setState({
                treshold: this.clamp(this.state.treshold + 1, 0, 10)
              })
            }
            else if(this.state.cursorSettings === 1){
              this.setState({
                sensitivity: this.clamp(this.state.sensitivity + 1, 0, 10)
              })
            }
            else if(this.state.cursorSettings === 2){
              this.setState({
                discrimination: this.clamp(this.state.discrimination + 1, 0, 2)
              })
            }
          }
          break
        case 'up':
          if (this.state.cursorX === 0) {
            this.setState({
              cursorModes: this.clamp(this.state.cursorModes - 1, 0, 5)
            })
          }
          else if (this.state.cursorX === 1 && this.state.settingsSelected === false) {
            this.setState({
              cursorSettings: this.clamp(this.state.cursorSettings - 1, 0, 2)
            })
          }
          break
        case 'down':
          if (this.state.cursorX === 0) {
            this.setState({
              cursorModes: this.clamp(this.state.cursorModes + 1, 0, 5)
            })
          }
          else if (this.state.cursorX === 1 && this.state.settingsSelected === false) {
            this.setState({
              cursorSettings: this.clamp(this.state.cursorSettings + 1, 0, 3)
            })
          }
          break
        case 'ok':
          if (this.state.cursorX === 0) {
            this.setState({
              activeMode: this.state.cursorModes,
              treshold: PREDEFINED_SETTINGS[this.state.cursorModes].treshold,
              sensitivity: PREDEFINED_SETTINGS[this.state.cursorModes].sensitivity,
              discrimination: PREDEFINED_SETTINGS[this.state.cursorModes].discrimination,
              tone: PREDEFINED_SETTINGS[this.state.cursorModes].tone
            }, () => {
              console.log('scan mode changed')
            })
          } else if (this.state.cursorX === 1) {
            this.setState({
              settingsSelected: !this.state.settingsSelected
            })
          }



          break



        case 'back':
          if (this.state.settingsSelected) {
            this.setState({
              settingsSelected: false
            })
          }
          else {
            this.props.navigateTo('menuScreen')
          }
          return;

        default:
          break;
      }
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
      <div className="vlf-scan component">

        <div className="vlf-panel left" ref={this.leftRef} >
          <div className="vlf-modes">
            <Modes
              cursor={this.state.cursorModes}
              activeMode={this.state.activeMode}
              focus={this.state.cursorX === 0}
            />
          </div>
        </div>

        <Indicator value={this.state.value} />

        <div className="vlf-panel right" ref={this.rightRef}   >
          <div className="vlf-settings">
            <VLFSettings
              cursor={this.state.cursorSettings}
              focus={this.state.cursorX === 1}
              treshold={this.state.treshold}
              sensitivity={this.state.sensitivity}
              settingsSelected={this.state.settingsSelected}
              discrimination={DISCRIMINATION_TYPES[this.state.discrimination]}
            />
          </div>
        </div>


      </div>
    )
  }
}

export default VlfScan