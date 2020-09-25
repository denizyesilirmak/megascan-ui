import React, { Component } from 'react'
import './ChangePin.css'
import socketHelper from '../../SocketHelper'
import { DeviceContext } from '../../Contexts/DeviceContext'
import Keypad from './Keypad'
import Tick from '../../Assets/tick.png'
import dbStorage from '../../DatabaseHelper'

class ChangePin extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)


    this.curentPin = '1111'
    this.state = {
      stage: 0,
      cursorX: 3 * 50,
      cursorY: 4 * 90,
      oldPinInput: [],
      newPinInput: [],
      confirmNewPinInput: [],
      error: false,
      success: false
    }

    this.tempPin = []
  }

  componentDidMount() {
    console.log(this.props.currentPin) //old pin
    // setInterval(() => {
    //   this.setState({
    //     error: !this.state.error
    //   })
    // }, 2000);
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== "button") { return }

    let tempCursorX = this.state.cursorX
    let tempCursorY = this.state.cursorY

    switch (socketData.payload) {
      case 'left':
        tempCursorX--
        break
      case 'right':
        tempCursorX++
        break
      case 'up':
        tempCursorY--
        break
      case 'down':
        tempCursorY++
        break
      case 'ok':
        if (true) {
          if (this.tempPin.length < 4 && !this.state.wrongPinPopup) {
            if (tempCursorY % 4 >= 0 && tempCursorY % 4 < 3) {
              this.tempPin.push(tempCursorY % 4 * 3 + tempCursorX % 3 + 1)
            }
            else if (tempCursorY % 4 === 3) {
              this.tempPin.push(0)
            }
          }
          else if (this.tempPin.length === 4) {
            if (this.state.stage === 0) {
              if (this.props.currentPin !== this.state.oldPinInput.join('')) {
                console.log(this.state.oldPinInput.join(''), this.curentPin)
                console.log("wrong pin, cannot continue")
                this.tempPin = []
                this.setState({ error: true, oldPinInput: [] })
                return
              }
            }
            console.log(this.state.oldPinInput.join(''))
            this.tempPin = []
            this.setState({ stage: this.state.stage + 1 })
            //bu kısım eski şifrenin giişinin tamamlandığı kısım.
            break
          }
        }
        break
      case 'back':
        if (this.state.stage === 0) {
          if (this.tempPin.length === 0) {
            this.props.navigateTo('settingsScreen', null, 2)
            return
          }
          this.tempPin = []
          this.setState({ oldPinInput: [] })
        } else {
          this.props.navigateTo("settingsScreen", null, 2)
          return
        }
        return
      default:
        break
    }
    this.setState({
      cursorX: tempCursorX,
      cursorY: tempCursorY
    })

    if (this.state.stage === 0) {
      this.setState({ oldPinInput: this.tempPin })
    }
    else if (this.state.stage === 1) {
      this.setState({ newPinInput: this.tempPin, error: false })
    }
    else if (this.state.stage === 2) {
      this.setState({ confirmNewPinInput: this.tempPin })
    }
    else if (this.state.stage === 3) {
      console.log("stage3")
      if (this.state.newPinInput.join('') === this.state.confirmNewPinInput.join('')) {
        console.log("yeni şifreler eşleşti")
        dbStorage.setItem('pincode', this.state.confirmNewPinInput.join(''))
        this.setState({
          success: true
        })
      }
      setTimeout(() => {
        this.props.navigateTo('settingsScreen', null, 2)
      }, 3000);
    }
  }

  renderCurrentPin = () => {
    switch (this.state.stage) {
      case 0:
        return <div className="pin-number"><span>{this.state.oldPinInput[0]}</span> <span>{this.state.oldPinInput[1]}</span> <span>{this.state.oldPinInput[2]}</span> <span>{this.state.oldPinInput[3]}</span></div>
      case 1:
        return <div className="pin-number"><span>{this.state.newPinInput[0]}</span> <span>{this.state.newPinInput[1]}</span> <span>{this.state.newPinInput[2]}</span> <span>{this.state.newPinInput[3]}</span></div>
      case 2:
        return <div className="pin-number"><span>{this.state.confirmNewPinInput[0]}</span> <span>{this.state.confirmNewPinInput[1]}</span> <span>{this.state.confirmNewPinInput[2]}</span> <span>{this.state.confirmNewPinInput[3]}</span></div>

      default:
        break;
    }
  }

  renderError = () => {
    return (
      <div className="wrong-pin-warning">
        <h3>Old pin number is not correct.</h3>
        <p>You cannot change the pin number of the device without entering the old pin number. </p>
      </div>
    )
  }

  renderSuccess = () => {
    return (
      <div className="change-pin-success" style={{ borderColor: this.context.theme.border_color }}>
        <img className="change-pin-success-tick" src={Tick} alt="tick"></img>
        <div className="change-pin-success-text">
          Password has been successfuly changed. Please don't forget your password.
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="component change-pin-component">
        <div className="change-pin-container" style={{ transform: this.state.error ? 'translateX(-200px)' : null }}>
          {
            this.state.stage === 0 ?
              <div className="old-pin-label">{this.context.strings["enteroldpinnumber"]}</div> : null
          }
          {
            this.state.stage === 1 ?
              <div className="old-pin-label">{this.context.strings["enternewpinnumber"]}</div> : null
          }
          {
            this.state.stage === 2 ?
              <div className="old-pin-label">{this.context.strings["confirmnewpinnumber"]}</div> : null
          }
          {
            this.renderCurrentPin()
          }

          <Keypad cursorX={this.state.cursorX} cursorY={this.state.cursorY} />
        </div>
        {
          this.state.error ?
            this.renderError() : null
        }

        {
          this.state.success ?
            this.renderSuccess() : null
        }

      </div>
    )
  }
}
export default ChangePin

//eski şifre onayı
