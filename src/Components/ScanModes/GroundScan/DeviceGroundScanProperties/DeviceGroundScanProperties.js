import React, { Component } from 'react'
import './DeviceGroundScanProperties.css'
import socketHelper from '../../../../SocketHelper'

import TabLeftArrow from '../../../../Assets/MenuIcons/left-arrow2.png'
import TabRightArrow from '../../../../Assets/MenuIcons/right-arrow2.png'

class DeviceGroundScanProperties extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTabIndex: 4 * 200
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  renderTabContent = () => {

  }

  handleKeyDown = (socketData) => {
    if (socketData.type === 'button') {
      let tmpActiveTabIndex = this.state.activeTabIndex
      switch (socketData.payload) {
        case 'left':
          this.setState({
            activeTabIndex: tmpActiveTabIndex - 1
          })
          break
        case 'right':
          this.setState({
            activeTabIndex: tmpActiveTabIndex + 1
          })
          break
        case 'down':

          break
        case 'up':

          break
        case 'ok':

          return
        case 'back':
          clearInterval(this.testInterval)
          this.refs.gsms.style.opacity = 0
          this.refs.gsms.style.transform = "translateY(200px)"
          setTimeout(() => {
            this.props.navigateTo("menuScreen")
          }, 500);
          return
        default:
          break
      }
    }
  }

  render() {
    return (
      <div className="device-ground-scan-properties component">
        <div className="dgsp-tabs">
          <img alt="left" className="" src={TabLeftArrow} />
          <div className={`dgsp-tab ${this.state.activeTabIndex % 4 === 0 ? "selected" : ""}`}>Scan Mode</div>
          <div className={`dgsp-tab ${this.state.activeTabIndex % 4 === 1 ? "selected" : ""}`}>Scan Path</div>
          <div className={`dgsp-tab ${this.state.activeTabIndex % 4 === 2 ? "selected" : ""}`}>Scan Step</div>
          <div className={`dgsp-tab ${this.state.activeTabIndex % 4 === 3 ? "selected" : ""}`}>Start Point</div>
          <img alt="left" className="" src={TabRightArrow} />
        </div>

        <div className="dgsp-content">

        </div>
      </div>
    )
  }
}

export default DeviceGroundScanProperties