import React, { Component } from 'react'
import './ChangePin.css'
import socketHelper from '../../SocketHelper'

class ChangePin extends Component {
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
      error: true
    }

    this.tempPin = []
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
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
              if (this.curentPin !== this.state.oldPinInput.join('')) {
                console.log(this.state.oldPinInput.join(''), this.curentPin)
                console.log("wrong pin, cannot continue")
                this.setState({error: true})
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
        this.props.navigateTo("settingsScreen")
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
      this.setState({ newPinInput: this.tempPin })
    }
    else if (this.state.stage === 2) {
      this.setState({ confirmNewPinInput: this.tempPin })
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

  render() {
    return (
      <div className="component change-pin-component">
        <div className="change-pin-container">
          {
            this.state.stage === 0 ?
              <div className="old-pin-label">Please Enter Old Pin Number</div> : null
          }
          {
            this.state.stage === 1 ?
              <div className="old-pin-label">Please Enter New Pin Number</div> : null
          }
          {
            this.state.stage === 2 ?
              <div className="old-pin-label">Please Re-Enter New Pin Number</div> : null
          }
          {
            this.renderCurrentPin()
          }

          <div className="keypad">
            <div className={`key ${this.state.cursorX % 3 === 0 && this.state.cursorY % 4 === 0 ? "selected" : ""}`}>1</div>
            <div className={`key ${this.state.cursorX % 3 === 1 && this.state.cursorY % 4 === 0 ? "selected" : ""}`}>2</div>
            <div className={`key ${this.state.cursorX % 3 === 2 && this.state.cursorY % 4 === 0 ? "selected" : ""}`}>3</div>
            <div className={`key ${this.state.cursorX % 3 === 0 && this.state.cursorY % 4 === 1 ? "selected" : ""}`}>4</div>
            <div className={`key ${this.state.cursorX % 3 === 1 && this.state.cursorY % 4 === 1 ? "selected" : ""}`}>5</div>
            <div className={`key ${this.state.cursorX % 3 === 2 && this.state.cursorY % 4 === 1 ? "selected" : ""}`}>6</div>
            <div className={`key ${this.state.cursorX % 3 === 0 && this.state.cursorY % 4 === 2 ? "selected" : ""}`}>7</div>
            <div className={`key ${this.state.cursorX % 3 === 1 && this.state.cursorY % 4 === 2 ? "selected" : ""}`}>8</div>
            <div className={`key ${this.state.cursorX % 3 === 2 && this.state.cursorY % 4 === 2 ? "selected" : ""}`}>9</div>
            <div></div>
            <div className={`key ${this.state.cursorY % 4 === 3 ? "selected" : ""}`}>0</div>
          </div>
        </div>
        {
          this.state.error ? 
          this.renderError() : null
        }

      </div>
    )
  }
}
export default ChangePin

//eski şifre onayı
