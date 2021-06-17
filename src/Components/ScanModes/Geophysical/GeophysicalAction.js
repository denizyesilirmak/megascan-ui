import React, { Component } from 'react'
import './GeophysicalAction.css'
// import SocketHelper from '../../../SocketHelper'
import ResistivityVideo from '../../../Assets/Videos/resistivity/resistivityNew.mp4'
import SocketHelper from '../../../SocketHelper'


class GeophysicalAction extends Component {
  constructor(props) {
    super(props)
    this.sensorValue = 0
    this.handleVideoEnded.bind(this)
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    console.log(this.props.resistivityParams)
    SocketHelper.send('F')
  }

  componentWillUnmount() {
    SocketHelper.detach()
  }

  handleSocket = (socketData) => {
    console.log(socketData)
    if (socketData.type === 'button') {
      return
    }
    if (socketData.type === 'resistivity') {
      this.sensorValue = socketData.payload
    }
  }

  handleVideoEnded = () => {
    console.log('video end', this.state)
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