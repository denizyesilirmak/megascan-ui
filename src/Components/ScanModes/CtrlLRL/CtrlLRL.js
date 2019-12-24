import React, { Component } from 'react'
import './CtrlLRL.css'
import Navigator from '../../Settings/SettingsElements/Navigator'

class CtrlLRL extends Component{

  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <div className="ctrl-lrl-component">
        <Navigator activeSettingTab={this.state.activeSettingTab} buttons={this.buttons}></Navigator>
      </div>
    )
  }
}
export default CtrlLRL