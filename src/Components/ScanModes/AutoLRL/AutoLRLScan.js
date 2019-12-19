import React, { Component } from 'react'
import './AutoLRL.css'


class AutoLRLScan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 50
    }
  }

  componentDidMount() {
    this.test =  setInterval(() => {
      if(Math.random()>0.5){
        this.setState({
          value: Math.random() * -100 
        })
      }else{
        this.setState({
          value: Math.random() * +100 
        })
      }

    }, 200);
  }

  componentWillUnmount(){
    clearInterval(this.test)
  }


  render() {
    return (
      <div className="auto-lrl-scan">

        <div className="auto-lrl-indicator">
          <svg width="600" height="130">
            <g>
              <rect id="svg_4" height="90" width="5" y="20" x="297.5" strokeWidth="0" stroke="#000" fill="#ff0000" />

              <rect id="l1" height="76" width="19" y="27" x="264.5" fillOpacity={(this.state.value > -90 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#48FF00" />
              <rect id="l2" height="76" width="19" y="27" x="237.5" fillOpacity={(this.state.value > -80 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#7AFF00" />
              <rect id="l3" height="76" width="19" y="27" x="210.5" fillOpacity={(this.state.value > -70 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#B8FF00" />
              <rect id="l4" height="76" width="19" y="27" x="183.5" fillOpacity={(this.state.value > -60 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#F3FF00" />
              <rect id="l5" height="76" width="19" y="27" x="155.5" fillOpacity={(this.state.value > -40 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#FFEB00" />
              <rect id="l6" height="76" width="19" y="27" x="126.5" fillOpacity={(this.state.value > -30 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#FFC601" />
              <rect id="l7" height="76" width="19" y="27" x="99.5" fillOpacity={(this.state.value > -20 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#FFAD04" />
              <rect id="l8" height="76" width="19" y="27" x="72.5" fillOpacity={(this.state.value > -10 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#FF8300" />
              <rect id="l9" height="76" width="19" y="27" x="45.5" fillOpacity={(this.state.value > -5 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#FF5F00" />
              <rect id="l10" height="76" width="19" y="27" x="17.5" fillOpacity={(this.state.value > 0 && this.state.value < 0) ? '1' : 0} stroke="#8a7940" fill="#ff0000" />

              <rect id="l1" height="76" width="19" y="28" x="315.5" fillOpacity={this.state.value > 0 ? '1' : 0} stroke="#8a7940" fill="#48FF00" />
              <rect id="l2" height="76" width="19" y="28" x="343.5" fillOpacity={this.state.value > 5 ? '1' : 0} stroke="#8a7940" fill="#7AFF00" />
              <rect id="l3" height="76" width="19" y="27" x="370.5" fillOpacity={this.state.value > 10 ? '1' : 0} stroke="#8a7940" fill="#B8FF00" />
              <rect id="l4" height="76" width="19" y="27" x="397.5" fillOpacity={this.state.value > 20 ? '1' : 0} stroke="#8a7940" fill="#F3FF00" />
              <rect id="l5" height="76" width="19" y="27" x="424.5" fillOpacity={this.state.value > 30 ? '1' : 0} stroke="#8a7940" fill="#FFEB00" />
              <rect id="l6" height="76" width="19" y="27" x="453.5" fillOpacity={this.state.value > 40 ? '1' : 0} stroke="#8a7940" fill="#FFC601" />
              <rect id="l7" height="76" width="19" y="27" x="481.5" fillOpacity={this.state.value > 50 ? '1' : 0} stroke="#8a7940" fill="#FFAD04" />
              <rect id="l8" height="76" width="19" y="27" x="508.5" fillOpacity={this.state.value > 60 ? '1' : 0} stroke="#8a7940" fill="#FF8300" />
              <rect id="l9" height="76" width="19" y="27" x="535.5" fillOpacity={this.state.value > 70 ? '1' : 0} stroke="#8a7940" fill="#FF5F00" />
              <rect id="r10" height="76" width="19" y="27" x="562.5" fillOpacity={this.state.value > 80 ? '1' : 0} stroke="#8a7940" fill="#ff0000" />
            </g>
          </svg>
        </div>
        <div className="auto-lrl-direction">
          Right Direction
        </div>

        <div className="auto-lrl-button">
          NEXT
        </div>
      </div>
    )
  }
}

export default AutoLRLScan