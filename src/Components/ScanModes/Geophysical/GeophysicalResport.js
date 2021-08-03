import React from 'react'
import './GeophysicalReport.css'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import SocketHelper from '../../../SocketHelper'


// const height = 4

const targets = {
  water: {
    minLimit: 295,
    maxLimit: 489
  },
  iron: {
    minLimit: 480,
    maxLimit: 550
  },
  bronze: {
    minLimit: 550,
    maxLimit: 575
  },
  gold: {
    minLimit: 575,
    maxLimit: 585
  },
  silver: {
    minLimit: 585,
    maxLimit: 605
  },
  tunnel: {
    minLimit: 20,
    maxLimit: 105
  }
}

class GeophysicalReport extends React.Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.tempProp = {
      target: "",
      value: 0
    }

    this.state = {
      plotheight: 3.4,
      percentage: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    //console.log(this.props.resistivityParams)
    this.tempProp = this.props.resistivityParams
    console.log(this.tempProp)
    this.calculateValue()

  }

  componentWillUnmount() {
    SocketHelper.detach()
  }

  handleSocket = (socketData) => {
    if (socketData.type !== 'button') {
      return
    }
    else if (socketData.type === 'button' && socketData.payload === 'back') {
      this.props.navigateTo('geophysicalScreen')
      return
    }
  }

  calculateValue = () => {
    console.log(this.tempProp)
    if (this.tempProp.target === 'water') {
      if (this.tempProp.value >= targets.water.minLimit && this.tempProp.value <= targets.water.maxLimit) {
        this.calculatePercentage(this.tempProp.value, targets.water.minLimit, targets.water.maxLimit)
      } else {
        this.setState({ found: false })
      }
    }
    else if (this.tempProp.target === 'iron') {
      if (this.tempProp.value >= targets.iron.minLimit && this.tempProp.value <= targets.iron.maxLimit) {
        this.calculatePercentage(this.tempProp.value, targets.iron.minLimit, targets.iron.maxLimit)
      } else {
        this.setState({ found: false })
      }
    }
    else if (this.tempProp.target === 'bronze') {
      if (this.tempProp.value >= targets.bronze.minLimit && this.tempProp.value <= targets.bronze.maxLimit) {
        this.calculatePercentage(this.tempProp.value, targets.bronze.minLimit, targets.bronze.maxLimit)
      } else {
        this.setState({ found: false })
      }
    }
    else if (this.tempProp.target === 'gold') {
      if (this.tempProp.value >= targets.gold.minLimit && this.tempProp.value <= targets.gold.maxLimit) {
        this.calculatePercentage(this.tempProp.value, targets.gold.minLimit, targets.gold.maxLimit)
      } else {
        this.setState({ found: false })
      }
    }
    else if (this.tempProp.target === 'silver') {
      if (this.tempProp.value >= targets.silver.minLimit && this.tempProp.value <= targets.silver.maxLimit) {
        this.calculatePercentage(this.tempProp.value, targets.silver.minLimit, targets.silver.maxLimit)
      } else {
        this.setState({ found: false })
      }
    }
    else {

    }
  }

  calculatePercentage = (val, min, max) => {
    console.log(val, min, max)
    const median = (max - min) / 2
    const percentage = (Math.trunc(100 - Math.abs((val - min) - median) * 100 / median))
    this.setState({
      plotheight: this.map(percentage, 0, 100, 3.4, 9.4),
      percentage: percentage
    })
  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
  }

  render() {
    return (
      <div className="component geophysical-report">
        {
          this.state.percentage === 0 ?
            <div className="no-target-found">
              {this.context.strings['targetNotFound']}
            </div> : null
        }


        <div className="geo-plot-holder">
          <svg width="400" height="330" viewBox="0 -3 8 6.6" style={{ position: 'absolute' }}>
            <line x1="4" y1={(this.state.plotheight * -1) + 7.04} x2="8" y2={(this.state.plotheight * -1) + 7.04} strokeWidth="0.06" stroke="#ff0000" />
            <path
              d={`M 2 4 L 2 4 C 3 4 3 ${(this.state.plotheight * -1) + 7} 4 ${(this.state.plotheight * -1) + 7} C 5 ${(this.state.plotheight * -1) + 7} 5 4 6 4`}
              fill="#ffb700"
            />
            <path
              d={`M 2 4 L 2 4 C 3 4 3 ${(this.state.plotheight * -0.95) + 7} 4 ${(this.state.plotheight * -0.95) + 7} C 5 ${(this.state.plotheight * -0.95) + 7} 5 4 6 4`}
              fill="#fff700"
            />
            <path
              d={`M 2 4 L 3 4 C 3 4 3 ${(this.state.plotheight * -0.9) + 7} 4 ${(this.state.plotheight * -0.9) + 7} C 5 ${(this.state.plotheight * -0.9) + 7} 5 4 5 4`}
              fill="#bbff00"
            />
            <path
              d={`M 2 4 L 3.5 4 C 3 4 3 ${(this.state.plotheight * -0.8) + 7} 4 ${(this.state.plotheight * -0.8) + 7} C 5 ${(this.state.plotheight * -0.8) + 7} 5 4 4.5 4`}
              fill="#6fff00"
            />
          </svg>

          <svg width="400" height="330" style={{ position: 'absolute' }}>
            <text textAnchor="end" x="390" y="20" fill="#b6f542" fontSize="9">100</text>
            <text textAnchor="end" x="390" y="50" fill="#b6f542" fontSize="9">90</text>
            <text textAnchor="end" x="390" y="80" fill="#b6f542" fontSize="9">80</text>
            <text textAnchor="end" x="390" y="110" fill="#b6f542" fontSize="9">70</text>
            <text textAnchor="end" x="390" y="140" fill="#b6f542" fontSize="9">60</text>
            <text textAnchor="end" x="390" y="170" fill="#b6f542" fontSize="9">50</text>
            <text textAnchor="end" x="390" y="200" fill="#b6f542" fontSize="9">40</text>
            <text textAnchor="end" x="390" y="230" fill="#b6f542" fontSize="9">30</text>
            <text textAnchor="end" x="390" y="260" fill="#b6f542" fontSize="9">20</text>
            <text textAnchor="end" x="390" y="290" fill="#b6f542" fontSize="9">15</text>
            <text textAnchor="end" x="390" y="320" fill="#b6f542" fontSize="9">0</text>

            <line x1="0" x2="400" y1="30" y2="30" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="60" y2="60" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="90" y2="90" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="120" y2="120" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="150" y2="150" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="180" y2="180" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="210" y2="210" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="240" y2="240" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="270" y2="270" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="300" y2="300" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          </svg>
        </div>

        <div className="geo-plot-report">

          <div className="geo-plot-result-panel" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="result-title">
              {this.context.strings['target']}
            </div>
            <div className="result-value">
              {this.context.strings[this.props.resistivityParams.target]}
            </div>
          </div>

          <div className="geo-plot-result-panel" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="result-title">
              {this.context.strings['value']}
            </div>
            <div className="result-value">
              {this.tempProp.value}
            </div>
          </div>

          <div className="geo-plot-result-panel" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="result-title">
              {this.context.strings['rate']}
            </div>
            <div className="result-value">
              {this.state.percentage}%
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default GeophysicalReport