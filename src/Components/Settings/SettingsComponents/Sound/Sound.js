import React, { Component } from 'react'
import './Sound.css'

import SettingsItem from '../../SettingsElements/SettingsItem'

import generalVolIcon from '../../../../Assets/SettingsIcons/sound.png'
import keyToneVolIcon from '../../../../Assets/SettingsIcons/key-tone.png'
import searchVolIcon from '../../../../Assets/SettingsIcons/search-volume.png'

import { DeviceContext } from '../../../../Contexts/DeviceContext' 

class Sound extends Component {
  static contextType = DeviceContext
  componentDidMount = () => {
    setTimeout(() => {
      try {
        this.refs.sc.style.opacity = 1
      } catch (error) {
        console.warn("couldn't catch speed")
      }
    }, 25);
  }

  componentDidCatch(error, info){
    console.log("ERROR")
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