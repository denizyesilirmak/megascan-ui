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
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 0 ? this.context.theme.button_bg_selected : 'black' }}>
            rock
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 1 ? this.context.theme.button_bg_selected : 'black' }}>
            neutral
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 2 ? this.context.theme.button_bg_selected : 'black' }}>
            mixed
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 3 ? this.context.theme.button_bg_selected : 'black' }}>
            metallic
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 4 ? this.context.theme.button_bg_selected : 'black' }}>
            clay
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 5 ? this.context.theme.button_bg_selected : 'black' }}>
            sandy
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 6 ? this.context.theme.button_bg_selected : 'black' }}>
            mineral
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 7 ? this.context.theme.button_bg_selected : 'black' }}>
            chalky
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 8 ? this.context.theme.button_bg_selected : 'black' }}>
            silty
          </div>
        </div>
      </div>
    )
  }
}
export default SoilType