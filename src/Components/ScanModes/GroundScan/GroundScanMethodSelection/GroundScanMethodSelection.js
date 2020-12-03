import React, { Component } from 'react'
import socketHelper from '../../../../SocketHelper'
import './GroundScanMethodSelection.css'
import MiniCarousel from '../MiniCarousel/MiniCarousel'

import TabletIcon from '../../../../Assets/MenuIcons/tablet.png'
import { DeviceContext } from '../../../../Contexts/DeviceContext'

import GoldStarIcon from '../../../../Assets/MenuIcons/deviceicons/goldstar_device_icon.png'
import PhoenixIcon from '../../../../Assets/MenuIcons/deviceicons/phoenix_device_icon.png'




class GroundScanMethodSelection extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)




    this.state = {
      buttonIndex: 800 * 2
    }

    this.buttons = [
      {
        name: "device",
        icon: null
      },
      {
        name: "tablet",
        icon: TabletIcon
      }
    ]
  }

  async componentDidMount() {
    console.log(this.context.device)

    switch (this.context.device) {
      case 'goldstar':
        this.buttons[0].icon = GoldStarIcon
        break
      case 'phoenix':
        this.buttons[0].icon = PhoenixIcon
        break;

      default:
        break;
    }

    this.forceUpdate()

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
          }, 250);
          return
        case 'turnoff':
          this.props.navigateTo('turnOff')
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