import React, { Component } from 'react'
import './SettingsItem.css'
import PowerSaver from '../../../Assets/MenuIcons/power-saving.png'
import Popup from '../../../Assets/MenuIcons/popup.svg'

class SettingsItem extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="settings-item">
        <img className="settings-item-icon" src={this.props.icon} alt="icon"></img>
        <div className="title"> {this.props.title} </div>
        {
          this.props.mode === "toggle" ?
            <div className="toggle">
              <div className="handle on"></div>
            </div> : ''
        }

        {
          this.props.mode === "popup" ?
            <img className="popup-icon" src={Popup}/>
            : ''
        }
      </div>
    )
  }
}

export default SettingsItem