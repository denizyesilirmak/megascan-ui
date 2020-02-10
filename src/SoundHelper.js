import React, { Component } from 'react'
import Yodel from './Assets/yodel.mp3'

class SoundHelper extends Component {
  componentDidMount() {
    this.context = new AudioContext();
    setTimeout(() => {
      this.play()
    }, 2000);

  }

  play = () => {
    const source = this.context.createBufferSource();
    source.buffer = Yodel
    source.connect(Yodel);
    source.start();
  }

  render() {
    return null
  }
}
export default SoundHelper