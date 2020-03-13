import React, { Component } from 'react'
// import CM from '../../Assets/Videos/magnetometer.mp4'
import LiveStremVideo from '../../Assets/Videos/controlLiveStream.mp4'
import BionicVideo from '../../Assets/Videos/controlIonicBionic.mp4'
import GroundScanVideo from '../../Assets/Videos/controlGroundScan.mp4'
import Resistivity from '../../Assets/Videos/controlResistivity.mp4'
import PulseVideo from '../../Assets/Videos/controlPulse.mp4'
import VlfVideo from '../../Assets/Videos/controlVlf.mp4'

import './SensorControl.css'

class ControlMagnetometer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: null
    }
  }

  componentDidMount() {
    switch (this.props.target) {
      case "liveStreamScreen":
        this.setState({ src: LiveStremVideo })
        break;
      case "bionicScreen":
        this.setState({ src: BionicVideo })
        break;
      case "ionicScreen":
        this.setState({ src: BionicVideo })
        break;
      case "groundScanMethodSelectionScreen":
        this.setState({ src: GroundScanVideo })
        break;

      default:
        break;
    }
    this.refs.video.onended = () => {
      this.refs.video.style.display = "none"
      setTimeout(() => {
        this.props.navigateTo(this.props.target)
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

  render() {
    return (
      <div className="sensor-control">
        <video ref="video" preload="true" style={{ width: "100%", height: "100vh", backgroundSize: "contain" }} src={this.state.src} muted autoPlay></video>
      </div>
    )
  }
}
export default ControlMagnetometer