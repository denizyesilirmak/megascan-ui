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
      try {
        this.refs.sc.style.opacity = 1
      } catch (error) {
        console.warn("couldn't catch speed")
      }
    }, 10);
  }

  componentDidCatch(error, info){
    console.log("ERROR")
  }


  render() {
    return (
      <div ref="sc" className="power-settings">
        <SettingsItem title={this.context.strings["sleepmode"]} icon={SleepModeIcon} mode="toggle" selected={this.props.cursorY % 2 === 0  && this.props.selected} on={this.props.on} />
        <SettingsItem title={this.context.strings["brightness"]} icon={BrightnessIcon} mode="slider" selected={this.props.cursorY % 2 === 1  && this.props.selected} value={this.props.brightness} />
      </div>
    )
  }
}
export default Display