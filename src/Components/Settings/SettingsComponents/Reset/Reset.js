import React, { Component } from 'react'
import './Reset.css'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import ResetIcon from '../../../../Assets/MenuIcons/reset.png'
import FactoryReset from '../../../../Assets/MenuIcons/factory-reset.png'
import ClearMemoryIcon from '../../../../Assets/MenuIcons/clear-memory.png'

class Reset extends Component {
  componentDidMount(){
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 100);
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SetttingsItem icon={ResetIcon} title="Reset Settings" mode="popup" selected={this.props.cursorY % 3 === 0 && this.props.selected} />
        <SetttingsItem icon={FactoryReset} title="Factory Reset" mode="popup" selected={this.props.cursorY % 3 === 1 && this.props.selected} />
        <SetttingsItem icon={ClearMemoryIcon} title="Clear Memory" mode="popup" selected={this.props.cursorY % 3 === 2 && this.props.selected} />
      </div>
    )
  }
}
export default Reset