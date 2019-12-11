import React, { Component } from 'react'
import './Power.css'


class Power extends Component {
  render() {
    return (
      <div className="power-settings-component">
        {/* <svg width="120" height="120" >
          <circle cx="60" cy="60" r="54" stroke="yellow" stroke-width="8" fill="#FFFFFF00"></circle>
          <circle cx="60" cy="60" r="54" stroke="red" stroke-width="8" fill="#FFFFFF00" stroke-dasharray="calc(35 * 31.42 / 100) 31.42"></circle>
        </svg> */}

        <svg height="100" width="100">
          {/* <circle r="40" cx="45" cy="45" fill="white" /> */}
          <circle r="40" cx="45" cy="45" fill="transparent"
            stroke="yellow"
            stroke-width="10"
            stroke-dasharray="calc(2*3.14*40 - 50)"
          />
        </svg>

      </div>
    )
  }
}

export default Power