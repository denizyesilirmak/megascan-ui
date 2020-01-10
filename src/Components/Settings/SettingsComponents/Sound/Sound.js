import React, { Component } from 'react'
import './Sound.css'

import SettingsItem from '../../SettingsElements/SettingsItem'
 
import generalVolIcon from '../../../../Assets/MenuIcons/icon-general-sound.png'
import keyToneVolIcon from '../../../../Assets/MenuIcons/icon-keytone.png'
import searchVolIcon from '../../../../Assets/MenuIcons/icon-search-volume.png'

class Sound extends Component {
  render() {
    return (
      <div className="power-settings">
        <SettingsItem title="General Volume" icon={generalVolIcon} mode="slider" />
        <SettingsItem title="Key tone" icon={keyToneVolIcon} mode="slider" />
        <SettingsItem title="Search Volume" icon={searchVolIcon} mode="slider" />
        
      </div>
    )
  }
}
export default Sound