import React from 'react'
import SocketHelper from '../../SocketHelper'
import './PulseDiscriminationTest.css'
import SoundHelper from '../../SoundHelper'


class PulseDiscriminationTest extends React.Component {
  constructor(props) {

    super(props)
    console.clear()
    console.log('pulse discrimination test')

    this.sensor = 0
    this.disc = 0
    this.ratio = 0

    this.averageSensor = 0
    this.averageDisc = 0
    this.averageRatio = 0

    this.state = {
      a: 0,
      b: 0
    }
  }

  componentDidMount() {
    SoundHelper.createOscillator('square')
    SocketHelper.attach(this.handleSocketData)
    SocketHelper.send('H3')
  }

  componentWillUnmount() {
    SocketHelper.send('H0')
    SocketHelper.detach()
  }

  predictMaterialType = (arr) => {
    this.setState({
      a: Math.abs(arr[1]),
      b: Math.abs(arr[2])
    })


    //console.log(arr)
    console.log((this.state.a / this.state.b), arr[2])

    const value = this.state.a / this.state.b
    if (arr[0] > 20 && value > 3 && value !== Infinity && arr[2] < 50) {
      if (arr[2] > 0) {
        SoundHelper.changeFrequencyFast(440)
      }
    } else {
      if (arr[2] > 30) {

        SoundHelper.changeFrequencyFast(800)
      } else {
        SoundHelper.changeFrequencyFast(0)

      }

    }
  }

  handleSocketData = (data) => {
    if (data.type === 'button') {
      switch (data.payload) {
        case 'back':
          this.props.navigateTo('menuScreen')
          break
        case 'start':
          this.averageSensor = this.sensor
          this.averageDisc = this.disc
          this.averageRatio = this.ratio
          break

        default:
          break
      }
    }
    else if (data.type === 'pulse') {
      this.sensor = data.payload
      this.disc = data.disc
      this.ratio = data.ratio


      if (this.sensor < this.averageSensor - 5) {
        this.averageSensor--
      }

      if (this.ratio < this.averageRatio - 5) {
        this.averageRatio--
      }

      const result = [
        this.sensor - this.averageSensor,
        this.disc - this.averageDisc,
        this.ratio - this.averageRatio
      ]

      this.predictMaterialType(result)

    }



  }

  render() {
    return (
      <div className="pulse-d-t component">
        <div className="bar-container">
          <div className="bar-itself" style={{ width: this.state.a + '%' }}>

          </div>
        </div>

        <div className="bar-container">
          <div className="bar-itself" style={{ width: this.state.b + '%' }}>

          </div>
        </div>

        <div className="bar-container">
          <div className="bar-itself" style={{ width: this.state.a / this.state.b * 5 + '%' }}>

          </div>
        </div>

      </div>
    )
  }
}

export default PulseDiscriminationTest