import React, { Component } from 'react'
import './LockScreen.css'
import socketHelper from '../../SocketHelper'
import LockIcon from '../../Assets/MenuIcons/lock.png'

class LockScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cursorX: 3 * 50,
      cursorY: 4 * 90,
      pin: []
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.lockHolder.style.opacity = 1
      this.refs.lockHolder.style.transform = "scale(1)"
    }, 1200);
  }


  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempCursorX = this.state.cursorX
    let tempCursorY = this.state.cursorY
    let tempPin = this.state.pin
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
      case 'back':
        tempPin.splice(-1, 1)
        break
      case 'ok':
        if (this.state.pin.length < 4) {
          if (tempCursorY % 4 >= 0 && tempCursorY % 4 < 3) {
            tempPin.push(tempCursorY % 4 * 3 + tempCursorX % 3 + 1)
          }
          else if (tempCursorY % 4 === 3) {
            tempPin.push('0')
          }
        } 
        else if(this.state.pin.length === 4){
          this.props.navigateTo("menuScreen")
          return
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
    console.log(this.state.pin)
  }

  render() {
    return (
      <div className="lock-screen">
        <img className="lock-icon" alt="lock" src={LockIcon} />
        <div ref="lockHolder" className="lock-holder">
          <div className="pin">
            <span className="digit">{this.state.pin[0] ? this.state.pin[0] : "-"}</span>
            <span className="digit">{this.state.pin[1] ? this.state.pin[1] : "-"}</span>
            <span className="digit">{this.state.pin[2] ? this.state.pin[2] : "-"}</span>
            <span className="digit">{this.state.pin[3] ? this.state.pin[3] : "-"}</span>
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