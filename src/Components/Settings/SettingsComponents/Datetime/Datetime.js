import React, { Component } from 'react'
import './Datetime.css'

import DateIcon from '../../../../Assets/MenuIcons/date.png'
import TimeIcon from '../../../../Assets/MenuIcons/time.png'

class Datetime extends Component {

  render() {
    return (
      <div className="date-time-component">
        <div className="date-container">
          <img src={DateIcon} alt="date" />
        </div>

        <div className="time-container">
          <img src={TimeIcon} alt="date" />
        </div>

      </div>
    )
  }
}

export default Datetime