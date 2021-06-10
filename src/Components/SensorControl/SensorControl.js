import React from 'react'
import './SensorControl.css'
import SocketHelper from '../../SocketHelper'


//goldstar
// import LiveStremVideo from '../../Assets/Videos/controlLiveStream_goldstar.mp4'
import BionicVideo from '../../Assets/Videos/controlBionic_goldstar.mp4'
// import GroundScanVideo from '../../Assets/Videos/controlGroundScan_goldstar.mp4'


//phoenix
import LiveStremVideo from '../../Assets/Videos/controlLiveStream_phoenix.mp4'
import GroundScanVideo from '../../Assets/Videos/controlGroundScan_phoenix.mp4'

import { DeviceContext } from '../../Contexts/DeviceContext'

const bypass = true

class SensorControl extends React.Component {
  static contextType = DeviceContext
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
        break
      case "bionicScreen":
        this.setState({ src: BionicVideo, targetSensorID: 1 })
        break
      case "ionicScreen":
        this.setState({ src: BionicVideo, targetSensorID: 1 })
        break
      case "groundScanMethodSelectionScreen":
        this.setState({ src: GroundScanVideo, targetSensorID: 3 })
        break
      case "tunnelScanMethodSelectionScreen":
        this.setState({ src: GroundScanVideo, targetSensorID: 3 })
        break
      case "pinPointerScreen":
        this.setState({ src: LiveStremVideo, targetSensorID: 2 })
        break
      case "manualLRLSettingsScreen":
        this.setState({ src: BionicVideo, targetSensorID: 1 })
        break
      case "ctrlLrlScanScreen":
        this.setState({ src: BionicVideo, targetSensorID: 1 })
        break
      case "autoLrlScanScreen":
        this.setState({ src: BionicVideo, targetSensorID: 1 })
        break
      default:
        break
    }

    SocketHelper.attach(this.controlRespond)
    const timeoutB = setTimeout(() => {
      SocketHelper.send('X')
      try {
        this.indicatorREF.current.style.width = "100%"
      } catch (error) {

      }
      clearTimeout(timeoutB)
    }, 1000)

    this.failTimeout = setTimeout(() => {
      clearTimeout(this.failTimeout)
      SocketHelper.detach()
      this.props.navigateTo('menuScreen')
    }, 4000)
  }

  onVideoEnded = () => {
    clearTimeout(this.failTimeout)
    this.refs.video.style.display = "none"
    setTimeout(() => {
      SocketHelper.detach()
      this.props.navigateTo("menuScreen")
    }, 100)
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
          clearTimeout(this.failTimeout)
          this.props.navigateTo(this.props.target)
        }
      }, 1000)
    } else if (data.type === 'button') {
      if (data.payload === 'back') {
        clearTimeout(this.failTimeout)
        this.props.navigateTo('menuScreen')
        return
      }
    }
    else {
      return
    }
  }

  renderPopup = () => {
    return (
      <div className="sc-popup">
        <div className="title">{this.context.strings['controlSensorConnection']}.</div>
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
          {this.context.strings['connectSensor']}
        </div>
        <video
          className="control-video"
          ref="video"
          preload="true"
          style={{
            display: this.state.renderVideo ? 'block' : 'none',
            marginTop: "30px",
            position: 'absolute',
            width: "630px"
          }}
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