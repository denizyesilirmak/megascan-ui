import React, { Component } from 'react'
import './Reset.css'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import DateIcon from '../../../../Assets/MenuIcons/date.svg'
import TimeIcon from '../../../../Assets/MenuIcons/time.svg'
class Reset extends Component{
  render(){
    return(
      <div className="power-settings">
        <SetttingsItem icon={DateIcon} title="Reset Settings" mode="popup"/>
        <SetttingsItem icon={TimeIcon} title="Factory Reset" mode="popup"/>
        <SetttingsItem icon={TimeIcon} title="Clear Memory" mode="popup"/>
      </div>
    )
  }
}
export default Reset