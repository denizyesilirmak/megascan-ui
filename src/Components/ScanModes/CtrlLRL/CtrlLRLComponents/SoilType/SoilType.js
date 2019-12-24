import React, { Component } from 'react'
import './SoilType.css'

class SoilType extends Component {
  render() {
    return (
      <div className="soiltype-component">
        <div className="soiltype-buttons">
          <div className="soiltype-button">
            Rock
          </div>
          <div className="soiltype-button">
            Neutral
          </div>
          <div className="soiltype-button">
            Mixed
          </div>
          <div className="soiltype-button">
            Metallic
          </div>
          <div className="soiltype-button">
            Clay
          </div>
          <div className="soiltype-button">
            Sandy
          </div>
        </div>
      </div>
    )
  }
}
export default SoilType