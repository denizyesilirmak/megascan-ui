import React, { Component } from 'react'
import './MobileLiveStream.css'
import Mobile from '../../Assets/MenuIcons/mobile-app.png'
import SocketHelper from '../../SocketHelper'

class MobileLiveStream extends Component {

  componentDidMount() {
    SocketHelper.attach(this.handleSocketData)
  }

  handleSocketData = (socketData) => {
    if (socketData.type === 'mobile') {
      if (socketData.payload === 'exitLiveStreamMenu') {
        this.props.navigateTo('menuScreen')
        return
      }
    }
  }

  render() {
    return (
      <div className="mls component">
        <img src={Mobile} alt="mobile" className="mobile-app" />
        <div className="mls-info">
          Live Stream on the remote device is open!
        </div>
      </div>
    )
  }
}

export default MobileLiveStream