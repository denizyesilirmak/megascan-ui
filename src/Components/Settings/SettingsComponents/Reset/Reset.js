import React, { Component } from 'react'
import './Reset.css'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import ResetIcon from '../../../../Assets/SettingsIcons/reset.png'
// import FactoryReset from '../../../../Assets/MenuIcons/factory-reset.png'
// import ClearMemoryIcon from '../../../../Assets/MenuIcons/clear-memory.png'

import { DeviceContext } from '../../../../Contexts/DeviceContext'

class Reset extends Component {
  static contextType = DeviceContext
  componentDidMount() {
    setTimeout(() => {
      try {
        this.refs.sc.style.opacity = 1
      } catch (error) {
        console.warn("couldn't catch speed")

      }
    }, 10);
  }

  componentDidCatch(error, info) {
    console.log("ERROR")
  }


  render() {
    return (
      <div ref="sc" className="power-settings">
        <SetttingsItem icon={ResetIcon} title={this.context.strings["resetsettings"]} mode="popup" selected={this.props.cursorY % 3 === 0 && this.props.selected} />
        <SetttingsItem icon={ResetIcon} title={this.context.strings["factoryreset"]} mode="popup" selected={this.props.cursorY % 3 === 1 && this.props.selected} />
        <SetttingsItem icon={ResetIcon} title={this.context.strings["clearmemory"]} mode="popup" selected={this.props.cursorY % 3 === 2 && this.props.selected} />
      </div>
    )
  }
}
export default Reset