import React, { Component } from 'react'
import { DeviceContext } from '../../../../../Contexts/DeviceContext'
import './Search.css'

const targets = [
  {
    name: 'bronze'
  },
  {
    name: 'cavity'
  },
  {
    name: 'copper'
  },
  {
    name: 'diamond'
  },
  {
    name: 'gemstones'
  },
  {
    name: 'goldore'
  },
  {
    name: 'goldtreasure'
  },
  {
    name: 'goldveins'
  },
  {
    name: 'iron'
  },
  {
    name: 'platinium'
  },
  {
    name: 'silver'
  }
]

class Search extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="search-start-component">

        <div className="lrl-summary" style={{ borderColor: this.context.theme.border_color }}>

          <div className="lrl-summary-item" style={{ borderColor: this.context.theme.border_color }}>
            <div className="title" style={{ borderColor: this.context.theme.border_color }}>
              Target
            </div>
            <div className="value">
              {targets[this.props.target].name}
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