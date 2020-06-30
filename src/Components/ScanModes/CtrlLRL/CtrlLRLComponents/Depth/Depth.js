import React, { Component } from 'react'
import './Depth.css'
import LeftArrow from '../../../../../Assets/MenuIcons/left-arrow1.png'
import RightArrow from '../../../../../Assets/MenuIcons/right-arrow1.png'
import { DeviceContext } from '../../../../../Contexts/DeviceContext'

class Depth extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="depth-component">
        <img alt="arr" src={LeftArrow} className="left-arrow" style={{filter: this.context.theme.arrorHueRotation}}></img>
        <img alt="arr" src={RightArrow} className="right-arrow" style={{filter: this.context.theme.arrorHueRotation}}></img>

        <div className="lrl-move">

        </div>

        <div className="depth-container">
          <div className="depth-value">{this.props.value} m</div>
          <svg width="80" height="80" className="depth-indicator">
            <g>
              <line opacity={this.props.value > 1 ? 1 : 0.2} stroke="#fff" id="svg_1" y2="6.43233" x2="76.05023" y1="6.43233" x1="3.94977" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 2 ? 1 : 0.2} stroke="#fff" id="svg_2" y2="12.85208" x2="74.19838" y1="12.85208" x1="5.80163" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 3 ? 1 : 0.2} stroke="#fff" id="svg_3" y2="19.27184" x2="71.48233" y1="19.27184" x1="8.51767" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 4 ? 1 : 0.2} stroke="#fff" id="svg_4" y2="25.08778" x2="69.74772" y1="25.08778" x1="10.25229" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 5 ? 1 : 0.2} stroke="#fff" id="svg_5" y2="31.50753" x2="65.54292" y1="31.50753" x1="14.45708" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 6 ? 1 : 0.2} stroke="#fff" id="svg_6" y2="37.92729" x2="60.1378" y1="37.92729" x1="19.8622" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 7 ? 1 : 0.2} stroke="#fff" id="svg_8" y2="44.07936" x2="56.05024" y1="44.07936" x1="23.94976" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 8 ? 1 : 0.2} stroke="#fff" id="svg_9" y2="50.16298" x2="52.93789" y1="50.16298" x1="27.06211" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 9 ? 1 : 0.2} stroke="#fff" id="svg_10" y2="56.7508" x2="48.8773" y1="56.7508" x1="31.1227" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 10 ? 1 : 0.2} stroke="#fff" id="svg_11" y2="62.73481" x2="45.88218" y1="62.73481" x1="34.11782" strokeWidth="3.5" fill="none" />
              <line opacity={this.props.value > 11 ? 1 : 0.2} stroke="#fff" id="svg_12" y2="69.15457" x2="43.02193" y1="69.15457" x1="36.97807" strokeWidth="3.5" fill="none" />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}
export default Depth