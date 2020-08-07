import React, { Component } from 'react'
import './Security.css'
import SecurityIcon from '../../../../Assets/SettingsIcons/change-pin.png'
// import PinIcon from '../../../../Assets/MenuIcons/pin.svg'
import SetttingsItem from '../../SettingsElements/SettingsItem'
import { DeviceContext } from '../../../../Contexts/DeviceContext'

class Security extends Component {
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
        <SetttingsItem icon={SecurityIcon} title={this.context.strings["pinlock"]}mode="toggle" selected={this.props.cursorY % 2 === 0 && this.props.selected} on={this.props.on} />
        <SetttingsItem icon={SecurityIcon} title={this.context.strings["changepin"]} mode="popup" selected={this.props.cursorY % 2 === 1 && this.props.selected} />
      </div>
    )
  }
}
export default Security