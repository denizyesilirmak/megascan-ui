import React from 'react'
import './SensorControl.css'
import SocketHelper from '../../SocketHelper'
import LiveStremVideo from '../../Assets/Videos/_controlLiveStream.mp4'
import BionicVideo from '../../Assets/Videos/_controlIonicBionic.mp4'
import GroundScanVideo from '../../Assets/Videos/_controlGroundScan.mp4'

const bypass = false

class SensorControl extends React.Component {
  constructor(props) {
    super(props)
    this.indicatorREF = React.createRef()
    this.state = {
      checking: true,
      currentSensor: 0,
      src: '',
      renderVideo: false,
    }
  }

  componentDidMount() {
    if (bypass) {
      this.props.navigateTo(this.props.target)
      return
    }
    switch (this.props.target) {
      case "liveStreamScreen":
        this.setState({ src: LiveStremVideo, targetSensorID: 2 })
        break;
      case "bionicScreen":
        this.setState({ src: BionicVideo, targetSensorID: 1 })
        break;
      case "ionicScreen":
        this.setState({ src: BionicVideo, targetSensorID: 1 })
        break;
      case "groundScanMethodSelectionScreen":
        this.setState({ src: GroundScanVideo, targetSensorID: 3 })
        break;
      case "pinPointerScreen":
        this.setState({ src: LiveStremVideo, targetSensorID: 2 })
        break;
      default:
        break;
    }

    SocketHelper.attach(this.controlRespond)
    const timeoutB = setTimeout(() => {
      SocketHelper.send('X')
      this.indicatorREF.current.style.width = "100%"
      clearTimeout(timeoutB)
    }, 1000);

    this.failTimeout = setTimeout(() => {
      clearTimeout(this.failTimeout)
      SocketHelper.detach()
      this.props.navigateTo('menuScreen')
    }, 4000);
  }

  onVideoEnded = () => {
    clearTimeout(this.failTimeout)
    this.refs.video.style.display = "none"
    setTimeout(() => {
      SocketHelper.detach()
      this.props.navigateTo("menuScreen")
    }, 100);
  }

  controlRespond = (data) => {
    // console.log(data)
    if (data.type === 'sensorControl') {
      clearTimeout(this.failTimeout)
      this.setState({
        currentSensor: parseInt(data.payload)
      })
      let timeoutA = setTimeout(() => {
        try {
          this.indicatorREF.current.style.width = "100%"
        } catch (error) {

        }
        clearTimeout(timeoutA)
        if (this.state.targetSensorID !== this.state.currentSensor) {
          this.setState({ renderVideo: true, renderPopup: false })
        } else {
          SocketHelper.detach()
          this.props.navigateTo(this.props.target)
        }
      }, 1000);
    } else
      return
  }

  renderPopup = () => {
    return (
      <div className="sc-popup">
        <div className="title">Checking sensor connection...</div>
        <div className="indicator-container">
          <div ref={this.indicatorREF} className="indicator-value" />
        </div>
      </div>
    )
  }

  renderVideo = () => {
    return (
      <>
        <div className="warning" style={{ display: this.state.renderVideo ? 'block' : 'none' }}>
          Please connect the sensor.
        </div>
        <video
          className="control-video"
          ref="video"
          preload="true"
          style={{ display: this.state.renderVideo ? 'block' : 'none', height: "100vh", backgroundSize: "contain" }}
          src={this.state.src}
          muted
          autoPlay
          onEnded={() => this.onVideoEnded()}
        ></video>
      </>
    )
  }

  render() {
    return (
      <div className="sensor-control">
        {
          this.state.checking ?
            this.renderPopup() : null
        }
        {
          this.state.renderVideo ?
            this.renderVideo() : null
        }
      </div>
    )
  }
}

export default SensorControl


//X -> X.3 ground scan