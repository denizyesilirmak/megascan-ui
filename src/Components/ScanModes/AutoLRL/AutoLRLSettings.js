import React, { Component } from 'react'
import './AutoLRL.css'

import LeftArrow from '../../../Assets/MenuIcons/left-arrow3.png'
import RightArrow from '../../../Assets/MenuIcons/right-arrow3.png'

import DistanceIcon from '../../../Assets/MenuIcons/icon-distance.png'
import DepthIcon from '../../../Assets/MenuIcons/icon-depth.png'

class AutoLRLSettings extends Component {
  render() {
    return (
      <div className="auto-lrl-settings-component">
        <div className="top">
          <div className="auto-lrl-settings-part">
            <div className="value">
              <img alt="arrow" src={LeftArrow} />
              <span>10</span><span> M</span>
              <img alt="arrow" src={RightArrow} />
            </div>
            <img alt="icon" src={DistanceIcon} />
            <div className="navigator-button selected">Distance</div>
          </div>

          <div className="auto-lrl-settings-part">
            <div className="value">
              <img alt="arrow" src={LeftArrow} />
              <span>25</span><span> M</span>
              <img alt="arrow" src={RightArrow} />
            </div>
            <img alt="icon" src={DepthIcon} />
            <div className="navigator-button">Depth</div>
          </div>
        </div>
        <div className="bottom">

        </div>
      </div>
    )
  }
}

export default AutoLRLSettings