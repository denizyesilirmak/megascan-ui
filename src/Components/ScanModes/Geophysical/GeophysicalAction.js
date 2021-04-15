import React from 'react'
import './GeophysicalAction.css'
// import SocketHelper from '../../../SocketHelper'
import ResistivityVideo from '../../../Assets/Videos/resistivity/resistivity.mp4'

class GeophysicalAction extends React.Component {

  handleVideoEnded = () => {
    console.log('video ended')
    this.props.navigateTo('geophysicalReportScreen')
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