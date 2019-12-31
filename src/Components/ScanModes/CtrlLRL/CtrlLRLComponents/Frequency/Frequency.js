import React, { Component } from 'react'
import './Frequency.css'
import LeftArrow from '../../../../../Assets/MenuIcons/left-arrow3.png'
import RightArrow from '../../../../../Assets/MenuIcons/right-arrow3.png'
import FrequencyIcon from '../../../../../Assets/MenuIcons/frequency.png'

class Frequency extends Component {
  render() {
    return (
      <div className="frequency-component">
        <div className="frequency-selector">
          <img src={LeftArrow} alt="left" />
          <div className="frequency-value">5000 MHz</div>
          <img src={RightArrow} alt="right" />
        </div>
        <img alt="" src={FrequencyIcon}/>
      </div>
    )
  }
}

export default Frequency