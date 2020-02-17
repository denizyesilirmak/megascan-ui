import React, { Component } from 'react'
import './AutoLRLResult.css'

class AutoLRLResult extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gold: 30,
      silver: 40,
      iron: 90,
      diamond: 4
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        gold: Math.trunc(Math.random() * 100),
        silver: Math.trunc(Math.random() * 100),
        iron: Math.trunc(Math.random() * 100),
        diamond: Math.trunc(Math.random() * 100)
      })
    }, 600);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="auto-lrl-result">
        <div className="title">REPORT</div>

        <div className="prop">
          <div className="label">GOLD:</div>
          <div className="value-back">
            <div className="value" style={{ width: this.state.gold + "%", background: "gold" }} />
          </div>
          <div className="percentage">{this.state.gold}%</div>
        </div>

        <div className="prop">
          <div className="label">SILVER:</div>
          <div className="value-back">
            <div className="value" style={{ width: this.state.silver + "%", background: "silver" }} />
          </div>
          <div className="percentage">{this.state.silver}%</div>
        </div>

        <div className="prop">
          <div className="label">IRON:</div>
          <div className="value-back">
            <div className="value" style={{ width: this.state.iron + "%", background: "lightGrey" }} />
          </div>
          <div className="percentage">{this.state.iron}%</div>
        </div>

        <div className="prop">
          <div className="label">DIAMOND:</div>
          <div className="value-back">
            <div className="value" style={{ width: this.state.diamond + "%", background: "lightBlue" }} />
          </div>
          <div className="percentage">{this.state.diamond}%</div>
        </div>
      </div>
    )
  }
}
export default AutoLRLResult