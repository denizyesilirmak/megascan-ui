import React, { Component } from 'react'
import './Display.css'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Switch from '../../SettingsElements/Switch';

class Display extends Component {
  render() {
    return (
      <div className="display-component">
        <div className="display-part">
          <Switch on={true} />
        </div>
        <div className="display-part">
          <div className="progress">
            <CircularProgressbar
              value={10}
              text={`${10}%`}
              counterClockwise
              styles={{
                path: {
                  stroke: `#d3be7b`,
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                  strokeLinecap: 'butt'
                },
                trail: {
                  stroke: 'rgba(255,255,255,0)',
                },
                text: {
                  fill: '#d3be7b',
                  fontSize: '18px',
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Display