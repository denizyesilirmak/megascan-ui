import React, { Component } from 'react'
import './LiveStream.css'

const COLORS = {
  jet: [
    { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 63, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 127, color: { r: 0x00, g: 0xad, b: 0x00 } },
    { pct: 190, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 255, color: { r: 0xff, g: 0x00, b: 0x00 } }
  ]
}

class LiveStrem extends Component {

  constructor(props) {
    super(props)


    this.state = {
      stream: [127, 127, 127, 127, 127, 255, 127, 127, 127, 127]
    }
  }

  componentDidMount() {
    var c = this.refs.streamCanvas
    var ctx = c.getContext("2d");

    setInterval(() => {
      let tmpStream = this.state.stream
      tmpStream.push(parseInt(Math.random()*255))
      tmpStream.shift()
      this.setState({
        stream: tmpStream
      })
      var grd = ctx.createLinearGradient(0, 0, 560, 0);
      grd.addColorStop(0, this.getColor(this.state.stream[0]));
      grd.addColorStop(.1, this.getColor(this.state.stream[1]));
      grd.addColorStop(.2, this.getColor(this.state.stream[2]));
      grd.addColorStop(.3, this.getColor(this.state.stream[3]));
      grd.addColorStop(.4, this.getColor(this.state.stream[4]));
      grd.addColorStop(.5, this.getColor(this.state.stream[5]));
      grd.addColorStop(.6, this.getColor(this.state.stream[6]));
      grd.addColorStop(.7, this.getColor(this.state.stream[7]));
      grd.addColorStop(.8, this.getColor(this.state.stream[8]));
      grd.addColorStop(.9, this.getColor(this.state.stream[9]));
  
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 560, 280);
    }, 250);



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
      <div className="live-stream-component component">
        <div className="live-stream-top">
          <div className="stream-plot">
            <canvas ref="streamCanvas" width="560" height="280">

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