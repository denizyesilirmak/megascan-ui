import React, { Component } from 'react'
import './GroundScanMethodSelection.css'

import DeviceIcon from '../../../../Assets/MenuIcons/m-device.png'
import IconIndicator from '../../../../Assets/MenuIcons/button-indicator.png'

class GroundScanMethodSelection extends Component {
  render() {
    return (
      <div className="ground-scan-method-selection-componenet component">
        <div className="method-selection-buttons">
          <div className="msb msb-selected">
            <div className="icon-holder">
              <img alt="ind" className="msb-indicator" src={IconIndicator}/>
              <img alt="icon" className="msb-icon" src={DeviceIcon} />
            </div>
            <div className="msb-title">
              Device
            </div>
          </div>

          <div className="msb">
            <div className="icon-holder">
            <img alt="ind" className="msb-indicator" src={IconIndicator}/>
              <img alt="icon" className="msb-icon" src={DeviceIcon}></img>
            </div>
            <div className="msb-title">
              Tablet
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GroundScanMethodSelection