import React from 'react'
import './GeophysicalAction.css'
// import SocketHelper from '../../../SocketHelper'
import ResistivityVideo from '../../../Assets/Videos/resistivity/resistivity.mp4'
import SocketHelper from '../../../SocketHelper'


class GeophysicalAction extends React.Component {
  constructor(props){
    super(props)
    this.sensorValue = 560

  }

  componentDidMount(){
    SocketHelper.attach(this.handleSocket)
    console.log(this.props.resistivityParams)
  }

  componentWillUnmount(){
    SocketHelper.detach()
  }

  handleSocket(socketData) {
    console.log(socketData)
  }

  handleVideoEnded = () => {
    console.log('video ended')
    this.props.navigateTo('geophysicalReportScreen', null, null, null, {
      target: this.props.resistivityParams.target,
      value: this.sensorValue
    })
    return
  }

  render() {
    return (
      <div className="component geopyhsical-action">
        <video
          className="geopyhsical-action-video"
          src={ResistivityVideo}
          muted
          autoPlay
          onEnded={() => this.handleVideoEnded()}
        />
      </div>
    )
  }
}

export default GeophysicalAction