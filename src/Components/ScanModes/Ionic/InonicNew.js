import React from 'react'
import './IonicNew.css'
import SocketHelper from '../../../SocketHelper'

class Ionic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }

    this.totalVolume = 1
    console.log(this.totalVolume)
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocketData)
    this.dataSensorInterval = setInterval(() => {
      SocketHelper.send('J')
    }, 120);

    this.audio_context = new (window.AudioContext || window.webkitAudioContex);
    this.gainnode = this.audio_context.createGain()
    this.gainnode.connect(this.audio_context.destination)

    this.oscillator = this.audio_context.createOscillator()
    this.oscillator.connect(this.gainnode)
    this.oscillator.frequency.setValueAtTime(0, this.audio_context.currentTime)
    this.oscillator.start(0)
    this.oscillator.type = "square"
    this.connected = false;
    this.playpause()
  }

  componentWillUnmount() {
    this.oscillator.stop()
    clearInterval(this.dataSensorInterval)
  }

  playpause = () => {
    if (!this.connected) {
      this.oscillator.connect(this.audio_context.destination);
    }
    else {
      this.oscillator.disconnect();
    }
    this.connected = !this.connected;
  };


  handleSocketData = (socketData) => {
    if (socketData.type === "bionic") {
      if(this.refs.indicator){
        this.refs.indicator.style.width = this.map(parseInt(socketData.payload), 0, 255, 30, 250) + "px"
        this.refs.indicator.style.height = this.map(parseInt(socketData.payload), 0, 255, 30, 250) + "px"
        this.refs.indicator.style.background = `rgb(${this.map(parseInt(socketData.payload), 0, 255, 0, 255)},0,0)`
      }
      this.setState({
        value: parseInt(socketData.payload)
      })
      this.oscillator.frequency.linearRampToValueAtTime(50 + this.state.value * 3, this.audio_context.currentTime + 0.1);
    }
    else if (socketData.type === "button") {
      switch (socketData.payload) {
        case 'back':
          clearInterval(this.dataSensorInterval)
          this.props.navigateTo('menuScreen')
          return
        default: 
          return
      }
    }
  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  render() {
    return (
      <div className="ionic-new component">
        <div className="ionic-radar">
          <div className="radar-indicator" ref="indicator" />
        </div>
      </div>
    )
  }
}

export default Ionic