import React, { Component } from 'react'
import './DeviceGroundScanProperties.css'

import TabLeftArrow from '../../../../Assets/MenuIcons/left-arrow2.png'
import TabRightArrow from '../../../../Assets/MenuIcons/right-arrow2.png'

class DeviceGroundScanProperties extends Component{



  render(){
    return(
      <div className="device-ground-scan-properties component">
          <div className="dgsp-tabs">
            <img alt="left" className="" src={TabLeftArrow} />
            <div className="dgsp-tab selected">Scan Mode</div>
            <div className="dgsp-tab">Scan Path</div>
            <div className="dgsp-tab">Scan Step</div>
            <div className="dgsp-tab">Start Point</div>
            <img alt="left" className="" src={TabRightArrow} />
          </div>

          <div className="dgsp-content">

          </div>
      </div>
    )
  }
}

export default DeviceGroundScanProperties