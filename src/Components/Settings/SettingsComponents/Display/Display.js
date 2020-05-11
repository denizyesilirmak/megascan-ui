import React, { Component } from 'react'
import './Display.css'
import SettingsItem from '../../SettingsElements/SettingsItem'

import SleepModeIcon from '../../../../Assets/MenuIcons/sleepmode.svg'
import BrightnessIcon from '../../../../Assets/MenuIcons/brightness.svg'

import { DeviceContext } from '../../../../Contexts/DeviceContext'

class Display extends Component {
  static contextType = DeviceContext
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
        <SettingsItem title={this.context.strings["sleepmode"]} icon={SleepModeIcon} mode="toggle" selected={this.props.cursorY % 2 === 0} on={this.props.on} />
        <SettingsItem title={this.context.strings["brightness"]} icon={BrightnessIcon} mode="slider" selected={this.props.cursorY % 2 === 1} value={this.props.brightness} />
      </div>
    )
  }
}
export default Display