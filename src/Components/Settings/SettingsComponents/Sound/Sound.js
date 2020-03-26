import React, { Component } from 'react'
import './Sound.css'

import SettingsItem from '../../SettingsElements/SettingsItem'

import generalVolIcon from '../../../../Assets/MenuIcons/icon-general-sound.png'
import keyToneVolIcon from '../../../../Assets/MenuIcons/icon-keytone.png'
import searchVolIcon from '../../../../Assets/MenuIcons/icon-search-volume.png'

import { LanguageContext } from '../../../../Contexts/LanguageContext' 

class Sound extends Component {
  static contextType = LanguageContext
  componentDidMount(){
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 100);
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SettingsItem title={this.context["generalvolume"]} icon={generalVolIcon} mode="slider" selected={this.props.cursorY % 3 === 0 && this.props.selected} />
        <SettingsItem title={this.context["keytonevolume"]} icon={keyToneVolIcon} mode="slider" selected={this.props.cursorY % 3 === 1 && this.props.selected} />
        <SettingsItem title={this.context["searchvolume"]} icon={searchVolIcon} mode="slider" selected={this.props.cursorY % 3 === 2 && this.props.selected} />

      </div>
    )
  }
}
export default Sound