import React, { Component } from 'react'
import './LockScreen.css'
import socketHelper from '../../SocketHelper'
import LockIcon from '../../Assets/MenuIcons/lock.png'

const DEFAULTPINS = [
  "0808",
  "4444",
  "9856",
  "1402"
]

class LockScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cursorX: 3 * 50,
      cursorY: 4 * 90,
      pin: [],
      wrongPinPopup: false
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.lockHolder.style.opacity = 1
      this.refs.lockHolder.style.transform = "scale(1)"
    }, 1200);
  }

  toggleWrongPinPopup() {
    this.setState({ wrongPinPopup: true, pin: [] })
    setTimeout(() => {
      this.setState({ pin: [] })
      this.setState({ wrongPinPopup: false })
    }, 2500);
  }

  renderWrongPinPopup() {
    return (
      <div className="black-overlay">
        <div className="popup wrong-pin">
          The pin you entered is incorrect. Please correct and try again.
        </div>
      </div>
    )
  }


  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempCursorX = this.state.cursorX
    let tempCursorY = this.state.cursorY
    let tempPin = this.state.pin
    switch (socketData.payload) {
      case 'left':
        if(!this.state.wrongPinPopup)
        tempCursorX--
        break
      case 'right':
        if(!this.state.wrongPinPopup)
        tempCursorX++
        break
      case 'up':
        if(!this.state.wrongPinPopup)
        tempCursorY--
        break
      case 'down':
        if(!this.state.wrongPinPopup)
        tempCursorY++
        break
      case 'back':
        if(!this.state.wrongPinPopup)
        tempPin.splice(-1, 1)
        break
      case 'ok':
        if (this.state.pin.length < 4 && !this.state.wrongPinPopup) {
          if (tempCursorY % 4 >= 0 && tempCursorY % 4 < 3) {
            tempPin.push(tempCursorY % 4 * 3 + tempCursorX % 3 + 1)
          }
          else if (tempCursorY % 4 === 3) {
            tempPin.push(0)
          }
        }
        else if (this.state.pin.length === 4) {
          console.log(this.state.pin.join(''))
          DEFAULTPINS.forEach(element => {
            if (element === this.state.pin.join('')) {
              this.props.navigateTo("menuScreen")
              return
            }
          });

          this.toggleWrongPinPopup();
          break
        }
        break
      default:
        break
    }

    this.setState({
      cursorX: tempCursorX,
      cursorY: tempCursorY,
      pin: tempPin
    })
    // console.log(this.state.pin)
  }

  render() {
    return (
      <div className="lock-screen">

        {
          (this.state.wrongPinPopup) ? this.renderWrongPinPopup() : ''
        }

        <img className="lock-icon" alt="lock" src={LockIcon} />
        <div ref="lockHolder" className="lock-holder">
          <div className="pin">
            <span className="digit">{this.state.pin[0] !== undefined ? this.state.pin[0] : "-"}</span>
            <span className="digit">{this.state.pin[1] !== undefined ? this.state.pin[1] : "-"}</span>
            <span className="digit">{this.state.pin[2] !== undefined ? this.state.pin[2] : "-"}</span>
            <span className="digit">{this.state.pin[3] !== undefined ? this.state.pin[3] : "-"}</span>
          </div>
          <div className="num-pad">
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
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}
export default LockScreen