import React, { Component } from 'react'
import './DatePopup.css'
import upArrow from '../../../../Assets/MenuIcons/up-arrow.png'
import downArrow from '../../../../Assets/MenuIcons/down-arrow.png'

import { DeviceContext } from '../../../../Contexts/DeviceContext'

class DatePopup extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="settings-popup" style={{ background: this.context.theme.background3}}>
        <div className="popup-title" style={{ background: this.context.theme.background2 }}>{this.context.strings["changedate"]}</div>
        <div className="date-picker">

          <div className="date-prop-holder">
            <div className="date-time-label">{this.context.strings["day"]}</div>
            <div>
              <div className={`item`} style={{background: this.props.index === 0 ? this.context.theme.button_bg_selected : this.context.theme.background3, boxShadow: this.context.theme.shadowPopup }}>
                <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
                <div className="value">{this.props.day}</div>
                <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
              </div>
            </div>
          </div>


          <div className="date-prop-holder">
            <div className="date-time-label" >{this.context.strings["month"]} </div>
            <div></div>
            <div className={`item`} style={{background: this.props.index === 1 ? this.context.theme.button_bg_selected : this.context.theme.background3, boxShadow: this.context.theme.shadowPopup }}>
              <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
              <div className="value">{this.props.month}</div>
              <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
            </div>
          </div>

          <div className="date-prop-holder">
            <div className="date-time-label">{this.context.strings["year"]}</div>
            <div></div>
            <div className={`item`} style={{background: this.props.index === 2 ? this.context.theme.button_bg_selected : this.context.theme.background3, boxShadow: this.context.theme.shadowPopup }}>
              <img id="up-arrow" src={upArrow} className="arrow" alt="arr" />
              <div className="value" style={{ minWidth: 115 }}>{this.props.year}</div>
              <img id="down-arrow" src={downArrow} className="arrow" alt="arr" />
            </div>
          </div>

          <div className="date-time-info">
            {this.context.strings["pressoktosave"]}
          </div>
        </div>
      </div>
    )
  }
}
export default DatePopup