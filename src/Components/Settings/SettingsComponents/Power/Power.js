import React, { Component } from 'react'
import SetttingsItem from '../../SettingsElements/SettingsItem'
import './Power.css'
import PowerIcon from '../../../../Assets/MenuIcons/battery.svg'
// import socketHelper from '../../../../SocketHelper'

class PowerSettings extends Component {

  render() {
    return (
      <div className="power-settings">
        <SetttingsItem icon={PowerIcon} title="Power Saver" mode="toggle" selected={this.props.selected} on={this.props.on}/>
      </div>
    )
  }
}
export default PowerSettings