import React, { Component } from 'react'
import './Reset.css'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import ResetIcon from '../../../../Assets/MenuIcons/reset.png'
import FactoryReset from '../../../../Assets/MenuIcons/factory-reset.png'
import ClearMemoryIcon from '../../../../Assets/MenuIcons/clear-memory.png'

class Reset extends Component{
  render(){
    return(
      <div className="power-settings">
        <SetttingsItem icon={ResetIcon} title="Reset Settings" mode="popup"/>
        <SetttingsItem icon={FactoryReset} title="Factory Reset" mode="popup"/>
        <SetttingsItem icon={ClearMemoryIcon} title="Clear Memory" mode="popup"/>
      </div>
    )
  }
}
export default Reset