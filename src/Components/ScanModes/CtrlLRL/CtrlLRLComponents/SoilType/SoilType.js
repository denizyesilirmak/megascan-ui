import React, { Component } from 'react'
import './SoilType.css'
import { DeviceContext } from '../../../../../Contexts/DeviceContext'

class SoilType extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="soiltype-component">
        <div className="soiltype-buttons">
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 6 === 0 ? this.context.theme.button_bg_selected : 'black' }}>
            Rock
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 6 === 1 ? this.context.theme.button_bg_selected : 'black' }}>
            Neutral
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 6 === 2 ? this.context.theme.button_bg_selected : 'black' }}>
            Mixed
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 6 === 3 ? this.context.theme.button_bg_selected : 'black' }}>
            Metallic
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 6 === 4 ? this.context.theme.button_bg_selected : 'black' }}>
            Clay
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 6 === 5 ? this.context.theme.button_bg_selected : 'black' }}>
            Sandy
          </div>
        </div>
      </div>
    )
  }
}
export default SoilType