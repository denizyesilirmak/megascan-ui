import React, { Component } from 'react'
import './Security.css'
import SecurityIcon from '../../../../Assets/MenuIcons/security.svg'
import PinIcon from '../../../../Assets/MenuIcons/pin.svg'



import SetttingsItem from '../../SettingsElements/SettingsItem'

class Security extends Component {
  render() {
    return (
      <div className="power-settings">
        <SetttingsItem icon={SecurityIcon} title="Change Pin" mode="toggle" selected={this.props.cursorY % 2 === 0 && this.props.selected} />
        <SetttingsItem icon={PinIcon} title="Change Pin" mode="popup" selected={this.props.cursorY % 2 === 1 && this.props.selected} />
      </div>
    )
  }
}
export default Security