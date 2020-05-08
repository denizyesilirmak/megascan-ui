import React, { Component } from 'react'
import './Language.css'
import SettingsItem from '../../SettingsElements/SettingsItem'
import LanguageIcon from '../../../../Assets/MenuIcons/language.svg'
import { LanguageContext } from '../../../../Contexts/LanguageContext'

class Language extends Component{
  static contextType = LanguageContext
  componentDidMount = () => {
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 25);
  }
  render(){
    return(
      <div ref="sc" className="power-settings">
         <SettingsItem icon={LanguageIcon} title={this.context["changelanguage"]} mode="popup"  selected={true && this.props.selected}/>
      </div>
    )
  }
}
export default Language