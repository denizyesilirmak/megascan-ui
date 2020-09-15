import React from 'react';
import battery_icon from '../../../Assets/sta-battery.png'
import './Battery.css'
import socketHelper from '../../../SocketHelper'

const batteryColors = [
  "#E50006",
  "#E12700",
  "#DD5400",
  "#DD5400",
  "#D5A800",
  "#D2D000",
  "#A4CE00",
  "#78CA00",
  "#4DC600",
  "#23C200",
  "#00BF03"
]

class Battery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 0
    }
  }


  componentDidMount() {
    socketHelper.attachSpecial("battery", this.handleBattery)
    setTimeout(() => {
      socketHelper.send('P')
    }, 1500);
  }

  handleBattery = (sd) => {
    // console.log(sd)
    clearInterval(this.animation_interval)
    if (sd.type === "battery") {
      this.setState({
        level: Math.trunc(sd.payload)
      })
    }
  }


  renderThunderbolt = () => {
    return (
      <svg width="35" height="14.00000000000000" className="thunder">
        <g>
          <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
            <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
          </g>
        </g>
        <g>
          <path stroke="#000" fill="#ffffff" strokeWidth="0" d="m13.12141,-4.85658l5.13875,6.45297l-2.11891,0.76155l6.47067,5.52878l-2.11797,0.92332l7.9991,9.25824l-13.5679,-7.09492l2.58789,-0.98529l-8.43011,-4.54436l3.02078,-1.40435l-8.90097,-4.76723l9.91866,-4.12873l0,0.00001z" id="svg_1" transform="rotate(-53.15835189819336 15.847898483276369,6.605845451354981) " />
        </g>
      </svg>
    )
  }


  render() {
    return (
      <React.Fragment>
        <div className="battery-indicator">
        <div className="battery-percentage">{Math.trunc(this.state.level)}</div>
          <div className="level-holder">
            <div className="battery-juice" style={{ width: this.state.level + "%", backgroundColor: batteryColors[Math.trunc(this.state.level / 10)] }}>
            </div>
          </div>
          <img style={{ marginRight: 13, marginLeft: 13 }} alt="battery" src={battery_icon}></img>
        </div >
      </React.Fragment>

    );
  }
}

export default Battery