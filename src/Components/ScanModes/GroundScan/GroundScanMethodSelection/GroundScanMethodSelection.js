import React, { Component } from 'react'
import './GroundScanMethodSelection.css'
import MiniCarousel from '../MiniCarousel/MiniCarousel'

import DeviceIcon from '../../../../Assets/MenuIcons/m-device.png'

class GroundScanMethodSelection extends Component {

  constructor(props){
    super(props)
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

  render() {
    return (
      <div className="ground-scan-method-selection-componenet component">
        <MiniCarousel buttons={this.buttons} />
      </div>
    )
  }
}

export default GroundScanMethodSelection