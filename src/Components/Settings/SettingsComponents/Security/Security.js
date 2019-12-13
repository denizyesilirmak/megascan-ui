import React, { Component } from 'react'
import './Security.css'
import WarningIcon from '../../../../Assets/MenuIcons/icon-warning.png'
import ChangePinIcon from '../../../../Assets/MenuIcons/icon-change-pin.png'

import Switch from '../../SettingsElements/Switch';

class Security extends Component{
  render(){
    return(
      <div className="security-component">
        <div className="security-part">
          <img alt="warn" src={WarningIcon}/>
          <span>Don't forget the pin!</span>
        </div>

        <div className="security-part">
          <img alt="change" src={ChangePinIcon}/>
          <span>CHANGE PIN</span>
        </div>

        <div className="security-part" style={{marginBottom: 25}}>
          <Switch on={true}/>
        </div>
      </div>
    )
  }
}
export default Security