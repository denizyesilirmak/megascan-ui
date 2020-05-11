import React, { Component } from 'react'
import './Sound.css'

import SettingsItem from '../../SettingsElements/SettingsItem'

import generalVolIcon from '../../../../Assets/MenuIcons/icon-general-sound.png'
import keyToneVolIcon from '../../../../Assets/MenuIcons/icon-keytone.png'
import searchVolIcon from '../../../../Assets/MenuIcons/icon-search-volume.png'

import { DeviceContext } from '../../../../Contexts/DeviceContext' 

class Sound extends Component {
  static contextType = DeviceContext
  componentDidMount = () => {
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 25);
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SettingsItem title={this.context.strings["generalvolume"]} icon={generalVolIcon} mode="slider" selected={this.props.cursorY % 3 === 0 && this.props.selected} value={this.props.generalVolume} />
        <SettingsItem title={this.context.strings["keytonevolume"]} icon={keyToneVolIcon} mode="slider" selected={this.props.cursorY % 3 === 1 && this.props.selected} value={this.props.keyToneVolume}  />
        <SettingsItem title={this.context.strings["searchvolume"]} icon={searchVolIcon} mode="slider" selected={this.props.cursorY % 3 === 2 && this.props.selected} value={this.props.searchVolume} />

      </div>
    )
  }
}
export default Sound