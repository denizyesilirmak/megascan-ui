import React, { Component } from 'react'
import './Language.css'
import SettingsItem from '../../SettingsElements/SettingsItem'
import LanguageIcon from '../../../../Assets/MenuIcons/language.svg'
import { DeviceContext } from '../../../../Contexts/DeviceContext'

class Language extends Component{
  static contextType = DeviceContext
  componentDidMount = () => {
    setTimeout(() => {
      try {
        this.refs.sc.style.opacity = 1
      } catch (error) {
        console.warn("couldn't catch speed")
      }
    }, 25);
  }

  componentDidCatch(error, info){
    console.log("ERROR")
  }


  render(){
    return(
      <div ref="sc" className="power-settings">
         <SettingsItem icon={LanguageIcon} title={this.context.strings["changelanguage"]} mode="popup"  selected={true && this.props.selected}/>
      </div>
    )
  }
}
export default Language