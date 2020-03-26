import React, { Component } from 'react'
import './Security.css'
import SecurityIcon from '../../../../Assets/MenuIcons/security.svg'
import PinIcon from '../../../../Assets/MenuIcons/pin.svg'
import SetttingsItem from '../../SettingsElements/SettingsItem'
import { LanguageContext } from '../../../../Contexts/LanguageContext'

class Security extends Component {
  static contextType = LanguageContext
  componentDidMount(){
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 100);
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SetttingsItem icon={SecurityIcon} title={this.context["pinlock"]}mode="toggle" selected={this.props.cursorY % 2 === 0 && this.props.selected} on={this.props.on} />
        <SetttingsItem icon={PinIcon} title={this.context["changepin"]} mode="popup" selected={this.props.cursorY % 2 === 1 && this.props.selected} />
      </div>
    )
  }
}
export default Security