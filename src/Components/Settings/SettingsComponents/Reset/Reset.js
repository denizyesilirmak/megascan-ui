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
        <SetttingsItem icon={ResetIcon} title="Reset Settings" mode="popup"  selected={true}/>
        <SetttingsItem icon={FactoryReset} title="Factory Reset" mode="popup" selected={false}/>
        <SetttingsItem icon={ClearMemoryIcon} title="Clear Memory" mode="popup" selected={false}/>
      </div>
    )
  }
}
export default Reset