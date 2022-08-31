import React from 'react'
import './DetectorNoiseLevelAnalyser.css'
import SocketHelper from '../../SocketHelper'
import Kevgir from '../../Kevgir'



class DetectorNoiseLevelAnalyser extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.kevgir = new Kevgir()

    this.kalmanindex = 0

    this.kalmanvalues = [
      { R: 0.1, Q: 1 },
      { R: 0.01, Q: 2 },
      { R: 0.02, Q: 3 },
      { R: 0.05, Q: 5 },
      { R: 0.005, Q: 10 },
      { R: 0.1, Q: 100 },
      { R: 0.1, Q: 1000 },
      { R: 0.0001, Q: 10000 },
      { R: 0.1, Q: 1 },
      { R: 0.1, Q: 1 },
      { R: 0.1, Q: 1 },
      { R: 0.1, Q: 1 },

    ]

    this.state = {
      treshold: 0,
      value: 0
    }

  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    SocketHelper.send('H1')
    this.canvasWidth = this.canvas.current.width
    this.canvasHeight = this.canvas.current.height
    console.log(this.canvasHeight)
    this.ctx = this.canvas.current.getContext("2d")


  }

  componentWillUnmount() {
    SocketHelper.send('H0')
    SocketHelper.detach()
  }

  handleSocket = (data) => {
    if (data.type === 'button' && data.payload === 'start') {
      console.log('start')
      this.kevgir.calibrate()
    } else if (data.type === 'button' && data.payload === 'left') {
      this.kalmanindex++
      this.kevgir.kf.R = this.kalmanvalues[this.kalmanindex].R
      this.kevgir.kf.Q = this.kalmanvalues[this.kalmanindex].Q
      this.forceUpdate()
    } else if (data.type === 'button' && data.payload === 'right') {
      if (this.kalmanindex === 0)
        return


      this.kalmanindex--
      this.kevgir.kf.R = this.kalmanvalues[this.kalmanindex].R
      this.kevgir.kf.Q = this.kalmanvalues[this.kalmanindex].Q
      this.forceUpdate()

    } else if (data.type === 'button' && data.payload === 'up') {
      this.setState({
        treshold: this.state.treshold + 1
      })
    } else if (data.type === 'button' && data.payload === 'down') {
      this.setState({
        treshold: this.state.treshold - 1
      })
    }
    else if (data.type === 'button' && data.payload === 'back') {
      this.props.navigateTo('lockerScreen')
    }

    if (data.type === 'pulse') {
      this.handlePulseData(data)
    }


  }

  handlePulseData = (data) => {
    const result = this.kevgir.detectorFunction(data)

    if (!result.ready) {
      return
    }

    if (this.state.treshold < result.sens * 500) {
      this.ctx.fillStyle = "#00ff00"
    } else {
      this.ctx.fillStyle = "#ff0000"

    }

    this.setState({
      value: Math.trunc(result.sens * 500)
    })

    this.ctx.fillRect(597, 349 - (result.sens * 500), 2, 2)

    var imageData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.ctx.putImageData(imageData, -2, 0)



  }

  render() {
    return (
      <div className="detector-noise-level-analyser component">
        <div className="detector-noise-level-analyser-value">
          {this.state.value}
        </div>
        <div className="detector-noise-level-analyser-treshold">
          {this.state.treshold} - R:{this.kalmanvalues[this.kalmanindex].R} Q:{this.kalmanvalues[this.kalmanindex].Q}
        </div>
        <canvas width="600" height="350" id="noise-level-plot" ref={this.canvas} />
      </div>
    )
  }
}

export default DetectorNoiseLevelAnalyser