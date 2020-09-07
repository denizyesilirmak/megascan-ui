import React from 'react'
import './SensorControl.css'
import SocketHelper from '../../SocketHelper'
import LiveStremVideo from '../../Assets/Videos/_controlLiveStream.mp4'
import BionicVideo from '../../Assets/Videos/_controlIonicBionic.mp4'
import GroundScanVideo from '../../Assets/Videos/_controlGroundScan.mp4'

class SensorControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checking: true,
      currentSensor: 0,
      src: ''
    }
    console.log(this.props.target)
  }

  componentDidMount() {
    SocketHelper.attach(this.controlRespond)
    console.log("sensor control mounted")
    let timeoutB = setTimeout(() => {
      SocketHelper.send('X')
      this.refs.indicator.style.width = "20%"
      clearTimeout(timeoutB)
    }, 500);

  }

  controlRespond = (data) => {
    console.log(data)
    if (data.type === 'sensorControl') {
      this.setState({
        currentSensor: parseInt(data.payload)
      })
      let timeoutA = setTimeout(() => {
        this.refs.indicator.style.width = "100%"
        clearTimeout(timeoutA)
      }, 1000);
    }
  }

  renderPopup = () => {
    return (
      <div className="sc-popup">
        <div className="title">Checking ground scan sensor connection...</div>
        <div className="indicator-container">
          <div ref="indicator" className="indicator-value" />
        </div>
      </div>
    )
  }

  renderVideo = () => {
    return(
      <div className="sensor-control-video">
         <video className="control-video" ref="video" preload="true" style={{ height: "72vh", backgroundSize: "contain", marginTop: 100 }} src={this.state.src} muted autoPlay></video>
      </div>
    )
  }

  render() {
    return (
      <div className="sensor-control">
        {
          this.state.checking ?
            this.renderPopup() : null
        }
      </div>
    )
  }
}

export default SensorControl


//X -> X.3 ground scan