import React, { Component } from 'react'
import './Datetime.css'

import DateIcon from '../../../../Assets/MenuIcons/date.png'
import TimeIcon from '../../../../Assets/MenuIcons/time.png'

class Datetime extends Component {

  render() {
    return (
      <div className="date-time-component">
        <div className="holder">
          <span className="date-time-title">Date</span>
          <div className="date-container">
            <img src={DateIcon} alt="date" />
            <div className="date-time-value">11.12.2019</div>
          </div>
        </div>

        <div className="holder">
          <span className="date-time-title">Date</span>
          <div className="time-container">
            <img src={TimeIcon} alt="time" />
            <div className="date-time-value">13:14</div>
          </div>
        </div>

      </div>
    )
  }
}

export default Datetime