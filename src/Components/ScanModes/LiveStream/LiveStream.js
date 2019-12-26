import React, { Component } from 'react'
import './LiveStream.css'

class LiveStrem extends Component {
  render() {
    return (
      <div className="live-stream-component component">
        <div className="live-stream-top">
          <div className="stream-plot">
            <canvas width="550" height="280">

            </canvas>
          </div>
          <div className="stream-orientation">

          </div>
        </div>
        <div className="live-stream-bottom">

        </div>
      </div>
    )
  }
}

export default LiveStrem