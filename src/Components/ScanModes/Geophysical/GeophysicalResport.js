import React from 'react'
import './GeophysicalReport.css'
import { DeviceContext } from '../../../Contexts/DeviceContext'

const height = 6

class GeophysicalReport extends React.Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="component geophysical-report">
        <div className="geo-plot-holder">
          <svg width="400" height="330" viewBox="0 -3 8 6.6" style={{ position: 'absolute' }}>
            <line x1="4" y1={(height * -1) + 7.04} x2="8" y2={(height * -1) + 7.04} strokeWidth="0.06" stroke="#ff0000" />
            <path
              d={`M 2 4 L 2 4 C 3 4 3 ${(height * -1) + 7} 4 ${(height * -1) + 7} C 5 ${(height * -1) + 7} 5 4 6 4`}
              fill="#fcfc03"
            />
            <path
              d={`M 2 4 L 2 4 C 3 4 3 ${(height * -0.95) + 7} 4 ${(height * -0.95) + 7} C 5 ${(height * -0.95) + 7} 5 4 6 4`}
              fill="#fcba03"
            />
            <path
              d={`M 2 4 L 3 4 C 3 4 3 ${(height * -0.9) + 7} 4 ${(height * -0.9) + 7} C 5 ${(height * -0.9) + 7} 5 4 5 4`}
              fill="#fc7303"
            />
            <path
              d={`M 2 4 L 3.5 4 C 3 4 3 ${(height * -0.8) + 7} 4 ${(height * -0.8) + 7} C 5 ${(height * -0.8) + 7} 5 4 4.5 4`}
              fill="#fc0303"
            />
          </svg>

          <svg width="400" height="330" style={{ position: 'absolute' }}>
            <text textAnchor="end" x="390" y="20" fill="#b6f542" fontSize="9">1000</text>
            <text textAnchor="end" x="390" y="50" fill="#b6f542" fontSize="9">900</text>
            <text textAnchor="end" x="390" y="80" fill="#b6f542" fontSize="9">800</text>
            <text textAnchor="end" x="390" y="110" fill="#b6f542" fontSize="9">700</text>
            <text textAnchor="end" x="390" y="140" fill="#b6f542" fontSize="9">600</text>
            <text textAnchor="end" x="390" y="170" fill="#b6f542" fontSize="9">500</text>
            <text textAnchor="end" x="390" y="200" fill="#b6f542" fontSize="9">400</text>
            <text textAnchor="end" x="390" y="230" fill="#b6f542" fontSize="9">300</text>
            <text textAnchor="end" x="390" y="260" fill="#b6f542" fontSize="9">200</text>
            <text textAnchor="end" x="390" y="290" fill="#b6f542" fontSize="9">100</text>
            <text textAnchor="end" x="390" y="320" fill="#b6f542" fontSize="9">0</text>

            <line x1="0" x2="400" y1="30" y2="30" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="60" y2="60" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="90" y2="90" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="120" y2="120" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="150" y2="150" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="180" y2="180" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="210" y2="210" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="240" y2="240" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="270" y2="270" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="0" x2="400" y1="300" y2="300" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          </svg>
        </div>

        <div className="geo-plot-report">

          <div className="geo-plot-result-panel" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="result-title">
              Target
            </div>
            <div className="result-value">
              Gold
            </div>
          </div>

          <div className="geo-plot-result-panel" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="result-title">
              Value
            </div>
            <div className="result-value">
              950
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default GeophysicalReport