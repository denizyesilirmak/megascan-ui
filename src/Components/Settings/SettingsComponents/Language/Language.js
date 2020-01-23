import React, { Component } from 'react'
import './Language.css'
import SetttingsItem from '../../SettingsElements/SettingsItem'
import LanguageIcon from '../../../../Assets/MenuIcons/language.svg'

class Language extends Component{
  render(){
    return(
      <div className="power-settings">
         <SetttingsItem icon={LanguageIcon} title="Change Language" mode="popup"  selected={true && this.props.selected}/>
      </div>
    )
  }
}
export default Language