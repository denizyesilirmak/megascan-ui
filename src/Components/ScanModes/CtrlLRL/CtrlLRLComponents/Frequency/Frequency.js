import React, { Component } from 'react'
import './Frequency.css'
import LeftArrow from '../../../../../Assets/MenuIcons/left-arrow3.png'
import RightArrow from '../../../../../Assets/MenuIcons/right-arrow3.png'
import FrequencyIcon from '../../../../../Assets/MenuIcons/frequency.png'
import { DeviceContext } from '../../../../../Contexts/DeviceContext'
class Frequency extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="frequency-component">
        <div className="frequency-selector">
          <img src={LeftArrow} alt="left" style={{ filter: this.context.theme.arrorHueRotation }} />
          <div className="frequency-value">{this.props.hertz} MHz</div>
          <img src={RightArrow} alt="right" style={{ filter: this.context.theme.arrorHueRotation }} />
        </div>
        <img alt="" className="frequency-icon" src={FrequencyIcon} />
      </div>
    )
  }
}

export default Frequency