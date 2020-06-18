import React, { Component } from 'react'
import './Depth.css'

// import CtrlLrlMan from '../../../../../Assets/MenuIcons/ctrl-lrl-distance.png'
import LeftArrow from '../../../../../Assets/MenuIcons/left-arrow1.png'
import RightArrow from '../../../../../Assets/MenuIcons/right-arrow1.png'


class Depth extends Component {
  constructor(props){
    super(props)

    this.state = {
      depth : 6
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
      <div className="depth-component">
        <img alt="arr" src={LeftArrow} className="left-arrow"></img>
        <img alt="arr" src={RightArrow} className="right-arrow"></img>

        <div className="lrl-move">
          
        </div>

        <div className="depth-container">
          <div className="depth-value">{this.state.depth} m</div>
          <svg width="80" height="80" className="depth-indicator" style={{backgroundColor: "red"}}>
            <g>           
              <path opacity={this.state.depth < 70 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 66.13450622558595,41.14285278320313) " id="svg_22" fill="transparent" d="m49.81308,38.11549c8.16071,8.07297 24.48214,8.07297 32.64286,0" />
              <path opacity={this.state.depth < 75 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 53.00508117675782,40.964176177978516) " id="svg_23" fill="transparent" d="m40.07651,38.56613c6.46428,6.39479 19.39285,6.39479 25.85714,0" />
              <path opacity={this.state.depth < 80 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 39.79078674316407,41.276676177978516) " id="svg_24" fill="transparent" d="m29.36221,38.87863c5.21429,6.39479 15.64287,6.39479 20.85716,0" stroke="#ffffff" />
              <path opacity={this.state.depth < 85 ? 1 : 0.2} strokeWidth="5" transform="rotate(-90 27.799385070800785,41.098358154296875) " id="svg_25" fill="transparent" d="m18.21903,39.26339c4.79017,4.89325 14.37054,4.89325 19.16071,0" stroke="#ffffff" />
              <path opacity={this.state.depth < 90 ? 1 : 0.2} stroke="#ffffff" strokeWidth="5" transform="rotate(-90 15.550079345703134,40.78598022460938) " id="svg_26" fill="transparent" d="m8.15723,39.41472c3.69643,3.65669 11.08929,3.65669 14.78571,0" />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}
export default Depth