import React from 'react'
import './VlfScan.css'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import SoundHelper from '../../../SoundHelper'
import SocketHelper from '../../../SocketHelper'
import dbStorage from '../../../DatabaseHelper'
import Indicator from './Vlf-Components/indicator'
import VLFSettings from './Vlf-Components/settings'
import Modes from './Vlf-Components/modes'

const DISCRIMINATION_TYPES = [
  'OFF',
  'ON',
  'NON-FE.',
  'FE.'
]

let PREDEFINED_SETTINGS = [
  {
    name: 'general',
    treshold: 5,
    sensitivity: 5,
    discrimination: 1,
    tone: 1
  },
  {
    name: 'stable',
    treshold: 8,
    sensitivity: 1,
    discrimination: 1,
    tone: 1
  },
  {
    name: 'highsens',
    treshold: 5,
    sensitivity: 6,
    discrimination: 0,
    tone: 1
  },
  {
    name: 'ferrous',
    treshold: 4,
    sensitivity: 4,
    discrimination: 3,
    tone: 3
  },
  {
    name: 'nonferrous',
    treshold: 4,
    sensitivity: 4,
    discrimination: 2,
    tone: 3
  },
  {
    name: 'custom',
    treshold: 4,
    sensitivity: 4,
    discrimination: 1,
    tone: 0
  }
]

const TONES = [
  {
    positiveType: 'sawtooth',
    positiveFreq: 0,
    negativeType: 'sawtooth',
    negativeFreq: 0
  },
  {
    positiveType: 'sawtooth',
    positiveFreq: 1000,
    negativeType: 'sawtooth',
    negativeFreq: 500
  },
  {
    positiveType: 'sine',
    positiveFreq: 500,
    negativeType: 'sine',
    negativeFreq: 200
  },
  {
    positiveType: 'square',
    positiveFreq: 800,
    negativeType: 'square',
    negativeFreq: 300
  }
]

