import React, { Component } from 'react'
// import CM from '../../Assets/Videos/magnetometer.mp4'
import LiveStremVideo from '../../Assets/Videos/_controlLiveStream.mp4'
import BionicVideo from '../../Assets/Videos/_controlIonicBionic.mp4'
import GroundScanVideo from '../../Assets/Videos/_controlGroundScan.mp4'
// import Resistivity from '../../Assets/Videos/controlResistivity.mp4'
// import PulseVideo from '../../Assets/Videos/controlPulse.mp4'
// import VlfVideo from '../../Assets/Videos/controlVlf.mp4'

import './SensorControl.css'

class ControlMagnetometer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: null
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.video.playbackRate = 2;
      // this.refs.video.pause();
    }, 300);
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
        <video className="control-video" ref="video" preload="true" style={{ height: "72vh", backgroundSize: "contain", marginTop: 100 }} src={this.state.src} muted autoPlay></video>
    )
  }
}
export default ControlMagnetometer