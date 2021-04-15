import React from 'react'
import './Nugget.css'
import SocketHelper from '../../../SocketHelper'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import Indicator from './NuggetComponents/Indicator'
import SoundHelper from '../../../SoundHelper'
import dbStorage from '../../../DatabaseHelper'

import ArrowRight from '../../../Assets/MenuIcons/right-arrow2.png'
import ArrowLeft from '../../../Assets/MenuIcons/left-arrow2.png'

class Nugget extends React.Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      rawValue: 0,
      cursor: true,
      treshold: 0,
      sensitivity: 0
    }
  }

  componentDidMount() {
    this.readFromDb()
    SocketHelper.attach(this.handleSocket)
    SoundHelper.createOscillator('sawtooth')
    this.starttimeout = setTimeout(() => {
      SocketHelper.send('Y.1')
      clearTimeout(this.starttimeout)
    }, 150);
  }

  componentWillUnmount() {
    SocketHelper.send('Y.0')
    SoundHelper.stopOscillator()
    SocketHelper.detach()
  }

  readFromDb = async () => {
    try {
      const nugget_threshold = await dbStorage.getItem('nugget_threshold') || 0
      const nugget_sensitivity = await dbStorage.getItem('nugget_sensitivity') || 0

      this.setState({
        treshold: nugget_threshold,
        sensitivity: nugget_sensitivity
      })
    } catch (error) {
      console.log(error)
    }
    //console.log(PREDEFINED_SETTINGS[5])
  }

  saveToDb = async () => {
    await dbStorage.setItem('nugget_threshold', this.state.treshold)
    await dbStorage.setItem('nugget_sensitivity', this.state.sensitivity)
  }

  handleSocket = (socketData) => {
    if (socketData.type === "button") {
      switch (socketData.payload) {
        case 'left':
          this.setState({
            cursor: !this.state.cursor
          })
          break;
        case 'right':
          this.setState({
            cursor: !this.state.cursor
          })
          break;
        case 'up':
          if (this.state.cursor === true) {
            if (this.state.treshold > 0) {
              this.setState({
                treshold: this.state.treshold - 1
              })
            }
          }
          else if (this.state.cursor === false) {
            if (this.state.sensitivity > 0) {
              this.setState({
                sensitivity: this.state.sensitivity - 1
              })
            }
          }
          break;
        case 'down':
          if (this.state.cursor === true) {
            if (this.state.treshold < 7) {
              this.setState({
                treshold: this.state.treshold + 1
              })
            }
          }
          else if (this.state.cursor === false) {
            if (this.state.sensitivity < 7) {
              this.setState({
                sensitivity: this.state.sensitivity + 1
              })
            }
          }
          break;
        case 'back':
          this.saveToDb()
          if (this.context.device === "infinity") {
            this.props.navigateTo('detectorModeSelectorScreen')
          } else {
            this.props.navigateTo('menuScreen')
          }
          return;

        default:
          break;
      }
    }
    else if (socketData.type === 'vlf') {
      this.setState({
        rawValue: socketData.raw
      })
      this.generateSound()
    }
  }

  generateSound = () => {
    console.log(this.state.rawValue)
    if ((this.state.rawValue + this.state.sensitivity * 3) > (this.state.treshold * 12)) {
      SoundHelper.changeFrequencyFast(550)
    } else {
      SoundHelper.changeFrequencyFast(0)
    }
  }

  render() {
    return (
      <div className="nugget-scan component">
        <div className="ng-left">
          <svg width="180" height="376">

            <rect x="20" y="20" width="110" height="335" rx="15" fill={this.state.cursor ? "#ffffff30" : "none"} />

            <text fill="#ffffff" x="70" y="10" fontSize="13" alignmentBaseline="middle" textAnchor="middle">TRESHOLD</text>
            <image href={ArrowLeft} x="103" y={29 + 42 * this.state.treshold} />

            <line x1="90" y1="40" x2="90" y2="336" stroke="#ffffff" strokeWidth="3" />
            <line x1="90" y1="40" x2="90" y2="336" stroke="#ffffff" strokeWidth="15" strokeDasharray="2 40" />

            <text className="nugget-text" fill={this.state.treshold === 0 ? "#00ff00" : "#ffffff"} x="70" y="45" alignmentBaseline="middle" textAnchor="end">0</text>
            <text className="nugget-text" fill={this.state.treshold === 1 ? "#00ff00" : "#ffffff"} x="70" y="84" alignmentBaseline="middle" textAnchor="end">10</text>
            <text className="nugget-text" fill={this.state.treshold === 2 ? "#00ff00" : "#ffffff"} x="70" y="126" alignmentBaseline="middle" textAnchor="end">20</text>
            <text className="nugget-text" fill={this.state.treshold === 3 ? "#00ff00" : "#ffffff"} x="70" y="168" alignmentBaseline="middle" textAnchor="end">30</text>
            <text className="nugget-text" fill={this.state.treshold === 4 ? "#00ff00" : "#ffffff"} x="70" y="210" alignmentBaseline="middle" textAnchor="end">40</text>
            <text className="nugget-text" fill={this.state.treshold === 5 ? "#00ff00" : "#ffffff"} x="70" y="253" alignmentBaseline="middle" textAnchor="end">50</text>
            <text className="nugget-text" fill={this.state.treshold === 6 ? "#00ff00" : "#ffffff"} x="70" y="293" alignmentBaseline="middle" textAnchor="end">60</text>
            <text className="nugget-text" fill={this.state.treshold === 7 ? "#00ff00" : "#ffffff"} x="70" y="332" alignmentBaseline="middle" textAnchor="end">70</text>
          </svg>
        </div>

        <div className="ng-middle">
          <Indicator rawValue={this.state.rawValue / 4} />
        </div>

        <div className="ng-right">
          <svg width="180" height="376">
            <rect x="45" y="20" width="110" height="335" rx="15" fill={!this.state.cursor ? "#ffffff30" : "none"} />
            <text fill="#ffffff" x="90" y="10" fontSize="13" alignmentBaseline="middle" textAnchor="middle">SENSITIVITY</text>
            <image href={ArrowRight} x="60" y={29 + 42 * this.state.sensitivity} />

            <line x1="90" y1="40" x2="90" y2="336" stroke="#ffffff" strokeWidth="3" />
            <line x1="90" y1="40" x2="90" y2="336" stroke="#ffffff" strokeWidth="15" strokeDasharray="2 40" />

            <text className="nugget-text" fill={this.state.sensitivity === 0 ? "#00ff00" : "#ffffff"} x="105" y="45" alignmentBaseline="middle" textAnchor="start">0</text>
            <text className="nugget-text" fill={this.state.sensitivity === 1 ? "#00ff00" : "#ffffff"} x="105" y="84" alignmentBaseline="middle" textAnchor="start">10</text>
            <text className="nugget-text" fill={this.state.sensitivity === 2 ? "#00ff00" : "#ffffff"} x="105" y="126" alignmentBaseline="middle" textAnchor="start">20</text>
            <text className="nugget-text" fill={this.state.sensitivity === 3 ? "#00ff00" : "#ffffff"} x="105" y="168" alignmentBaseline="middle" textAnchor="start">30</text>
            <text className="nugget-text" fill={this.state.sensitivity === 4 ? "#00ff00" : "#ffffff"} x="105" y="210" alignmentBaseline="middle" textAnchor="start">40</text>
            <text className="nugget-text" fill={this.state.sensitivity === 5 ? "#00ff00" : "#ffffff"} x="105" y="253" alignmentBaseline="middle" textAnchor="start">50</text>
            <text className="nugget-text" fill={this.state.sensitivity === 6 ? "#00ff00" : "#ffffff"} x="105" y="293" alignmentBaseline="middle" textAnchor="start">60</text>
            <text className="nugget-text" fill={this.state.sensitivity === 7 ? "#00ff00" : "#ffffff"} x="105" y="332" alignmentBaseline="middle" textAnchor="start">70</text>
          </svg>
        </div>
      </div>
    )
  }
}

export default Nugget