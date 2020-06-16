import React, { Component } from 'react'
import './AutoLRLResult.css'

class AutoLRLResult extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gold: 0,
      silver: 0,
      iron: 0,
      diamond: 0
    }
  }

  componentDidMount() {
    let timeout = setTimeout(() => {
      this.setState({
        gold: Math.ceil(Math.random()*100),
        silver: Math.ceil(Math.random()*100),
        iron: Math.ceil(Math.random()*100),
        diamond: Math.ceil(Math.random()*100)
      })
    }, 100);
  }

  componentWillUnmount(){
    // clearInterval(this.interval)
  }

  render() {
    return (
      <div className="auto-lrl-result">
        <div className="title">REPORT</div>

        <div className="prop">
          <div className="label">GOLD:</div>
          <div className="value-back">
            <div className="value" style={{ width: this.state.gold + "%", backgroundImage: "linear-gradient(0deg, rgba(255,146,30,1) 21%, rgba(255,224,13,1) 73%, rgba(252,199,0,1) 89%)" }} />
          </div>
          <div className="percentage">{this.state.gold}%</div>
        </div>

        <div className="prop">
          <div className="label">SILVER:</div>
          <div className="value-back">
            <div className="value" style={{ width: this.state.silver + "%", background: "linear-gradient(0deg, rgba(148,148,148,1) 21%, rgba(247,247,247,1) 73%, rgba(207,207,207,1) 89%)" }} />
          </div>
          <div className="percentage">{this.state.silver}%</div>
        </div>

        <div className="prop">
          <div className="label">IRON:</div>
          <div className="value-back">
            <div className="value" style={{ width: this.state.iron + "%", background: "linear-gradient(0deg, rgba(116,111,93,1) 21%, rgba(247,247,247,1) 73%, rgba(172,172,172,1) 89%)" }} />
          </div>
          <div className="percentage">{this.state.iron}%</div>
        </div>

        <div className="prop">
          <div className="label">DIAMOND:</div>
          <div className="value-back">
            <div className="value" style={{ width: this.state.diamond + "%", background: "linear-gradient(0deg, rgba(54,83,135,1) 21%, rgba(26,238,255,1) 73%, rgba(208,248,255,1) 89%)" }} />
          </div>
          <div className="percentage">{this.state.diamond}%</div>
        </div>
      </div>
    )
  }
}
export default AutoLRLResult