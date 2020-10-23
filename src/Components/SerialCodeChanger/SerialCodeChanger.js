import React from 'react'
import './SerialCodeChanger.css'
import SocketHelper from '../../SocketHelper'

class SerialCodeChanger extends React.Component {
  constructor(props) {
    super(props)

    this.devicelist = [
      {
        name: 'infinity',
        prefix: 'INF101'
      },
      {
        name: 'gold star',
        prefix: 'GLD301'
      },
      {
        name: 'viber',
        prefix: 'VBR301'
      },
      {
        name: 'concord',
        prefix: 'CNR401'
      },
      {
        name: 'pheonix',
        prefix: 'PNG501'
      }
    ]

    this.state = {
      started: false,
      prefix: 'INF101',
      cursorIndex: 0,
      one: 0,
      two: 0,
      three: 0,
      prefixIndex: 0
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
  }

  handleSocket = (sd) => {
    if (sd.type !== 'button') {
      return
    }
    switch (sd.payload) {
      case 'ok':
        if (!this.state.started) {
          this.setState({
            started: true
          })
        }else{
          this.SaveSerialNumber()
          this.setState({
            started: false
          })
        }
        break;
      case 'back':
        SocketHelper.detach()
        this.props.navigateTo('menuScreen')

        break;
      case 'up':
        if (!this.state.started) {
          return
        }
        if (this.state.cursorIndex === 0) {
          this.setState({
            prefixIndex: this.clamp(this.state.prefixIndex + 1, 0, 4)
          })
        }
        else if (this.state.cursorIndex === 1) {
          this.setState({
            one: this.clamp(this.state.one + 1, 0, 9)
          })
        }
        else if (this.state.cursorIndex === 2) {
          this.setState({
            two: this.clamp(this.state.two + 1, 0, 9)
          })
        }
        else if (this.state.cursorIndex === 3) {
          this.setState({
            three: this.clamp(this.state.three + 1, 0, 9)
          })
        }
        break;
      case 'down':
        if (!this.state.started) {
          return
        }
        if (this.state.cursorIndex === 0) {
          this.setState({
            prefixIndex: this.clamp(this.state.prefixIndex - 1, 0, 4)
          })
        }
        else if (this.state.cursorIndex === 1) {
          this.setState({
            one: this.clamp(this.state.one - 1, 0, 9)
          })
        }
        else if (this.state.cursorIndex === 2) {
          this.setState({
            two: this.clamp(this.state.two - 1, 0, 9)
          })
        }
        else if (this.state.cursorIndex === 3) {
          this.setState({
            three: this.clamp(this.state.three - 1, 0, 9)
          })
        }
        break;
      case 'left':
        if (!this.state.started) {
          return
        }
        if (this.state.cursorIndex > 0) {
          this.setState({ cursorIndex: this.state.cursorIndex - 1 })
        }
        break;
      case 'right':
        if (!this.state.started) {
          return
        }
        if (this.state.cursorIndex < 3) {
          this.setState({ cursorIndex: this.state.cursorIndex + 1 })
        }
        break;
      default:
        break;
    }
  }

  clamp = (val, min, max) => {
    if (val <= min) {
      return min
    }
    else if (val >= max) {
      return max
    }
    else {
      return val
    }
  }

  renderWarning = () => {
    return (
      <div className="warning">
        Please exit this screen by pressing the 'back' button. This screen was not designed for you and you will most likely break the device! Otherwise, continue by pressing the 'ok' button.
      </div>
    )
  }

  SaveSerialNumber = () => {
    const serialNumber = 'GM-' + this.devicelist[this.state.prefixIndex].prefix + this.state.one + this.state.two + this.state.three
    console.log(serialNumber)
    fetch('http://localhost:9090/updateSerialNumber/' + serialNumber)
    .then(data => data.json())
    .then(result => {
      console.log(result)
    })
  }

  render() {
    return (
      <>
        <div className="serial-code-changer component" >
          {
            this.state.started === false ?
              this.renderWarning()
              : null
          }
          <div className="general-prefix">
            GM-
           </div>

          <div className={`serial-number ${this.state.cursorIndex === 0 ? 'selected' : ''}`}>
            {this.devicelist[this.state.prefixIndex].prefix}
          </div>

          <div className={`serial-number ${this.state.cursorIndex === 1 ? 'selected' : ''}`}>
            {this.state.one}
          </div>

          <div className={`serial-number ${this.state.cursorIndex === 2 ? 'selected' : ''}`}>
            {this.state.two}
          </div>

          <div className={`serial-number ${this.state.cursorIndex === 3 ? 'selected' : ''}`}>
            {this.state.three}
          </div>



        </div>
      </>
    )
  }
}

export default SerialCodeChanger