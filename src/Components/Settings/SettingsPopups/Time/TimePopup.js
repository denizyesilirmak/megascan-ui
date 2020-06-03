import React, { Component } from 'react'
import "./TimePopup.css"
import upArrow from '../../../../Assets/MenuIcons/up-arrow.png'
import downArrow from '../../../../Assets/MenuIcons/down-arrow.png'
import { DeviceContext } from '../../../../Contexts/DeviceContext'

class TimePopup extends Component {
  static contextType = DeviceContext

  render() {
    return (
      <div className="settings-popup" style={{ background: this.context.theme.background3}}>
        <div className="popup-title" style={{ background: this.context.theme.background2 }}>{this.context.strings["changetime"]}</div>
        <div className="date-picker">

          <div className={`item`} style={{background: this.props.index === 0 ? this.context.theme.button_bg_selected : this.context.theme.background3, boxShadow: this.context.theme.shadowPopup }}>
            <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
            <div className="value">{this.props.hour < 10 ? "0" + this.props.hour : this.props.hour}</div>
            <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
          </div>

          <div className="time-seperator">:</div>

          <div className={`item`} style={{background: this.props.index === 1 ? this.context.theme.button_bg_selected : this.context.theme.background3, boxShadow: this.context.theme.shadowPopup }}>
            <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
            <div className="value">{this.props.minute < 10 ? "0" + this.props.minute : this.props.minute}</div>
            <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
          </div>
          <div className="date-time-info">
            {this.context.strings["pressoktosave"]}
        </div>
        </div>

      </div>
    )
  }
}
export default TimePopup 