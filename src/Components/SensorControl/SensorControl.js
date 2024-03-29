import React from 'react'
import './SensorControl.css'
import SocketHelper from '../../SocketHelper'
import { DeviceContext } from '../../Contexts/DeviceContext'


//goldstar
import GLD_LiveStremVideo from '../../Assets/Videos/controlLiveStream_goldstar.mp4'
import GLD_BionicVideo from '../../Assets/Videos/controlBionic_goldstar.mp4'
import GLD_GroundScanVideo from '../../Assets/Videos/controlGroundScan_goldstar.mp4'


//phoenix
import PNX_LiveStremVideo from '../../Assets/Videos/controlLiveStream_phoenix.mp4'
import PNX_GroundScanVideo from '../../Assets/Videos/controlGroundScan_phoenix.mp4'

//infinity
import INF_LiveStreamVideo from '../../Assets/Videos/controlLiveStream_infinity.mp4'
import INF_BionicVideo from '../../Assets/Videos/controlBionic_infinity.mp4'
import INF_GroundScanVideo from '../../Assets/Videos/controlGroundScan_infinity.mp4'
import INF_LrlVideo from '../../Assets/Videos/controlLRL_infinity.mp4'
import INF_28 from '../../Assets/Videos/control28_infinity.mp4'
import INF_36 from '../../Assets/Videos/control36_infinity.mp4'
import INF_50 from '../../Assets/Videos/control50_infinity.mp4'

//concord
import CND_BionicVideo from '../../Assets/Videos/controlBionic_concord.mp4'
import CND_LrlVideo from '../../Assets/Videos/controlLRL_concord.mp4'
import CND_28 from '../../Assets/Videos/control28_concord.mp4'
import CND_36 from '../../Assets/Videos/control36_concord.mp4'
import CND_50 from '../../Assets/Videos/control50_concord.mp4'

///viber
import VPR_BionicVideoo from '../../Assets/Videos/controlBionic_viper.mp4'
import VPR_LrlVideo from '../../Assets/Videos/controlLRL_viper.mp4'
import VPR_28 from '../../Assets/Videos/control28_viper.mp4'
import VPR_36 from '../../Assets/Videos/control36_viper.mp4'

const bypass = false

class SensorControl extends React.Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.indicatorREF = React.createRef()

    this.livestreamVideo = ''
    this.bionicVideo = ''
    this.groundScanVideo = ''

    this.state = {
      checking: true,
      currentSensor: 0,
      src: '',
      renderVideo: false,
      checkingText: "controlSensorConnection",
      wrongSensorText: 'connectSensor'
    }
  }

  componentDidMount() {
    const device = this.context.device
    //console.log('sensor control device', device)



    if (device === 'infinity') {
      this.livestreamVideo = INF_LiveStreamVideo
      this.groundScanVideo = INF_GroundScanVideo
      this.bionicVideo = INF_BionicVideo
      this.lrlVideo = INF_LrlVideo
      this.coil28 = INF_28
      this.coil36 = INF_36
      this.coil50 = INF_50
    }
    else if (device === 'goldstar') {
      this.livestreamVideo = GLD_LiveStremVideo
      this.groundScanVideo = GLD_GroundScanVideo
      this.bionicVideo = GLD_BionicVideo
      this.lrlVideo = INF_LrlVideo //this might create problem!!! hotfix

    }
    else if (device === 'phoenix') {
      this.livestreamVideo = PNX_LiveStremVideo
      this.groundScanVideo = PNX_GroundScanVideo
      this.bionicVideo = PNX_GroundScanVideo
      this.lrlVideo = INF_LrlVideo //this might create problem!!! hotfix

    }
    else if (device === 'concord') {
      this.livestreamVideo = CND_BionicVideo
      this.groundScanVideo = CND_BionicVideo
      this.bionicVideo = CND_BionicVideo
      this.lrlVideo = CND_LrlVideo
      this.coil28 = CND_28
      this.coil36 = CND_36
      this.coil50 = CND_50
    }
    else if (device === 'viber') {
      this.livestreamVideo = VPR_BionicVideoo
      this.groundScanVideo = VPR_BionicVideoo
      this.bionicVideo = VPR_BionicVideoo
      this.lrlVideo = VPR_LrlVideo
      this.coil28 = VPR_28
      this.coil36 = VPR_36
      this.coil50 = CND_50
    }



    if (bypass) {
      this.props.navigateTo(this.props.target)
      return
    }
    switch (this.props.target) {
      case "liveStreamScreen":
        this.setState({ src: this.livestreamVideo, targetSensorID: 2 })
        break
      case "bionicScreen":
        this.setState({ src: this.bionicVideo, targetSensorID: 1 })
        break
      case "ionicScreen":
        this.setState({ src: this.bionicVideo, targetSensorID: 1 })
        break
      case "groundScanMethodSelectionScreen":
        this.setState({ src: this.groundScanVideo, targetSensorID: 3 })
        break
      case "tunnelScanMethodSelectionScreen":
        this.setState({ src: this.groundScanVideo, targetSensorID: 3 })
        break
      case "pinPointerScreen":
        this.setState({ src: this.livestreamVideo, targetSensorID: 2 })
        break
      case "manualLRLSettingsScreen":
        this.setState({ src: this.lrlVideo, targetSensorID: 1 })
        break
      case "ctrlLrlScanScreen":
        this.setState({ src: this.lrlVideo, targetSensorID: 1 })
        break
      case "autoLrlScanScreen":
        this.setState({ src: this.lrlVideo, targetSensorID: 1 })
        break
      case "pulseScreen":
        this.setState({ src: this.coil50, targetSensorID: 6, checkingText: 'checkingCoilConnection', wrongSensorText: 'connectCorrectCoil' })
        break
      case "pulse2Screen":
        this.setState({ src: this.coil36, targetSensorID: 5, checkingText: 'checkingCoilConnection', wrongSensorText: 'connectCorrectCoil' })
        break
      case "nuggetScanScreen":
        this.setState({ src: this.coil28, targetSensorID: 4, checkingText: 'checkingCoilConnection', wrongSensorText: 'connectCorrectCoil' })
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
        <div className="title">
          {
            this.context.strings[this.state.checkingText]
          }
        </div>
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
          {this.context.strings[this.state.wrongSensorText]}
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