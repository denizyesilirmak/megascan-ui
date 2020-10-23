import React, { Component } from 'react'
import './Distance.css'
import LeftArrow from '../../../../../Assets/MenuIcons/left-arrow1.png'
import RightArrow from '../../../../../Assets/MenuIcons/right-arrow1.png'
import { DeviceContext } from '../../../../../Contexts/DeviceContext'

class Distance extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="distance-component">
        <img alt="arr" src={LeftArrow} className="left-arrow" style={{filter: this.context.theme.arrorHueRotation}}></img>
        <img alt="arr" src={RightArrow} className="right-arrow" style={{filter: this.context.theme.arrorHueRotation}}></img>

        <div className="lrl-move">
          
        </div>

        <div className="distance-container">
          <div className="distance-value">{this.props.value} m</div>
          <svg width="240" height="80" className="distance-indicator">
            <g>
              <path opacity={this.props.value > 90 * 27 ? 1 : 0.2} stroke={this.props.value > 82 * 27 && this.props.value < 95 * 27 ? '#00ff00' : '#ffffff'} strokeWidth="5" transform="rotate(-90 192.00000000000003,41.102676391601555) " id="svg_3"  d="m158.03126,35.35268c16.98437,15.33333 50.95311,15.33333 67.93748,0"  />
              <path opacity={this.props.value > 82 * 27 ? 1 : 0.2} strokeWidth="5" stroke="#ffffff" transform="rotate(-90 178.00000000000003,40.321426391601555) " id="svg_7"  d="m147,34.57143c15.5,15.33333 46.5,15.33333 62,0" />
              <path opacity={this.props.value > 80 * 27 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 165.07257080078128,40.00890731811523) " id="svg_8"  d="m136.57259,35.18633c14.25,12.86021 42.74999,12.86021 56.99998,0" stroke="#ffffff" />
              <path opacity={this.props.value > 73 * 27 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 150.07257080078128,40.47766113281249) " id="svg_9"  d="m122.04134,35.65508c14.01562,12.86022 42.04686,12.86022 56.06248,0" stroke="#ffffff" />
              <path opacity={this.props.value > 70 * 27 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 135.07258605957034,40.32142257690429) " id="svg_10"  d="m109.07259,35.49884c13,12.86022 39,12.86022 52,0" />
              <path opacity={this.props.value > 65 * 27 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 120.33062744140626,40.47766494750976) " id="svg_11"  d="m95.9869,36.39702c12.17187,10.88172 36.51561,10.88172 48.68748,0" stroke="#ffffff" />
              <path opacity={this.props.value > 60 * 27 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 106.77418518066408,41.008926391601555) " id="svg_12"  d="m83.7117,37.48473c11.53124,9.39786 34.59372,9.39786 46.12497,0" stroke="#ffffff" />
              <path opacity={this.props.value > 55 * 27 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 92.33064270019531,40.633918762207024) " id="svg_20"  d="m71.26814,36.55327c10.53125,10.88173 31.59375,10.88173 42.12501,0" stroke="#ffffff" />
              <path opacity={this.props.value > 50 * 27 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 78.77418518066408,41.32143783569337) " id="svg_21"  d="m59.77419,37.79724c9.5,9.39786 28.5,9.39786 38,0" />
              <path opacity={this.props.value > 45 * 27 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 66.13450622558595,41.14285278320313) " id="svg_22"  d="m49.81308,38.11549c8.16071,8.07297 24.48214,8.07297 32.64286,0" />
              <path opacity={this.props.value > 38 * 27 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 53.00508117675782,40.964176177978516) " id="svg_23"  d="m40.07651,38.56613c6.46428,6.39479 19.39285,6.39479 25.85714,0" />
              <path opacity={this.props.value > 25 * 27 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 39.79078674316407,41.276676177978516) " id="svg_24"  d="m29.36221,38.87863c5.21429,6.39479 15.64287,6.39479 20.85716,0" stroke="#ffffff" />
              <path opacity={this.props.value > 20 * 27 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 27.799385070800785,41.098358154296875) " id="svg_25"  d="m18.21903,39.26339c4.79017,4.89325 14.37054,4.89325 19.16071,0" stroke="#ffffff" />
              <path opacity={this.props.value > 5 * 27 ? 1 : 0.2} stroke={this.props.value > 5 * 27 && this.props.value < 20 * 27 ? '#ff0000' : '#ffffff'} strokeWidth="5" transform="rotate(-90 15.550079345703134,40.78598022460938) " id="svg_26"  d="m8.15723,39.41472c3.69643,3.65669 11.08929,3.65669 14.78571,0" />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}
export default Distance