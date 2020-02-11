import React, { Component } from 'react'
import './Display.css'
import SettingsItem from '../../SettingsElements/SettingsItem'

import SleepModeIcon from '../../../../Assets/MenuIcons/sleepmode.svg'
import BrightnessIcon from '../../../../Assets/MenuIcons/brightness.svg'

class Display extends Component {
  componentDidMount(){
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 100);
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SettingsItem title="Sleep Mode" icon={SleepModeIcon} mode="toggle" selected={this.props.cursorY % 2 === 0} on={this.props.on}/>
        <SettingsItem title="Brightness" icon={BrightnessIcon} mode="slider" selected={this.props.cursorY % 2 === 1} value={this.props.brightness} />
      </div>
    )
  }
}
export default Display