import React, { Component } from 'react'

import './2DPlot.css'

const COLORS = {
  jet: [
    { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 25, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 50, color: { r: 0x00, g: 0xad, b: 0x00 } },
    { pct: 75, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 100, color: { r: 0xff, g: 0x00, b: 0x00 } }
  ]
}

class Plot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reducedData: []
    }

    this.data = [
      [212, 210, 203, 202, 207, 206, 206, 215, 209, 210],
      [210, 204, 209, 212, 214, 211, 214, 212, 210, 215],
      [209, 212, 210, 251, 148, 255, 226, 210, 213, 210],
      [214, 212, 220, 255, 243, 255, 208, 216, 215, 211],
      [213, 207, 211, 229, 243, 232, 189, 219, 214, 217],
      [211, 199, 201, 197, 205, 164, 185, 213, 216, 210],
      [212, 214, 195, 193, 218, 205, 198, 210, 209, 212],
      [211, 203, 211, 205, 194, 188, 200, 213, 208, 214],
      [209, 203, 203, 210, 209, 207, 215, 205, 208, 216],
      [207, 207, 211, 205, 206, 209, 212, 210, 215, 214],
      [214, 211, 215, 210, 207, 210, 212, 216, 215, 213]
    ]

    this.dataWidthLength = this.data[0].length
    this.dataHeightLength = this.data.length
    this.rectWidth = (620 / this.dataWidthLength)
    this.rectHeight = (280 / this.dataHeightLength).toFixed(1)
    this.total = 0
    this.dataCount = this.data[0].length * this.data.length

    this.data.forEach(element => {
      element.forEach(e => {
        this.total += e / this.dataCount
      })
    })

    this.reducedData = [];
    for (var i = 0; i < this.data.length; i++) {
      this.reducedData[i] = new Array(this.data[0].length);
    }

    this.data.forEach((element, a) => {
      element.forEach((e, b) => {
        this.reducedData[a][b] = parseInt(e - this.total)
      })
    })



  }

  componentDidMount() {

    this.setState({
      reducedData: this.reducedData
    })
  }



  getColor = (pct) => {
    for (var i = 1; i < COLORS.jet.length - 1; i++) {
      if (pct < COLORS.jet[i].pct) {
        break;
      }
    }
    const lower = COLORS.jet[i - 1];
    const upper = COLORS.jet[i];
    const range = upper.pct - lower.pct;
    const rangePct = (pct - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  }

  render() {
    return (
      <div className="plot">
        <svg width="620" height="280" >
          <g>
            {
              this.state.reducedData.map((row, k) => {
                return (
                  row.map((d, l) => {
                    return (
                      <rect key={k * l + Math.random()} height={this.rectHeight} width={this.rectWidth} y={k * this.rectHeight} x={l * this.rectWidth} fill={this.getColor(50 - d)} />
                    )
                  })
                )
              })
            }
          </g>
        </svg>

      </div>
    )
  }
}
export default Plot