import React, { Component } from 'react'

class LineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sensorValue: 255
    }

    this.lines = new Array(37)
    for (let index = 0; index < this.lines.length; index++) {
      this.lines[index] = Math.trunc(Math.sin(index * 0.085) * this.state.sensorValue * (65 / 255))
    }
  }

  componentDidMount() {
    console.log(this.lines)
  }

  componentDidUpdate() {
    for (let index = 0; index < this.lines.length; index++) {
      this.lines[index] = Math.trunc(Math.sin(index * 0.085) * this.props.value * (65 / 255) + Math.random() *8)
    }
  }

  render() {
    return (
      <svg width="600" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient spreadMethod="pad" y2="1" x2="0" y1="0" x1="0" id="svg_38">
            <stop offset="0" stopColor={`#ff${(255 - this.props.value).toString(16)}00ff`} />
            <stop offset="1" stopColor="#00ff0000" />
          </linearGradient>
        </defs>
        <g>

          {
            this.lines.map((e, i) => {
              return (
                <rect key={i} id={`svg_${i}`} height={e} width="10" y={7.5 + (65 - e)} x={11.8 + i * 16} fill="url(#svg_38)" />
              )
            })
          }
        </g>
      </svg>
    )
  }
}
export default LineChart