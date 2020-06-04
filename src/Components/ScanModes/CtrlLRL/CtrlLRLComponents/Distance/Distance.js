import React, { Component } from 'react'
import './Distance.css'

// import CtrlLrlMan from '../../../../../Assets/MenuIcons/ctrl-lrl-distance.png'
import LeftArrow from '../../../../../Assets/MenuIcons/left-arrow1.png'
import RightArrow from '../../../../../Assets/MenuIcons/right-arrow1.png'


class Distance extends Component {
  constructor(props){
    super(props)

    this.state = {
      distance : 6
    }
  }

  componentDidMount(){
    // let direction = true
    // setInterval(() => {
    //   if(direction){
    //     this.setState({
    //       distance: this.state.distance + 1
    //     })
    //     if(this.state.distance === 99)
    //     direction = false
    //   }
    //   else{
    //     this.setState({
    //       distance: this.state.distance - 1
    //     })
    //     if(this.state.distance === 0)
    //     direction = true
    //   }
    // }, 100);
  }


  render() {
    return (
      <div className="distance-component">
        <img alt="arr" src={LeftArrow} className="left-arrow"></img>
        <img alt="arr" src={RightArrow} className="right-arrow"></img>

        <div className="lrl-move">
          
        </div>

        <div className="distance-container">
          <div className="distance-value">{this.state.distance} m</div>
          <svg width="240" height="80" className="distance-indicator">
            <g>
              <path opacity={this.state.distance < 25 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 192.00000000000003,41.102676391601555) " id="svg_3" fill="transparent" d="m158.03126,35.35268c16.98437,15.33333 50.95311,15.33333 67.93748,0" stroke="#ffffff" />
              <path opacity={this.state.distance < 30 ? 1 : 0.2} strokeWidth="5" stroke="#ffffff" transform="rotate(-90 178.00000000000003,40.321426391601555) " id="svg_7" fill="transparent" d="m147,34.57143c15.5,15.33333 46.5,15.33333 62,0" />
              <path opacity={this.state.distance < 35 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 165.07257080078128,40.00890731811523) " id="svg_8" fill="transparent" d="m136.57259,35.18633c14.25,12.86021 42.74999,12.86021 56.99998,0" stroke="#ffffff" />
              <path opacity={this.state.distance < 40 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 150.07257080078128,40.47766113281249) " id="svg_9" fill="transparent" d="m122.04134,35.65508c14.01562,12.86022 42.04686,12.86022 56.06248,0" stroke="#ffffff" />
              <path opacity={this.state.distance < 45 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 135.07258605957034,40.32142257690429) " id="svg_10" fill="transparent" d="m109.07259,35.49884c13,12.86022 39,12.86022 52,0" />
              <path opacity={this.state.distance < 50 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 120.33062744140626,40.47766494750976) " id="svg_11" fill="transparent" d="m95.9869,36.39702c12.17187,10.88172 36.51561,10.88172 48.68748,0" stroke="#ffffff" />
              <path opacity={this.state.distance < 55 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 106.77418518066408,41.008926391601555) " id="svg_12" fill="transparent" d="m83.7117,37.48473c11.53124,9.39786 34.59372,9.39786 46.12497,0" stroke="#ffffff" />
              <path opacity={this.state.distance < 60 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 92.33064270019531,40.633918762207024) " id="svg_20" fill="transparent" d="m71.26814,36.55327c10.53125,10.88173 31.59375,10.88173 42.12501,0" stroke="#ffffff" />
              <path opacity={this.state.distance < 65 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 78.77418518066408,41.32143783569337) " id="svg_21" fill="transparent" d="m59.77419,37.79724c9.5,9.39786 28.5,9.39786 38,0" />
              <path opacity={this.state.distance < 70 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 66.13450622558595,41.14285278320313) " id="svg_22" fill="transparent" d="m49.81308,38.11549c8.16071,8.07297 24.48214,8.07297 32.64286,0" />
              <path opacity={this.state.distance < 75 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 53.00508117675782,40.964176177978516) " id="svg_23" fill="transparent" d="m40.07651,38.56613c6.46428,6.39479 19.39285,6.39479 25.85714,0" />
              <path opacity={this.state.distance < 80 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 39.79078674316407,41.276676177978516) " id="svg_24" fill="transparent" d="m29.36221,38.87863c5.21429,6.39479 15.64287,6.39479 20.85716,0" stroke="#ffffff" />
              <path opacity={this.state.distance < 85 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 27.799385070800785,41.098358154296875) " id="svg_25" fill="transparent" d="m18.21903,39.26339c4.79017,4.89325 14.37054,4.89325 19.16071,0" stroke="#ffffff" />
              <path opacity={this.state.distance < 90 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 15.550079345703134,40.78598022460938) " id="svg_26" fill="transparent" d="m8.15723,39.41472c3.69643,3.65669 11.08929,3.65669 14.78571,0" />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}
export default Distance