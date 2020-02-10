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

          <div className="item">
            <img  id="up-arrow" src={upArrow} className="arrow" alt="arr" />
            <div className="value">{this.props.day}</div>
            <img  id="down-arrow" src={downArrow} className="arrow" alt="arr" />
          </div>

          <div className="item selected">
            <img  id="up-arrow" src={upArrow} className="arrow" alt="arr" />
            <div className="value">{this.props.month}</div>
            <img  id="down-arrow" src={downArrow} className="arrow" alt="arr" />
          </div>

          <div className="item">
            <img  id="up-arrow" src={upArrow} className="arrow" alt="arr" />
            <div className="value">{this.props.year}</div>
            <img  id="down-arrow" src={downArrow} className="arrow" alt="arr" />
          </div>

        </div>
      </div>
    )
  }
}
export default DatePopup