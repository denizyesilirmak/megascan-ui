import React, { Component } from 'react'
import SetttingsItem from '../../SettingsElements/SettingsItem'

import DateIcon from '../../../../Assets/MenuIcons/date.svg'
import TimeIcon from '../../../../Assets/MenuIcons/time.svg'
import './DateTime.css'

class DateTime extends Component{
  componentDidMount(){
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 100);
  }
  render(){
    return(
      <div ref="sc" className="power-settings">
        <SetttingsItem icon={DateIcon} title="Change Date" mode="popup" selected={this.props.cursorY % 2 === 0 && this.props.selected}/>
        <SetttingsItem icon={TimeIcon} title="Change Time" mode="popup" selected={this.props.cursorY % 2 === 1 && this.props.selected}/>
      </div>
    )
  }
}
export default DateTime