import socketHelper from './SocketHelper'

class SoundHelper {
  constructor() {
    this.lastFreqValue = 0
    if (!SoundHelper.instance) {
      socketHelper.attachSpecial('oscillator')
      
    }
    return SoundHelper.instance
  }

  stopOscillator() {
    this.lastFreqValue = 0
    socketHelper.sendSpecial('oscillator', {
      command: 'stop',
      payload: null
    })
  }

  createOscillator(frequencyType = "sine") {
    socketHelper.sendSpecial('oscillator', {
      command: 'create',
      payload: frequencyType
    })
  }

  changeFrequencySmooth(hertz) {
    if (this.lastFreqValue === hertz) { return }
    this.lastFreqValue = hertz
    socketHelper.sendSpecial('oscillator', {
      command: 'changeFrequencySmooth',
      payload: hertz
    })
  }

  changeFrequencyFast(hertz) {
    if (this.lastFreqValue === hertz) { return }
    this.lastFreqValue = hertz
    socketHelper.sendSpecial('oscillator', {
      command: 'changeFrequencyFast',
      payload: hertz
    })
  }

  changeFrequencyType(frequencyType) {
    socketHelper.sendSpecial('oscillator', {
      command: 'changeFrequencyType',
      payload: frequencyType
    })
  }

}

const soundHelperInstance = new SoundHelper()

export default soundHelperInstance