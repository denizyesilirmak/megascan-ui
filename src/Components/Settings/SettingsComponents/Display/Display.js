import React, { Component } from 'react'
import './Display.css'
import SettingsItem from '../../SettingsElements/SettingsItem'

import SleepModeIcon from '../../../../Assets/MenuIcons/sleepmode.svg'
import BrightnessIcon from '../../../../Assets/MenuIcons/brightness.svg'

import { LanguageContext } from '../../../../Contexts/LanguageContext'

class Display extends Component {
  static contextType = LanguageContext
  componentDidMount = () => {
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 10);
  }

  componentWillReceiveProps() {
    
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SettingsItem title={this.context["sleepmode"]} icon={SleepModeIcon} mode="toggle" selected={this.props.cursorY % 2 === 0} on={this.props.on} />
        <SettingsItem title={this.context["brightness"]} icon={BrightnessIcon} mode="slider" selected={this.props.cursorY % 2 === 1} value={this.props.brightness} />
      </div>
    )
  }
}
export default Display