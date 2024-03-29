import React, { Component } from 'react'
import './SettingsItem.css'
import Popup from '../../../Assets/MenuIcons/popup.svg'
import LeftArrowIcon from '../../../Assets/MenuIcons/left-arrow2.png'
import RightArrowIcon from '../../../Assets/MenuIcons/right-arrow2.png'

import { DeviceContext } from '../../../Contexts/DeviceContext'

class SettingsItem extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div 
      style={{
        background: this.props.selected ? this.context.theme.button_bg_selected : this.context.theme.button_bg_selected_not
      }}
      className={`settings-item ${this.props.selected ? 'selected' : ''}`
      }>
        <img className="settings-item-icon" src={this.props.icon} alt="icon"></img>
        <div className="title"> {this.props.title} </div>
        {
          this.props.mode === "toggle" ?
            <div className="toggle">
              <div className={`handle ${this.props.on ? "on" : "off"}`}></div>
            </div> : ''
        }

        {
          this.props.mode === "popup" ?
            <img alt="p" className="popup-icon" src={Popup} />
            : ''
        }

        {
          this.props.mode === "slider" ?
            <div className="slider-container">
              <img id="left-arrow" alt="la" src={LeftArrowIcon} style={{filter: this.context.theme.arrorHueRotation}} />
              <div className="slider">
                <div className="slider-value" style={{ width: `${this.props.value}%` }} />
              </div>
              <img id="right-arrow" alt="la" src={RightArrowIcon} style={{filter: this.context.theme.arrorHueRotation}} />
            </div>

            : ''
        }
      </div>
    )
  }
}

export default SettingsItem