import React from 'react'
import './PulseTimings.css'

import UpIcon from '../../Assets/MenuIcons/date-up-arrow.png'
import DownIcon from '../../Assets/MenuIcons/date-down-arrow.png'
import SocketHelper from '../../SocketHelper'
import { clamp, padStart } from 'lodash'
//import SoundHelper from '../../SoundHelper'


class PulseTimings extends React.Component {

  constructor(props) {
    super(props)
    this.rawValue = 0
    this.state = {
      timings: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      cursor: 0,
      eeprom: '',
      activeMode: 'H2',
      calibration: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocketData)
    SocketHelper.send('U')
    SocketHelper.send(this.state.activeMode)

  }

  componentWillUnmount() {

    SocketHelper.send('H0')

    SocketHelper.detach()
  }

  handleSocketData = (data) => {
    //console.log(data)
    if (data.type === 'button') {
      switch (data.payload) {
        case 'left':
          this.setState({ cursor: clamp(this.state.cursor - 1, 0, 8) })
          break
        case 'right':
          this.setState({ cursor: clamp(this.state.cursor + 1, 0, 8) })
          break
        case 'up':
          this.updateTimings(clamp(this.state.timings[this.state.cursor] + 1, 0, 255))
          break
        case 'down':
          this.updateTimings(clamp(this.state.timings[this.state.cursor] - 1, 0, 255))
          break
        case 'back':
          this.props.navigateTo('lockerScreen')
          break
        case 'start':
          SocketHelper.send('U')
          this.setState({
            calibration: this.rawValue
          })
          break
        case 'ok':
          const pt = this.state.timings

          const hexArray = pt.map(e => {
            return (padStart(e.toString(), 3, '0').toUpperCase())
          })


          const command = hexArray.join('')
          console.log(command)
          // const charArray = pt.map(e => {
          //   console.log(e)
          //   return decodeURIComponent(String.fromCharCode(e))
          // })
          // console.log('G' + charArray.join(''))
          SocketHelper.send('G' + command)
          break
        default:
          break
      }
    }
    else if (data.type === 'pulse-timings') {
      const eeprom = (data.payload.split('.').slice(1, 10).map(e => parseInt(e)))
      console.log(eeprom)
      this.setState({ timings: eeprom })
    }
    else if (data.type === 'pulse') {
      console.log(data.payload)

    }
  }

  updateTimings(data) {
    const newValue = (data)
    let oldTimings = this.state.timings
    oldTimings[this.state.cursor] = newValue
    this.setState(oldTimings)
  }

  render() {
    return (
      <div className="component pulse-timigs">

        <div className="eeprom-data">
          {this.state.eeprom}
        </div>

        <div className="timings-container">
          <div className={`pulse-timing-box ${this.state.cursor === 0 ? 'selected' : ''}`}>
            <div className="pulse-timing-title">1.RP</div>
            <img alt="arrow" src={UpIcon} />
            <div className="pulse-timing-value">{this.state.timings[0]}</div>
            <img alt="arrow" src={DownIcon} />
          </div>

          <div className={`pulse-timing-box ${this.state.cursor === 1 ? 'selected' : ''}`}>
            <div className="pulse-timing-title">1.DP</div>
            <img alt="arrow" src={UpIcon} />
            <div className="pulse-timing-value">{this.state.timings[1]}</div>
            <img alt="arrow" src={DownIcon} />
          </div>

          <div className={`pulse-timing-box ${this.state.cursor === 2 ? 'selected' : ''}`}>
            <div className="pulse-timing-title">1.PT</div>
            <img alt="arrow" src={UpIcon} />
            <div className="pulse-timing-value">{this.state.timings[2]}</div>
            <img alt="arrow" src={DownIcon} />
          </div>

          <div className={`pulse-timing-box ${this.state.cursor === 3 ? 'selected' : ''}`}>
            <div className="pulse-timing-title">2.RP</div>
            <img alt="arrow" src={UpIcon} />
            <div className="pulse-timing-value">{this.state.timings[3]}</div>
            <img alt="arrow" src={DownIcon} />
          </div>

          <div className={`pulse-timing-box ${this.state.cursor === 4 ? 'selected' : ''}`}>
            <div className="pulse-timing-title">2.DP</div>
            <img alt="arrow" src={UpIcon} />
            <div className="pulse-timing-value">{this.state.timings[4]}</div>
            <img alt="arrow" src={DownIcon} />
          </div>

          <div className={`pulse-timing-box ${this.state.cursor === 5 ? 'selected' : ''}`}>
            <div className="pulse-timing-title">2.PT</div>
            <img alt="arrow" src={UpIcon} />
            <div className="pulse-timing-value">{this.state.timings[5]}</div>
            <img alt="arrow" src={DownIcon} />
          </div>

          <div className={`pulse-timing-box ${this.state.cursor === 6 ? 'selected' : ''}`}>
            <div className="pulse-timing-title">3.RP</div>
            <img alt="arrow" src={UpIcon} />
            <div className="pulse-timing-value">{this.state.timings[6]}</div>
            <img alt="arrow" src={DownIcon} />
          </div>

          <div className={`pulse-timing-box ${this.state.cursor === 7 ? 'selected' : ''}`}>
            <div className="pulse-timing-title">3.DP</div>
            <img alt="arrow" src={UpIcon} />
            <div className="pulse-timing-value">{this.state.timings[7]}</div>
            <img alt="arrow" src={DownIcon} />
          </div>

          <div className={`pulse-timing-box ${this.state.cursor === 8 ? 'selected' : ''}`}>
            <div className="pulse-timing-title">3.PT</div>
            <img alt="arrow" src={UpIcon} />
            <div className="pulse-timing-value">{this.state.timings[8]}</div>
            <img alt="arrow" src={DownIcon} />
          </div>
        </div>

      </div>
    )
  }


}

export default PulseTimings