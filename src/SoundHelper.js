class SoundHelper {
  constructor() {
    if (!SoundHelper.instance) {
      console.log("soundhelper: instance")
      this.audio_context = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" })
      this.gainnode = this.audio_context.createGain()
      this.gainnode.gain.setValueAtTime(0,this.audio_context.currentTime)
      this.gainnode.connect(this.audio_context.destination)
      console.log(this.audio_context.sampleRate)
      // console.log(this.audio_context.baseLatency)

      SoundHelper.instance = this
      this.started = false
      this.oscillator = this.audio_context.createOscillator()
      this.oscillator.connect(this.gainnode)
      this.oscillator.start(this.audio_context.currentTime)
      setTimeout(() => {
        this.oscillator.disconnect()
      }, 800);
    }
    return SoundHelper.instance
  }

  stopOscillator() {
    if (this.started === true) {
      this.oscillator.disconnect()
      this.started = false
    }
  }

  createOscillator(frequencyType = "sine") {
    // console.log(this.started)
    if (this.started === false) {
      this.oscillator.type = frequencyType
      this.oscillator.connect(this.audio_context.destination)
      this.started = true
    }
  }

  changeFrequency(hertz) {
    this.oscillator.frequency.setTargetAtTime(hertz, this.audio_context.currentTime + 0, 0.25)
    // this.oscillator.frequency.linearRampToValueAtTime(hertz, this.audio_context.currentTime + 0.04);
  }
}

const soundHelperInstance = new SoundHelper()

export default soundHelperInstance