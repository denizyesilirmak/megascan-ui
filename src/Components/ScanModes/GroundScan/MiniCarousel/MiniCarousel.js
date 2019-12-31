import React, { Component } from 'react'
import './MiniCarousel.css'

import DeviceIcon from '../../../../Assets/MenuIcons/m-device.png'
import IconIndicator from '../../../../Assets/MenuIcons/button-indicator.png'

class MiniCarousel extends Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="method-selection-buttons">

        {
          this.props.buttons.map((e, k) => {
            return (
              <div key={k} className={`msb ${this.props.selectedButtonIndex === k ? 'msb-selected' : ''}`}>
                <div className="icon-holder">
                  <img alt="ind" className="msb-indicator" src={IconIndicator} style={{ display: this.props.selectedButtonIndex === k ? "block" : "none" }} />
                  <img alt="icon" className="msb-icon" src={DeviceIcon} />
                </div>
                <div className="msb-title">
                  {e.name}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default MiniCarousel