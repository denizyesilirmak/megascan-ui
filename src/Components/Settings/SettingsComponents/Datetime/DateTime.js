import React, { Component } from 'react'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import DateIcon from '../../../../Assets/MenuIcons/date.svg'
import TimeIcon from '../../../../Assets/MenuIcons/time.svg'

class DateTime extends Component{
  render(){
    return(
      <div className="power-settings">
        <SetttingsItem icon={DateIcon} title="Change Date" mode="popup" selected={this.props.cursorY % 2 === 0}/>
        <SetttingsItem icon={TimeIcon} title="Change Time" mode="popup" selected={this.props.cursorY % 2 === 1}/>
      </div>
    )
  }
}
export default DateTime