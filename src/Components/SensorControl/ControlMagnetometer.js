import React, { Component } from 'react'
import CM from '../../Assets/Videos/magnetometer.mp4'
import './SensorControl.css'

class ControlMagnetometer extends Component{
  componentDidMount(){
    this.refs.video.onended = () => {
      this.refs.video.style.display = "none"
      setTimeout(() => {
        this.props.navigateTo("menuScreen")
      }, 50);
    }
  }
  render(){
    return(
      <div className="sensor-control">
        <video ref="video" preload style={{width: "100%", height: "100vh",  backgroundSize: "contain"}} src={CM} muted autoPlay></video>
      </div>
    )
  }
}
export default ControlMagnetometer