class VlfScan extends React.Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.customModeProperties = {
      name: 'custom',
      treshold: 4,
      sensitivity: 4,
      discrimination: 1,
      tone: 0
    }


    this.leftRef = React.createRef()
    this.rightRef = React.createRef()

    this.state = {
      target_id: '--',
      value: 0,
      cursorModes: 0,
      cursorSettings: 0,
      settingsSelected: false,
      cursorX: 0,
      activeMode: 0,
      treshold: 5,
      sensitivity: 5,
      discrimination: 1,
      tone: 1,
      id: '--',
      raw: 0
    }
  }

  componentDidMount() {

    SoundHelper.createOscillator('sawtooth')
    SocketHelper.attach(this.handleSocket)
    this.readFromDb()

    this.timeoutInit = setTimeout(() => {
      this.leftRef.current.style.transform = 'translateX(0px) scale(1)'
      this.rightRef.current.style.transform = 'translateX(0px) scale(1)'
      SocketHelper.send('H.1')
      clearTimeout(this.timeoutInit)
    }, 160);

    this.interval = setInterval(() => {
      this.setState({
        id: Math.trunc((500 - this.state.value) / 10)
      })
    }, 250);
  }

  componentWillUnmount() {
    SocketHelper.send('H.0')
    SoundHelper.stopOscillator()
    SocketHelper.detach()
    clearInterval(this.interval)
  }

  componentDidUpdate() {
    //control if user on active mode, and make changes on properties.
    if (this.state.activeMode === 5) {
      if (this.state.tone !== this.customModeProperties.tone ||
        this.state.discrimination !== this.customModeProperties.discrimination ||
        this.state.sensitivity !== this.customModeProperties.sensitivity ||
        this.state.treshold !== this.customModeProperties.treshold
      ) {
        this.customModeProperties.treshold = this.state.treshold
        this.customModeProperties.sensitivity = this.state.sensitivity
        this.customModeProperties.discrimination = this.state.discrimination
        this.customModeProperties.tone = this.state.tone
        this.saveToDb()
      }
    }
  }

  saveToDb = async () => {
    try {
      await dbStorage.setItem('vlf_custom_threshold', this.customModeProperties.treshold)
      await dbStorage.setItem('vlf_custom_sensitivity', this.customModeProperties.sensitivity)
      await dbStorage.setItem('vlf_custom_discrimination', this.customModeProperties.discrimination)
      await dbStorage.setItem('vlf_custom_tone', this.customModeProperties.tone)
    } catch (error) {
      //console.log(error)
    }
  }

  readFromDb = async () => {
    try {
      const custom_threshold = await dbStorage.getItem('vlf_custom_threshold') || 4
      const custom_sensitivity = await dbStorage.getItem('vlf_custom_sensitivity') || 4
      const custom_discrimination = await dbStorage.getItem('vlf_custom_discrimination') || 1
      const custom_tone = await dbStorage.getItem('vlf_custom_tone') || 0
      this.customModeProperties.treshold = custom_threshold
      this.customModeProperties.sensitivity = custom_sensitivity
      this.customModeProperties.discrimination = custom_discrimination
      this.customModeProperties.tone = custom_tone
    } catch (error) {
      //console.log(error)
    }
    //console.log(PREDEFINED_SETTINGS[5])
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
            else if (this.state.cursorSettings === 1) {
              this.setState({
                sensitivity: this.clamp(this.state.sensitivity - 1, 0, 10)
              })
            }
            else if (this.state.cursorSettings === 2) {
              this.setState({
                discrimination: this.clamp(this.state.discrimination - 1, 0, 3)
              })
            }
            else if (this.state.cursorSettings === 3) {
              this.setState({
                tone: this.clamp(this.state.tone - 1, 0, 3)
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
            else if (this.state.cursorSettings === 1) {
              this.setState({
                sensitivity: this.clamp(this.state.sensitivity + 1, 0, 10)
              })
            }
            else if (this.state.cursorSettings === 2) {
              this.setState({
                discrimination: this.clamp(this.state.discrimination + 1, 0, 3)
              })
            }
            else if (this.state.cursorSettings === 3) {
              this.setState({
                tone: this.clamp(this.state.tone + 1, 0, 3)
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
            if (this.state.cursorModes !== 5) {
              this.setState({
                activeMode: this.state.cursorModes,
                treshold: PREDEFINED_SETTINGS[this.state.cursorModes].treshold,
                sensitivity: PREDEFINED_SETTINGS[this.state.cursorModes].sensitivity,
                discrimination: PREDEFINED_SETTINGS[this.state.cursorModes].discrimination,
                tone: PREDEFINED_SETTINGS[this.state.cursorModes].tone
              }, () => {
                //console.log('scan mode changed')
              })
            } else {
              //console.log('custom')
              this.setState({
                activeMode: this.state.cursorModes,
                treshold: this.customModeProperties.treshold,
                sensitivity: this.customModeProperties.sensitivity,
                discrimination: this.customModeProperties.discrimination,
                tone: this.customModeProperties.tone
              }, () => {
                //console.log('scan mode changed')
              })
            }

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
            if (this.context.device === "infinity") {
              this.props.navigateTo('detectorModeSelectorScreen')
            } else {
              this.props.navigateTo('menuScreen')
            }
          }
          return;

        default:
          break;
      }
    }
    else if (socketData.type === 'vlf') {
      this.setState({
        value: parseInt(socketData.payload) - 500,
        raw: socketData.raw
      })
      this.generateSound()
    }
    else if (socketData.type === 'pulse') {
      this.setState({
        value: parseInt(socketData.payload)
      })
      this.generateSound()
    }
  }


  generateSound = () => {
    if (this.state.discrimination === 2) {
      //sound only for gold
      if (this.state.raw > 0) {
        if (this.state.value > 10) {
          SoundHelper.changeFrequencyType(TONES[this.state.tone].positiveType)
          SoundHelper.changeFrequencyFast(TONES[this.state.tone].positiveFreq)
        } else if (this.state.value < -1) {
          SoundHelper.changeFrequencyFast(0)
        }
        else {
          SoundHelper.changeFrequencyFast(0)
        }
      }
    }
    else if (this.state.discrimination === 3) {
      //sound only for iron
      if (this.state.raw > 0) {
        if (this.state.value > 1) {
          SoundHelper.changeFrequencyFast(0)
        } else if (this.state.value < -10) {
          SoundHelper.changeFrequencyType(TONES[this.state.tone].negativeType)
          SoundHelper.changeFrequencyFast(TONES[this.state.tone].negativeFreq)
        }
        else {
          SoundHelper.changeFrequencyFast(0)
        }
      }
    }
    else if (this.state.discrimination === 0) {
      //no disc, sound everything
      if (this.state.raw + this.state.sensitivity * 2 > this.state.treshold * 10) {
        SoundHelper.changeFrequencyType(TONES[this.state.tone].negativeType)
        SoundHelper.changeFrequencyFast(TONES[this.state.tone].negativeFreq)
      } else {
        SoundHelper.changeFrequencyFast(0)

      }
    }
    else if (this.state.discrimination === 1) {
      //no disc, sound everything
      if (this.state.raw > 0) {
        if (this.state.value > 10) {
          SoundHelper.changeFrequencyType(TONES[this.state.tone].positiveType)
          SoundHelper.changeFrequencyFast(TONES[this.state.tone].positiveFreq)
        } else if (this.state.value < -1) {
          SoundHelper.changeFrequencyType(TONES[this.state.tone].negativeType)
          SoundHelper.changeFrequencyFast(TONES[this.state.tone].negativeFreq)
        }
        else {
          SoundHelper.changeFrequencyFast(0)
        }
      }
    }
  }

  handleModeChange = () => {
    if (this.state.activeMode === 0) {
      //console.log('general mode')
    }
    else if (this.state.activeMode === 1) {
      //console.log('stable mode')
    }
    else if (this.state.activeMode === 2) {
      //console.log('high sens')
    }
    else if (this.state.activeMode === 3) {
      //console.log('ferrous')
    }
    else if (this.state.activeMode === 4) {
      //console.log('non ferrous')
    }
    else if (this.state.activeMode === 5) {
      //console.log('custom')
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

  getDiscrimination = (val) => {
    if (val > 10) {
      return 1
    } else if (val < -10) {
      return 2
    } else {
      return 0
    }
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

        <Indicator value={this.state.value / 4} id={this.state.id} disc={this.state.value / 4} />

        <div className="vlf-panel right" ref={this.rightRef}   >
          <div className="vlf-settings">
            <VLFSettings
              cursor={this.state.cursorSettings}
              focus={this.state.cursorX === 1}
              treshold={this.state.treshold}
              sensitivity={this.state.sensitivity}
              settingsSelected={this.state.settingsSelected}
              discrimination={DISCRIMINATION_TYPES[this.state.discrimination]}
              tone={this.state.tone}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default VlfScan