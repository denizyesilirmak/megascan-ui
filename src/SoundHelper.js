class SoundHelper {
  constructor() {
    if (!SoundHelper.instance) {
      console.log("soundhelper: instance")
      this.audio_context = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive", sampleRate: 8000 })
      this.gainnode = this.audio_context.createGain()
      this.gainnode.connect(this.audio_context.destination)
      // console.log(this.audio_context.baseLatency)

      SoundHelper.instance = this
      this.started = false
    }
    return SoundHelper.instance
  }

  stopOscillator() {
    if (this.started === true) {
      this.oscillator.disconnect()
      this.oscillator.stop(this.audio_context.currentTime)
      this.started = false
    }
  }

  createOscillator(frequencyType = "sine") {
    // console.log(this.started)
    if (this.started === false) {
      console.log("oscliator started")
      this.oscillator = this.audio_context.createOscillator()
      this.oscillator.connect(this.gainnode)
      this.oscillator.type = frequencyType
      // console.log(this.oscillator)
      this.oscillator.start(this.audio_context.currentTime)
      this.started = true
    }
  }
  changeFrequency(hertz) {
    this.oscillator.frequency.linearRampToValueAtTime(hertz, this.audio_context.currentTime + 0.04);
  }
}

const soundHelperInstance = new SoundHelper()

export default soundHelperInstance