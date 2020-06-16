import React, { Component } from 'react'
import './SoilType.css'
import { DeviceContext } from '../../../../../Contexts/DeviceContext'
class SoilType extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="soiltype-component">
        <div className="soiltype-buttons">
          <div className="soiltype-button" style={{borderColor: this.context.theme.border_color}}>
            Rock
          </div>
          <div className="soiltype-button" style={{borderColor: this.context.theme.border_color}}>
            Neutral
          </div>
          <div className="soiltype-button" style={{borderColor: this.context.theme.border_color}}>
            Mixed
          </div>
          <div className="soiltype-button" style={{borderColor: this.context.theme.border_color}}>
            Metallic
          </div>
          <div className="soiltype-button" style={{borderColor: this.context.theme.border_color}}>
            Clay
          </div>
          <div className="soiltype-button" style={{borderColor: this.context.theme.border_color}}>
            Sandy
          </div>
        </div>
      </div>
    )
  }
}
export default SoilType