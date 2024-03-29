import React, { Component } from 'react'
import './AutoLRL.css'
import { DeviceContext } from '../../../Contexts/DeviceContext'
import SoundHelper from '../../../SoundHelper'

class AutoLRLScan extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      direction: true,
      counter: 0
    }
  }

  componentDidMount() {
    SoundHelper.changeFrequencyFast(0)
    SoundHelper.createOscillator('sine')

    this.lrlInterval = setInterval(() => {
      if (this.state.direction) {
        this.setState({ value: this.state.value + 10 })
        if (this.state.value > 100) {
          this.setState({ direction: false })
        }
      }
      else if (!this.state.direction) {
        this.setState({ value: this.state.value - 10 })
        if (this.state.value < -100) {
          this.setState({ direction: true })
        }
      }

      if(this.state.value === 0){
        this.setState({
          counter: this.state.counter +1
        })
      }

      if(this.state.counter === 2){
        clearInterval(this.lrlInterval)
        this.props.next()
      }

      SoundHelper.changeFrequencySmooth(200 + Math.abs(this.state.value * 2))
    }, 750);
  }

  componentWillUnmount() {
    SoundHelper.stopOscillator()
    clearInterval(this.lrlInterval)
  }


  render() {
    return (
      <div className="auto-lrl-scan">

        <div className="auto-lrl-indicator">
          <svg width="600" height="130">
            <g>
              <rect id="svg_4" height="90" width="5" y="20" x="297.5" strokeWidth="0" stroke="#000" fill="#ff0000" />

              <rect id="l1" height="76" width="19" y="27" x="264.5" fillOpacity={(this.state.value < 0 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#48FF00" />
              <rect id="l2" height="76" width="19" y="27" x="237.5" fillOpacity={(this.state.value < -10 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#7AFF00" />
              <rect id="l3" height="76" width="19" y="27" x="210.5" fillOpacity={(this.state.value < -20 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#B8FF00" />
              <rect id="l4" height="76" width="19" y="27" x="183.5" fillOpacity={(this.state.value < -30 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#F3FF00" />
              <rect id="l5" height="76" width="19" y="27" x="155.5" fillOpacity={(this.state.value < -40 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#FFEB00" />
              <rect id="l6" height="76" width="19" y="27" x="126.5" fillOpacity={(this.state.value < -50 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#FFC601" />
              <rect id="l7" height="76" width="19" y="27" x="99.5" fillOpacity={(this.state.value < -60 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#FFAD04" />
              <rect id="l8" height="76" width="19" y="27" x="72.5" fillOpacity={(this.state.value < -70 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#FF8300" />
              <rect id="l9" height="76" width="19" y="27" x="45.5" fillOpacity={(this.state.value < -80 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#FF5F00" />
              <rect id="l10" height="76" width="19" y="27" x="17.5" fillOpacity={(this.state.value < -90 && this.state.value < 0) ? '1' : 0} stroke={this.context.theme.border_color} fill="#ff0000" />

              <rect id="l1" height="76" width="19" y="28" x="315.5" fillOpacity={this.state.value > 0 ? '1' : 0} stroke={this.context.theme.border_color} fill="#48FF00" />
              <rect id="l2" height="76" width="19" y="28" x="343.5" fillOpacity={this.state.value > 10 ? '1' : 0} stroke={this.context.theme.border_color} fill="#7AFF00" />
              <rect id="l3" height="76" width="19" y="27" x="370.5" fillOpacity={this.state.value > 20 ? '1' : 0} stroke={this.context.theme.border_color} fill="#B8FF00" />
              <rect id="l4" height="76" width="19" y="27" x="397.5" fillOpacity={this.state.value > 30 ? '1' : 0} stroke={this.context.theme.border_color} fill="#F3FF00" />
              <rect id="l5" height="76" width="19" y="27" x="424.5" fillOpacity={this.state.value > 40 ? '1' : 0} stroke={this.context.theme.border_color} fill="#FFEB00" />
              <rect id="l6" height="76" width="19" y="27" x="453.5" fillOpacity={this.state.value > 50 ? '1' : 0} stroke={this.context.theme.border_color} fill="#FFC601" />
              <rect id="l7" height="76" width="19" y="27" x="481.5" fillOpacity={this.state.value > 60 ? '1' : 0} stroke={this.context.theme.border_color} fill="#FFAD04" />
              <rect id="l8" height="76" width="19" y="27" x="508.5" fillOpacity={this.state.value > 70 ? '1' : 0} stroke={this.context.theme.border_color} fill="#FF8300" />
              <rect id="l9" height="76" width="19" y="27" x="535.5" fillOpacity={this.state.value > 80 ? '1' : 0} stroke={this.context.theme.border_color} fill="#FF5F00" />
              <rect id="r10" height="76" width="19" y="27" x="562.5" fillOpacity={this.state.value > 90 ? '1' : 0} stroke={this.context.theme.border_color} fill="#ff0000" />
            </g>
          </svg>
        </div>
        <div className="auto-lrl-direction">
          {
            this.state.direction ? this.context.strings["rightdirection"] : this.context.strings["leftdirection"]
          }
        </div>

        <div className="auto-lrl-button">
          {
            this.context.strings["next"]
          }
        </div>
      </div>
    )
  }
}

export default AutoLRLScan