import React, { Component } from 'react'
import './AutoLRL.css'


class AutoLRLScan extends Component {
  render() {
    return (
      <div className="auto-lrl-scan">

        <div className="auto-lrl-indicator">
          <svg width="600" height="130" xmlns="http://www.w3.org/2000/svg">
            <g>
              <title>background</title>
              <rect fill="#fff" id="canvas_background" height="132" width="602" y="-1" x="-1" />
              <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" />
              </g>
            </g>
            <g>
              <rect id="svg_1" height="130" width="600" y="0" x="0" stroke-width="0" stroke="#000" fill="#000000" />
              <rect id="svg_4" height="90" width="5" y="20" x="297.5" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#ff0000" />
              <rect id="svg_6" height="76" width="19" y="27" x="264.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_7" height="76" width="19" y="27" x="237.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_8" height="76" width="19" y="27" x="210.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_9" height="76" width="19" y="27" x="183.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_10" height="76" width="19" y="27" x="155.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_11" height="76" width="19" y="27" x="126.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_12" height="76" width="19" y="27" x="99.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_13" height="76" width="19" y="27" x="72.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_14" height="76" width="19" y="27" x="45.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_15" height="76" width="19" y="27" x="17.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_16" height="76" width="19" y="27" x="562.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_17" height="76" width="19" y="27" x="535.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_18" height="76" width="19" y="27" x="508.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_19" height="76" width="19" y="27" x="481.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_20" height="76" width="19" y="27" x="453.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_21" height="76" width="19" y="27" x="424.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_22" height="76" width="19" y="27" x="397.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_23" height="76" width="19" y="27" x="370.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_24" height="76" width="19" y="28" x="343.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
              <rect id="svg_25" height="76" width="19" y="28" x="315.5" fill-opacity="0" stroke="#ffffff" fill="#ff0000" />
            </g>
          </svg>
        </div>
        <div className="auto-lrl-direction">
          Right Direction
        </div>

        <div className="auto-lrl-button">
          NEXT
        </div>
      </div>
    )
  }
}

export default AutoLRLScan