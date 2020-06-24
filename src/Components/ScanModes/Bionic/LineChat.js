import React, { Component } from 'react'

class LineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 255
    }

    this.lines = new Array(23)
    for (let index = 0; index < this.lines.length; index++) {
      this.lines[index] = Math.trunc(this.props.value * (Math.sin(index * 0.14)) / 4 + Math.random() * 8)
    }
  }


  componentDidUpdate() {
    for (let index = 0; index < this.lines.length; index++) {
      this.lines[index] = Math.trunc(this.props.value * (Math.sin(index * 0.14)) / 4 + Math.random() * 8)
    }
  }

  render() {
    return (
      <svg width="600" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient spreadMethod="pad" y2="1" x2="0" y1="0" x1="0" id="svg_38">
            <stop offset="0" stopColor={`#ff7700ff`} />
            <stop offset="1" stopColor="#00ff00ff" />
          </linearGradient>
        </defs>
        <g>

          {
            this.lines.map((e, i) => {
              return (
                <rect key={i} id={`svg_${i}`} height={e} width="13" y={7.5 + (65 - e)} x={30 + i * 24} fill="url(#svg_38)" />
              )
            })
          }
        </g>
      </svg>
    )
  }
}
export default LineChart