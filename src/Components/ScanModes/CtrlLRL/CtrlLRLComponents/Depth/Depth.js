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
        <img alt="arr" src={LeftArrow} className="left-arrow" style={{ filter: this.context.theme.arrorHueRotation }}></img>
        <img alt="arr" src={RightArrow} className="right-arrow" style={{ filter: this.context.theme.arrorHueRotation }}></img>

        <div className="lrl-move">

        </div>

        <div className="depth-container">
          <div className="depth-value" style={{borderColor: this.props.value >= 5 ? '#ffffff' : '#ff0000'}}>{this.props.value} m</div>
          <svg width="80" height="80" className="depth-indicator">
            <g>
              <line stroke={this.props.value >= 5 ? '#ffffff' : '#ff0000'} opacity={this.props.value >= 0 ? 1 : 0.2}  strokeLinecap="round" id="svg_1" y2="6.34115" x2="74.59479" y1="6.34115" x1="5.40521" strokeWidth="4"  />
              <line stroke="#ffffff" opacity={this.props.value > 5 ? 1 : 0.2} strokeLinecap="round" id="svg_2" y2="13.00781" x2="72.09479" y1="13.00781" x1="7.90521" strokeWidth="4"  />
              <line stroke="#ffffff" opacity={this.props.value > 10 ? 1 : 0.2} strokeLinecap="round" id="svg_3" y2="19.88281" x2="69.49062" y1="19.88281" x1="10.50938" strokeWidth="4"  />
              <line stroke="#ffffff" opacity={this.props.value > 15 ? 1 : 0.2} strokeLinecap="round" id="svg_4" y2="27.17448" x2="66.36562" y1="27.17448" x1="13.63438" strokeWidth="4"  />
              <line stroke="#ffffff" opacity={this.props.value > 20 ? 1 : 0.2} strokeLinecap="round" id="svg_5" y2="34.46615" x2="63.44895" y1="34.46615" x1="16.55105" strokeWidth="4"  />
              <line stroke="#ffffff" opacity={this.props.value > 25 ? 1 : 0.2} strokeLinecap="round" id="svg_6" y2="42.17448" x2="60.53229" y1="42.17448" x1="19.46771" strokeWidth="4"  />
              <line stroke="#ffffff" opacity={this.props.value > 30 ? 1 : 0.2} strokeLinecap="round" id="svg_7" y2="49.25781" x2="58.65729" y1="49.25781" x1="21.34271" strokeWidth="4"  />
              <line stroke="#ffffff" opacity={this.props.value > 35 ? 1 : 0.2} strokeLinecap="round" id="svg_8" y2="56.34114" x2="56.36562" y1="56.34114" x1="23.63438" strokeWidth="4"  />
              <line stroke="#ffffff" opacity={this.props.value > 40 ? 1 : 0.2} strokeLinecap="round" id="svg_9" y2="63" x2="53.96979" y1="63" x1="26.03021" strokeWidth="4"  />
              <line stroke="#ffffff" opacity={this.props.value >= 48 ? 1 : 0.2} strokeLinecap="round" id="svg_10" y2="70" x2="51.88645" y1="70" x1="28.11355" strokeWidth="4"  />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}
export default Depth