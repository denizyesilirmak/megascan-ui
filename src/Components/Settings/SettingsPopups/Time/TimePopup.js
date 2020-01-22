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

          <div className="item">
            <img  id="up-arrow" src={upArrow} className="arrow" alt="arr" />
            <div className="value">23</div>
            <img  id="down-arrow" src={downArrow} className="arrow" alt="arr" />
          </div>

          <div className="time-seperator">:</div>

          <div className="item selected">
            <img  id="up-arrow" src={upArrow} className="arrow" alt="arr" />
            <div className="value">59</div>
            <img  id="down-arrow" src={downArrow} className="arrow" alt="arr" />
          </div>

        </div>
      </div>
    )
  }
}
export default TimePopup 