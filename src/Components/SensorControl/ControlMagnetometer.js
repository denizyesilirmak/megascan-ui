import React, { Component } from 'react'
// import CM from '../../Assets/Videos/magnetometer.mp4'
import HM from '../../Assets/Videos/horizontal.mp4'
import './SensorControl.css'

class ControlMagnetometer extends Component{
  constructor(props){
    super(props)
    this.state={
      src: HM
    }
  }
  
  componentDidMount(){
    this.refs.video.onended = () => {
      this.refs.video.style.display = "none"
      setTimeout(() => {
        this.props.navigateTo("ionicScreen")
      }, 100);
    }

    // setInterval(() => {
    //   if(this.state.src === CM){
    //     this.setState({
    //       src: HM
    //     })
    //   }else{
    //     this.setState({
    //       src: CM
    //     })
    //   }
    // }, 2000);
  }
  
  render(){
    return(
      <div className="sensor-control">
        <video ref="video" preload="true" style={{width: "100%", height: "100vh",  backgroundSize: "contain"}} src={this.state.src} muted autoPlay></video>
      </div>
    )
  }
}
export default ControlMagnetometer