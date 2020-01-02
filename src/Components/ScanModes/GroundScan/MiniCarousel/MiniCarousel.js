import React, { Component } from 'react'
import './MiniCarousel.css'

import IconIndicator from '../../../../Assets/MenuIcons/button-indicator.png'
import RightArrow from '../../../../Assets/MenuIcons/right-arrow1.png'
import LeftArrow from '../../../../Assets/MenuIcons/left-arrow1.png'

class MiniCarousel extends Component {

  render() {
    return (
      <div className="method-selection-buttons">
        <img alt="left" className="msb-arrow left" src={LeftArrow}></img>
        <img alt="left" className="msb-arrow right" src={RightArrow}></img>
        {
          this.props.buttons.map((e, k) => {
            return (
              <div key={k} className={`msb ${this.props.selectedButtonIndex === k ? 'msb-selected' : ''}`}>
                <div className="icon-holder">
                  <img alt="ind" className="msb-indicator" src={IconIndicator} style={{ display: this.props.selectedButtonIndex === k ? "block" : "none" }} />
                  <img alt="icon" className="msb-icon" src={e.icon} />
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