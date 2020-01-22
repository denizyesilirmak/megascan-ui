import React, { Component } from 'react'
import './Reset.css'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import ResetIcon from '../../../../Assets/MenuIcons/reset.png'
import FactoryReset from '../../../../Assets/MenuIcons/factory-reset.png'
import ClearMemoryIcon from '../../../../Assets/MenuIcons/clear-memory.png'

class Reset extends Component {
  render() {
    return (
      <div className="power-settings">
        <SetttingsItem icon={ResetIcon} title="Reset Settings" mode="popup" selected={this.props.cursorY % 3 === 0} />
        <SetttingsItem icon={FactoryReset} title="Factory Reset" mode="popup" selected={this.props.cursorY % 3 === 1} />
        <SetttingsItem icon={ClearMemoryIcon} title="Clear Memory" mode="popup" selected={this.props.cursorY % 3 === 2} />
      </div>
    )
  }
}
export default Reset