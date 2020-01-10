import React, { Component } from 'react'
import './Display.css'
import SettingsItem from '../../SettingsElements/SettingsItem'

import SleepModeIcon from '../../../../Assets/MenuIcons/sleepmode.svg'
import BrightnessIcon from '../../../../Assets/MenuIcons/brightness.svg'

class Display extends Component{
  render(){
    return(
      <div className="power-settings">
        <SettingsItem title="Sleep Mode" icon={SleepModeIcon} mode="toggle" />
        <SettingsItem title="Brightness" icon={BrightnessIcon} mode="slider" />
      </div>
    )
  }
}
export default Display