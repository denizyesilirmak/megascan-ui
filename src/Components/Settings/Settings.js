import React, { Component } from 'react'
import Navigator from './SettingsElements/Navigator'
import './Settings.css'

class Settings extends Component{


  render(){
    return(
      <div className="settings-component component">
        <Navigator></Navigator>
      </div>
    )
  }
}

export default Settings