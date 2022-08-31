import React from 'react'
import './PulseTimings.css'

import UpIcon from '../../Assets/MenuIcons/date-up-arrow.png'
import DownIcon from '../../Assets/MenuIcons/date-down-arrow.png'
import SocketHelper from '../../SocketHelper'
import { clamp, padStart } from 'lodash'
import SoundHelper from '../../SoundHelper'
import Kevgir from '../../Kevgir'

const MODES = [
  { name: 'off', command: 'H0' },
  { name: 'small', command: 'H1' },
  { name: 'middle', command: 'H2' },
  { name: 'large', command: 'H3' },
]

class PulseTimings extends React.Component {

  constructor(props) {
    super(props)

    this.rawValue = [0, 0, 0]
    this.calibration = [0, 0, 0]
    this.realValues = [0, 0, 0]
    this.calibrated = true
    this.angle = 0
    this.ratio = 0.5
    this.sens = 0

    this.kevgirInstanse = new Kevgir()

    this.state = {
      timings: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      cursor: 0,
      eeprom: 'test',
      activeMode: 0,
      rV: [0, 0, 0],
    }
  }

  componentDidMount() {
    SoundHelper.createOscillator('sawtooth')
    SocketHelper.attach(this.handleSocketData)
    SocketHelper.send('U')
    //SocketHelper.send(MODES[this.state.activeMode])

  }

  componentWillUnmount() {
    SoundHelper.stopOscillator()

    SocketHelper.send('H0')

    SocketHelper.detach()
  }


  handleSocketData = (data) => {
    //console.log(data)
    if (data.type === 'button') {
      switch (data.payload) {
        case 'turnoff':
          this.changeMode()
          break
        case 'left':
          this.setState({ cursor: clamp(this.state.cursor - 1, 0, 8) })
          break
        case 'right':
          this.setState({ cursor: clamp(this.state.cursor + 1, 0, 8) })
          break
        case 'up':
          this.updateTimings(clamp(this.state.timings[this.state.cursor] + 1, 0, 10000))
          break
        case 'down':
          this.updateTimings(clamp(this.state.timings[this.state.cursor] - 1, 0, 255))
          break
        case 'back':
          this.props.navigateTo('lockerScreen')
          break
        case 'home':
          console.log('home')
          // SocketHelper.send('U')

          // const timeout = setTimeout(() => {
          //   const times = this.state.timings

          //   const hexArrayTemp = times.map(e => {
          //     return (padStart(e.toString(), 4, '0').toUpperCase())
          //   })


          //   const commandTemp = hexArrayTemp.join('')
          //   //console.log(commandTemp)
          //   SocketHelper.send('G' + commandTemp)
          //   clearTimeout(timeout)
          // }, 120)

          // const timeout2 = setTimeout(() => {
          //   SocketHelper.send('U')
          //   clearTimeout(timeout2)
          // }, 300)

          break
        case 'start':
          this.calibrated = true
          this.kevgirInstanse.calibrate()
          break
        case 'ok':
          const pt = this.state.timings

          const hexArray = pt.map(e => {
            return (padStart(e.toString(), 4, '0').toUpperCase())
          })


          const command = hexArray.join('')
          //console.log(command)
          SocketHelper.send('G' + command + '\n')
          //SocketHelper.send('U')
          break
        default:
          break
      }
    }
    else if (data.type === 'pulse-timings') {
      const eeprom = (data.payload.split('.').slice(1, 10).map(e => parseInt(e)))
      //console.log(eeprom)
      this.setState({ timings: eeprom })
    }
    else if (data.type === 'pulse') {
      const result = this.kevgirInstanse.detectorFunction(data)

      //console.log(result)

      this.ratio = result.ratio
      this.sens = result.sens
      this.angle = result.angle
      this.realValues = result.realValues

      //console.log(this.sens)
      if (Math.trunc(this.sens * 1000 * 5) > 15) {
        SoundHelper.changeFrequencySmooth(Math.trunc(this.sens * 1000 * 5))
      } else {
        SoundHelper.changeFrequencyFast(0)
      }

      this.forceUpdate()
    }
  }

