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
            {this.context.strings['rock']}
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 1 ? this.context.theme.button_bg_selected : 'black' }}>
            {this.context.strings['neutral']}
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 2 ? this.context.theme.button_bg_selected : 'black' }}>
            {this.context.strings['mixed']}
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 3 ? this.context.theme.button_bg_selected : 'black' }}>
            {this.context.strings['metallic']}
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 4 ? this.context.theme.button_bg_selected : 'black' }}>
            {this.context.strings['clay']}
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 5 ? this.context.theme.button_bg_selected : 'black' }}>
            {this.context.strings['sandy']}
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 6 ? this.context.theme.button_bg_selected : 'black' }}>
            {this.context.strings['mineral']}
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 7 ? this.context.theme.button_bg_selected : 'black' }}>
            {this.context.strings['chalky']}
          </div>
          <div className="soiltype-button"
            style={{ borderColor: this.context.theme.border_color, background: this.props.index % 9 === 8 ? this.context.theme.button_bg_selected : 'black' }}>
            {this.context.strings['silty']}
          </div>
        </div>
      </div>
    )
  }
}
export default SoilType