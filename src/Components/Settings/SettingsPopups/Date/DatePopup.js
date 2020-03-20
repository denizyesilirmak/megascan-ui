import React, { Component } from 'react'
import './DatePopup.css'
import upArrow from '../../../../Assets/MenuIcons/up-arrow.png'
import downArrow from '../../../../Assets/MenuIcons/down-arrow.png'

class DatePopup extends Component {
  render() {
    return (
      <div className="settings-popup">
        <div className="popup-title">Change Date</div>
        <div className="date-picker">

          <div className="date-prop-holder">
            <div className="date-time-label">Day</div>
            <div>
              <div className={`item ${this.props.index === 0 ? "selected" : ""}`}>
                <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
                <div className="value">{this.props.day}</div>
                <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
              </div>
            </div>
          </div>


          <div className="date-prop-holder">
            <div className="date-time-label">Month</div>
            <div></div>
            <div className={`item ${this.props.index === 1 ? "selected" : ""}`}>
              <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
              <div className="value">{this.props.month}</div>
              <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
            </div>
          </div>

          <div className="date-prop-holder">
            <div className="date-time-label">Year</div>
            <div></div>
            <div className={`item ${this.props.index === 2 ? "selected" : ""}`}>
              <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
              <div className="value" style={{minWidth: 115}}>{this.props.year}</div>
              <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
            </div>
          </div>

          <div className="date-time-info">
            Press OK to save
        </div>
        </div>
      </div>
    )
  }
}
export default DatePopup