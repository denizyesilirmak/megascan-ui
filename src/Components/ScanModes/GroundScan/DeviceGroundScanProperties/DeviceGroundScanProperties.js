import React, { Component } from 'react'
import './DeviceGroundScanProperties.css'
import socketHelper from '../../../../SocketHelper'

import TabLeftArrow from '../../../../Assets/MenuIcons/left-arrow2.png'
import TabRightArrow from '../../../../Assets/MenuIcons/right-arrow2.png'

import ManualIcon from '../../../../Assets/MenuIcons/menu-icon-manual-scan.png'
import AutomaticIcon from '../../../../Assets/MenuIcons/menu-icon-automatic-scan.png'
import AlternateIcon from '../../../../Assets/MenuIcons/m-alternative-scan.png'
import OneDirectionIcon from '../../../../Assets/MenuIcons/m-one-direction-scan.png'

import MiniCarousel from '../MiniCarousel/MiniCarousel'

class DeviceGroundScanProperties extends Component {

  constructor(props) {
    super(props)

    this.scanModeButtons = [
      {
        name: "manual",
        icon: ManualIcon
      },
      {
        name: "automatic",
        icon: AlternateIcon
      }
    ]

    this.state = {
      activeTabIndex: 4 * 200,
      scanModeIndex: 2 * 200
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  renderTabContent = () => {
    switch (this.state.activeTabIndex % 4) {
      case 0:
        return (
          <div className="dgsp-content">
            <MiniCarousel buttons={this.scanModeButtons} selectedButtonIndex={this.state.scanModeIndex % 2}></MiniCarousel>
          </div>
        )
      case 1:
        return (
          <div className="dgsp-content">

          </div>
        )
      case 2:
        return (
          <div className="dgsp-content">

          </div>
        )
      case 3:
        return (
          <div className="dgsp-content">

          </div>
        )

      default:
        break;
    }
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

        {
          this.renderTabContent()
        }

      </div>
    )
  }
}

export default DeviceGroundScanProperties