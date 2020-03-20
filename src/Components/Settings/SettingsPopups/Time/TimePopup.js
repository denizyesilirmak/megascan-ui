import React, { Component } from 'react'
import "./TimePopup.css"
import upArrow from '../../../../Assets/MenuIcons/up-arrow.png'
import downArrow from '../../../../Assets/MenuIcons/down-arrow.png'

class TimePopup extends Component {


  render() {
    return (
      <div className="settings-popup">
        <div className="popup-title">Change Date</div>
        <div className="date-picker">

          <div className={`item ${this.props.index === 0 ? "selected" : ""}`}>
            <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
            <div className="value">{this.props.hour < 10 ? "0" + this.props.hour : this.props.hour}</div>
            <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
          </div>

          <div className="time-seperator">:</div>

          <div className={`item ${this.props.index === 1 ? "selected" : ""}`}>
            <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
            <div className="value">{this.props.minute < 10 ? "0" + this.props.minute : this.props.minute}</div>
            <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
          </div>
          <div className="date-time-info">
            Press OK to save
        </div>
        </div>

      </div>
    )
  }
}
export default TimePopup 