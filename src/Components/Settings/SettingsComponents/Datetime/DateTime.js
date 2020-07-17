import React, { Component } from 'react'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import DateIcon from '../../../../Assets/SettingsIcons/date.png'
import TimeIcon from '../../../../Assets/SettingsIcons/time.png'
import './DateTime.css'

import { DeviceContext } from '../../../../Contexts/DeviceContext'

class DateTime extends Component {
  static contextType = DeviceContext
  componentDidMount = () => {
    setTimeout(() => {
      try {
        this.refs.sc.style.opacity = 1
      } catch (error) {
        console.warn("couldn't catch speed")

      }
    }, 15);
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SetttingsItem icon={DateIcon} title={this.context.strings["changedate"]} mode="popup" selected={this.props.cursorY % 2 === 0 && this.props.selected} />
        <SetttingsItem icon={TimeIcon} title={this.context.strings["changetime"]} mode="popup" selected={this.props.cursorY % 2 === 1 && this.props.selected} />
      </div>
    )
  }
}
export default DateTime