import React, { Component } from 'react'
import './Reset.css'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import ResetIcon from '../../../../Assets/MenuIcons/reset.png'
import FactoryReset from '../../../../Assets/MenuIcons/factory-reset.png'
import ClearMemoryIcon from '../../../../Assets/MenuIcons/clear-memory.png'

import { LanguageContext } from '../../../../Contexts/LanguageContext'

class Reset extends Component {
  static contextType = LanguageContext
  componentDidMount(){
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 100);
  }
  render() {
    return (
      <div ref="sc" className="power-settings">
        <SetttingsItem icon={ResetIcon} title={this.context["resetsettings"]} mode="popup" selected={this.props.cursorY % 3 === 0 && this.props.selected} />
        <SetttingsItem icon={FactoryReset} title={this.context["factoryreset"]} mode="popup" selected={this.props.cursorY % 3 === 1 && this.props.selected} />
        <SetttingsItem icon={ClearMemoryIcon} title={this.context["clearmemory"]} mode="popup" selected={this.props.cursorY % 3 === 2 && this.props.selected} />
      </div>
    )
  }
}
export default Reset