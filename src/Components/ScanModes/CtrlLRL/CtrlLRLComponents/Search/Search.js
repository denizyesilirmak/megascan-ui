import React, { Component } from 'react'
import { DeviceContext } from '../../../../../Contexts/DeviceContext'
import './Search.css'
class Search extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="search-start-component">
        <div className="search-start-button" style={{ background: this.props.active ? this.context.theme.button_bg_selected : null }}>
          START SCAN
        </div>
      </div>
    )
  }
}
export default Search