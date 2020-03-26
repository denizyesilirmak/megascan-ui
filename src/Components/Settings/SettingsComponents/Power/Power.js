import React, { Component } from 'react'
import SetttingsItem from '../../SettingsElements/SettingsItem'
import './Power.css'
import PowerIcon from '../../../../Assets/MenuIcons/battery.svg'
// import socketHelper from '../../../../SocketHelper'

import { LanguageContext } from '../../../../Contexts/LanguageContext'

class PowerSettings extends Component {
  static contextType = LanguageContext
  componentDidMount(){
    this.refs.sc.style.opacity = 1
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SetttingsItem icon={PowerIcon} title={this.context["powersaver"]} mode="toggle" selected={this.props.selected} on={this.props.on}/>
      </div>
    )
  }
}
export default PowerSettings