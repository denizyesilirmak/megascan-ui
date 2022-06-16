
import KalmanFilter from 'kalmanjs'

class Kevgir {

  constructor() {
    this.kf = new KalmanFilter({ R: 0.01, Q: 3 })
    this.values = []
    this.calibrationValues = []

    this.rawValue = [0, 0, 0]
    this.calibration = [0, 0, 0]
    this.realValues = [0, 0, 0]

    this.ratio = 0
    this.sens = 0
    this.angle = 0
    this.ready = false
  }

  calibrate = () => {
    this.calibration = this.rawValue
    this.ready = true
  }

  detectorFunction = (pulseData) => {
    this.rawValue = [this.kf.filter(pulseData.payload), pulseData.disc, pulseData.ratio]




    this.realValues = this.rawValue.map((e, i) => e - this.calibration[i])
    //console.log(this.realValues)
    //console.log(this.realValues)

    if (this.realValues[0] < -3) {
      this.calibration[0] = this.calibration[0] - 2
    }

    if (this.realValues[1] < -3) {
      this.calibration[1] = this.calibration[1] - 2
    }


    let r = 0.5
    let a = 0
    if (this.realValues[0] > 25) {
      a = (Math.atan2(this.realValues[2], this.realValues[1]) * 180 / Math.PI)
      if (this.realValues[2] > 30) {
        r = 1
      } else {
        if (a > 7) {
          r = 0.5 + (this.realValues[0] / 900)
        } else {
          r = 0.5 - (this.realValues[0] / 900)
        }
      }
    } else {
      a = 0
      r = 0.5
    }
    if (r < 0) {
      r = 0
    } else if (r > 1) {
      r = 1
    }

    let s = this.realValues[0] / (3400 - this.calibration[0])
    if (s < 0 || isNaN(s)) {
      s = 0
    }

    return {
      ready: this.ready,
      ratio: r,
      sens: s,
      angle: a,
      realValues: this.realValues
    }
  }

}



export default Kevgir