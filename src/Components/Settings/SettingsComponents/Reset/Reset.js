import React, { Component } from 'react'
import './Reset.css'

import FactoryResetIcon from '../../../../Assets/MenuIcons/factory-reset.png'
import ResetIcon from '../../../../Assets/MenuIcons/reset.png'
import ClearMemoryIcon from  '../../../../Assets/MenuIcons/clear-memory.png'

class Reset extends Component {
  render() {
    return (
      <div className="reset-component">
        <div className="reset-button">
          <img alt="reset-icon" className="reset-button-icon"  src={FactoryResetIcon} />
          <div className="reset-button-label">
            Factory Reset
          </div>
        </div>

        <div className="reset-button">
          <img alt="reset-icon" className="reset-button-icon" src={ResetIcon} />
          <div className="reset-button-label">
            Factory Reset
          </div>
        </div>

        <div className="reset-button">
          <img alt="reset-icon" className="reset-button-icon" src={ClearMemoryIcon} />
          <div className="reset-button-label">
            Factory Reset
          </div>
        </div>
      </div>
    )
  }
}
export default Reset