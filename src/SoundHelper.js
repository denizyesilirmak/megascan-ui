class SoundHelper {
  constructor() {
    if (!SoundHelper.instance) {
      console.log("soundhelper: instance")
      this.audio_context = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" })
      this.gainnode = this.audio_context.createGain()
      console.log(this.audio_context.sampleRate)
      // console.log(this.audio_context.baseLatency)
      
      SoundHelper.instance = this
      this.started = false
      this.oscillator = this.audio_context.createOscillator()
      this.oscillator.frequency.value = 0
      this.oscillator.connect(this.gainnode)
      this.oscillator.start(this.audio_context.currentTime)
      this.gainnode.connect(this.audio_context.destination)
      setTimeout(() => {
        this.oscillator.disconnect()
      }, 800);
    }
    return SoundHelper.instance
  }

  stopOscillator() {
    if (this.started === true) {
      this.oscillator.disconnect()
      this.oscillator.frequency.value = 0
      this.started = false
    }
  }

  createOscillator(frequencyType = "sine") {
    this.gainnode.gain.value = 0
    console.log(this.gainnode.gain.value)

    // console.log(this.started)
    if (this.started === false) {
      this.oscillator.type = frequencyType
      this.oscillator.connect(this.audio_context.destination)
      this.started = true
    }
  }

  changeFrequencySmooth(hertz) {
    if (isNaN(hertz)) {
      return
    } else if (hertz > 22050) {
      return
    }
    this.oscillator.frequency.setTargetAtTime(hertz, this.audio_context.currentTime + 0, 0.25)
    // this.oscillator.frequency.linearRampToValueAtTime(hertz, this.audio_context.currentTime + 0.04);
  }

  changeFrequencyFast(hertz) {
    this.oscillator.frequency.setValueAtTime(hertz, this.audio_context.currentTime)
  }

  changeFrequencyType(frequencyType) {
    this.oscillator.type = frequencyType
  }

  setVolume = (vol) => {
    console.log(vol)
    this.gainnode.gain.value = vol/100
    console.log(this.gainnode.gain)
  }


}

const soundHelperInstance = new SoundHelper()

export default soundHelperInstance