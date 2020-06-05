import React, { Component } from 'react'
import socketHelper from '../../../../SocketHelper'
import './GroundScanMethodSelection.css'
import MiniCarousel from '../MiniCarousel/MiniCarousel'

import DeviceIcon from '../../../../Assets/MenuIcons/m-device.png'

class GroundScanMethodSelection extends Component {

  constructor(props) {
    super(props)

    this.state = {
      buttonIndex: 800 * 2
    }

    this.buttons = [
      {
        name: "device",
        icon: DeviceIcon
      },
      {
        name: "tablet",
        icon: DeviceIcon
      }
    ]
  }

  async componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type === 'button') {
      let tmpButtonIndex = this.state.buttonIndex
      switch (socketData.payload) {
        case 'left':
          this.setState({
            buttonIndex: tmpButtonIndex - 1
          })
          break
        case 'right':
          this.setState({
            buttonIndex: tmpButtonIndex + 1
          })
          break
        case 'down':

          break
        case 'up':

          break
        case 'ok':
          if (this.state.buttonIndex % 2 === 0) {

            this.props.navigateTo("deviceGroundScanPropertiesScreen")
          } else {
            this.props.navigateTo("mobileGroundScan")
          }
          return
        case 'back':
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
      <div ref="gsms" className="ground-scan-method-selection-componenet component">
        <MiniCarousel buttons={this.buttons} selectedButtonIndex={this.state.buttonIndex % 2} />
      </div>
    )
  }
}

export default GroundScanMethodSelection