import React, { Component } from 'react'

import SetttingsItem from '../../SettingsElements/SettingsItem'

import './Power.css'
import PowerIcon from '../../../../Assets/MenuIcons/battery.svg'

class PowerSettings extends Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="power-settings">
        <SetttingsItem icon={PowerIcon} title="Power Saver" mode="toggle" selected={true}/>
      </div>
    )
  }
}
export default PowerSettings