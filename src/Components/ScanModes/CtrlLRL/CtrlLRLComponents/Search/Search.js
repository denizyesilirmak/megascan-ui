import React, { Component } from 'react'
import { DeviceContext } from '../../../../../Contexts/DeviceContext'
import './Search.css'

const soiltypes = [
  "rock",
  "neutral",
  "mixed",
  "metallic",
  "clay",
  "sandy",
  "mineral",
  "chalky",
  "silty"
]

class Search extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="search-start-component">

        <div className="lrl-summary" style={{ borderColor: this.context.theme.border_color }}>

          <div className="lrl-summary-item" style={{ borderColor: this.context.theme.border_color }}>
            <div className="title" style={{ borderColor: this.context.theme.border_color }}>
              Soil
            </div>
            <div className="value">
              {soiltypes[this.props.soiltype % 9]}
            </div>
          </div>

          <div className="lrl-summary-item" style={{ borderColor: this.context.theme.border_color }}>
            <div className="title" style={{ borderColor: this.context.theme.border_color }}>
              Freq.
            </div>
            <div className="value">
              {this.props.frequency} Hz
            </div>
          </div>

          <div className="lrl-summary-item" style={{ borderColor: this.context.theme.border_color }}>
            <div className="title" style={{ borderColor: this.context.theme.border_color }}>
              Dist.
            </div>
            <div className="value">
              {this.props.distance} m
            </div>
          </div>

          <div className="lrl-summary-item" style={{ borderColor: this.context.theme.border_color }}>
            <div className="title" style={{ borderColor: this.context.theme.border_color }}>
              Depth
            </div>
            <div className="value">
            {this.props.depth} m
            </div>
          </div>


        </div>

        <div className="search-start-button" style={{ background: this.props.active ? this.context.theme.button_bg_selected : null }}>
          {this.context.strings["startscan"]}
        </div>
      </div>
    )
  }
}
export default Search