  updateTimings(data) {
    const newValue = (data)
    let oldTimings = this.state.timings
    oldTimings[this.state.cursor] = newValue
    this.setState(oldTimings)
  }

  changeMode = () => {
    let currentMode = this.state.activeMode

    if (currentMode >= 3) {
      currentMode = 0
    } else {
      currentMode++
    }

    this.setState({
      activeMode: currentMode
    }, () => {
      SocketHelper.send(MODES[this.state.activeMode].command)
    })


  }

  render() {
    return (
      <div className="component pulse-timigs">
        <div className="pulse-timimgs-active-coil">
          Current Coil: {MODES[this.state.activeMode].name}
        </div>

        <div className="pulse-timings-plot-holder">
          <svg className="pulse-disc-plot" width="500" height="180" style={{ display: this.calibrated ? 'block' : 'none' }}>
            <line x1={1 * this.kevgirInstanse.realValues[1] + 250} x2="250" y1={((this.kevgirInstanse.realValues[2] * -1) + 90)} y2="90" stroke="#ffffffad" />
            <circle cx={1 * this.kevgirInstanse.realValues[1] + 250} cy={((this.kevgirInstanse.realValues[2] * -1) + 90)} r="5" fill="#ffffff" />
            <text
              x={10}
              y={170}
              fill="#ffffff"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="12"
            >{`${this.realValues[1]} ${this.realValues[2]}`}</text>

            <text
              x={490}
              y={170}
              fill="#ffffff"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="12"
              textAnchor="end"
            >{`${Math.trunc(this.sens * 1000)}`}</text>

            <line x1="0" x2="500" y1="90" y2="90" stroke="#ffffff30" />
            <line x1="250" x2="250" y1="0" y2="180" stroke="#ffffff30" />

            <rect x="10" y="10" width="480" height="12" stroke="#ffffff" strokeWidth="1" fill="none" />
            <rect x={(440 * this.ratio) + 26} y="12" width="8" height="8" strokeWidth="1" fill="red" />
            <rect x="0" y="0" width="500" height="180" stroke="orange" strokeWidth="4" fill="none" />
          </svg>

          <svg width="180" height="180" className="pulse-angle" style={{ display: this.calibrated ? 'block' : 'none' }}>
            <rect x="0" y="0" width="180" height="180" stroke="orange" strokeWidth="4" fill="none" />
            <line
              x1="10"
              x2="170"
              y1="90"
              y2="90"
              stroke="#ffffff"
              strokeWidth="2"
              style={{
                transform: `rotate(${-this.angle}deg)`
              }}
            />

            <line
              x1="10"
              x2="170"
              y1="90"
              y2="90"
              stroke="#ff0000"
              strokeWidth="1"
              style={{
                transform: `rotate(${-7}deg)`
              }}
            />

            <circle
              cx="90"
              cy="90"
              r="30"
              stroke="#ffffff"
              strokeWidth="2"
            />

            <text
              x={90}
              y={90}
              fill="#ffffff"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="16"
              textAnchor="middle"
              dominantBaseline="middle"
            >{`${this.angle.toFixed(2)}`}</text>


            <rect strokeWidth="2" stroke="#ffffff" x="10" y="160" width="160" height="10" />
            <rect strokeWidth="1" fill="red" x="11" y="161" width={160 * this.sens} height="8" />
          </svg>
        </div>


        <div className="eeprom-data">
          {this.state.timings.join('  -  ')}
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
            <div className="pulse-timing-value">{this.state.timings[2]} μs</div>
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
            <div className="pulse-timing-value">{this.state.timings[5]} μs</div>
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
            <div className="pulse-timing-value">{this.state.timings[8]} μs</div>
            <img alt="arrow" src={DownIcon} />
          </div>
        </div>

      </div>
    )
  }


}

export default PulseTimings