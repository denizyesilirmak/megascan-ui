import React, { Component } from 'react'
import './Sound.css'

import SettingsItem from '../../SettingsElements/SettingsItem'

import generalVolIcon from '../../../../Assets/MenuIcons/icon-general-sound.png'
import keyToneVolIcon from '../../../../Assets/MenuIcons/icon-keytone.png'
import searchVolIcon from '../../../../Assets/MenuIcons/icon-search-volume.png'

class Sound extends Component {
  componentDidMount(){
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 100);
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SettingsItem title="General Volume" icon={generalVolIcon} mode="slider" selected={this.props.cursorY % 3 === 0 && this.props.selected} />
        <SettingsItem title="Key tone" icon={keyToneVolIcon} mode="slider" selected={this.props.cursorY % 3 === 1 && this.props.selected} />
        <SettingsItem title="Search Volume" icon={searchVolIcon} mode="slider" selected={this.props.cursorY % 3 === 2 && this.props.selected} />

      </div>
    )
  }
}
export default Sound