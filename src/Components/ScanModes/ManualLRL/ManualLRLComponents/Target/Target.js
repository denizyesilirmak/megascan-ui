import React, { Component } from 'react'
import './Target.css'
import Diamond from '../../../../../Assets/materials/diamond.png'
import Gold from '../../../../../Assets/materials/gold.png'
import Silver from '../../../../../Assets/materials/silver.png'
class Target extends Component {
  render() {
    return (
      <div className="ctrl-lrl-target">
        <div className="target-button-container">

          <div className="target-button" style={{transform: `scale(${this.props.index === 0 ? '1.1' : '0.8'})`, opacity: this.props.index === 0 ? 1 : 0.7}}>
            <img alt="goldore" src={Gold} />
            <div className="label">Gold</div>
          </div>

          <div className="target-button" style={{transform: `scale(${this.props.index === 1 ? '1.1' : '0.8'})`, opacity: this.props.index === 1 ? 1 : 0.7}}>
            <img alt="silverore" src={Silver} />
            <div className="label">Silver</div>
          </div>

          <div className="target-button" style={{transform: `scale(${this.props.index === 2 ? '1.1' : '0.9'})`, opacity: this.props.index === 2 ? 1 : 0.7}}>
            <img alt="diamond" src={Diamond} />
            <div className="label">Diamond</div>
          </div>

        </div>
      </div>
    )
  }
}
export default Target