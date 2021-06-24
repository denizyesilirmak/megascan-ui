import React, { Component } from 'react'

import './2DPlot.css'

const COLORS = {
  jet: [
    { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 63, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 127, color: { r: 0x00, g: 0xad, b: 0x00 } },
    { pct: 192, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 255, color: { r: 0xff, g: 0x00, b: 0x00 } }
  ]
}

class Plot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      waiting: false
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

    this.data = this.props.data

    this.gridWidthLength = this.data[0].length
    this.gridHeightLength = this.data.length
    this.gridWidth = Math.ceil(620 / this.gridWidthLength)
    this.gridHeight = Math.ceil(280 / this.gridHeightLength)


    this.data = this.Interpolate(this.data, 2) //2 Kalacak
    this.max = 0
    this.min = 255


    this.dataWidthLength = this.data[0].length
    this.dataHeightLength = this.data.length
    this.rectWidth = Math.ceil(620 / this.dataWidthLength)
    this.rectHeight = Math.ceil(280 / this.dataHeightLength)
    this.average = 0
    this.dataCount = this.data[0].length * this.data.length

    this.data.forEach(element => {
      element.forEach(e => {
        this.average += e / this.dataCount
        this.max = (e > this.max) ? e : this.max
        this.min = (e < this.min) ? e : this.min
      })
    })

    //console.log(this.max, this.min)

    this.reducedData = [];
    for (var i = 0; i < this.data.length; i++) {
      this.reducedData[i] = new Array(this.data[0].length);
    }





  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return Math.abs(x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  componentDidMount() {
    this.data.forEach((element, a) => {
      element.forEach((e, b) => {
        // this.reducedData[a][b] = parseInt(e - this.average)
        e = parseInt(e - this.average)

        if (this.max - this.min >= 6) {
          if (e >= 0) {
            this.reducedData[a][b] = (Math.trunc(this.map((e), 0, this.max - this.average, 127, 255)))
          } else {
            this.reducedData[a][b] = Math.trunc(this.map((this.average - this.min + e), 0, this.average - this.min, 0, 127))
          }
        }
        else {
          if (e > 0) {
            this.reducedData[a][b] = (Math.trunc(this.map((127 + e), 127, this.max - this.average, 127, 140)))
          } else {
            this.reducedData[a][b] = Math.trunc(this.map((this.average - this.min + e), 0, this.average - this.min, 110, 127))
          }
        }
      })
    })
    this.setState({
      reducedData: this.reducedData
    })
  }



  Interpolate = (data, factor) => {
    var level = factor
    var i_row = []
    var interpolated_array = []
    var interpolated_rows = []
    //2D iterpolation for x axis
    for (var k = 0; k < data.length; k++) {
      i_row.push(data[k][0])
      for (var i = 0; i < data[k].length - 1; i++) {
        var fark = data[k][i] - data[k][i + 1]
        for (var y = 0; y < level; y++) {
          i_row.push(parseInt(data[k][i] - (fark / (level + 1) * (y + 1))))
        }
        i_row.push(data[k][i + 1])
      }
      interpolated_array.push(i_row)
      i_row = []
    }
    //2D iterpolation for y axis
    for (i = 0; i < interpolated_array.length - 1; i++) {
      for (k = 0; k < level; k++) {
        for (var j = 0; j < interpolated_array[0].length; j++) {
          fark = interpolated_array[i][j] - interpolated_array[i + 1][j]
          i_row.push(parseInt(interpolated_array[i][j] - (fark / (level + 1) * (k + 1))))
          if (interpolated_array[0].length - 1 === j) {
            interpolated_rows.push(i_row)
            i_row = []
          }
        }
      }
      i_row = []
    }
    var result = []
    j = 0
    for (let i = 0; i < interpolated_array.length - 1; i++) {
      result.push(interpolated_array[i])
      for (j; j < ((i + 1) * level); j++) {
        result.push(interpolated_rows[j])
      }
    }
    result.push(interpolated_array[interpolated_array.length - 1])
    return result
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
                      <rect key={k * l + Math.random()} height={this.rectHeight} width={this.rectWidth} y={k * this.rectHeight} x={l * this.rectWidth} style={{ fill: this.getColor(d) }} />
                    )
                  })
                )
              })
            }
          </g>

          <g opacity="0.4">
            {

              this.data.map((d, l) => {
                return (
                  <line key={l} strokeWidth="1" y2={l * this.gridHeight} x2="620" y1={l * this.gridHeight} x1="0" stroke="#00000090" />
                )
              })
            }
            {
              this.data[0].map((d, l) => {
                return (
                  <line key={l} strokeWidth="1" y2="280" x2={l * this.gridWidth} y1="0" x1={l * this.gridWidth} stroke="#00000090" />
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