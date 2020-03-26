import React, { Component } from 'react'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import DateIcon from '../../../../Assets/MenuIcons/date.svg'
import TimeIcon from '../../../../Assets/MenuIcons/time.svg'
import './DateTime.css'

import { LanguageContext } from '../../../../Contexts/LanguageContext'

class DateTime extends Component{
  static contextType = LanguageContext
  componentDidMount(){
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 100);
  }
  render(){
    return(
      <div ref="sc" className="power-settings">
        <SetttingsItem icon={DateIcon} title={this.context["changedate"]} mode="popup" selected={this.props.cursorY % 2 === 0 && this.props.selected}/>
        <SetttingsItem icon={TimeIcon} title={this.context["changetime"]} mode="popup" selected={this.props.cursorY % 2 === 1 && this.props.selected}/>
      </div>
    )
  }
}
export default DateTime