import React, { Component } from 'react'
import './ChangePin.css'
import socketHelper from '../../SocketHelper'

class ChangePin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: 0,
      cursorX: 3 * 50,
      cursorY: 4 * 90,
      pin: []
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setInterval(() => {
      this.setState({
        stage: this.state.stage + 1
      })
    }, 200);
  }

  handleKeyDown = (socketData) => {
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
        this.props.navigateTo("menuScreen")
        return
      default:
        break
    }
    this.setState({
      cursorX: tempCursorX,
      cursorY: tempCursorY,
      pin: tempPin
    })
  }


  render() {
    return (
      <div className="component change-pin-component">
        {
          this.state.stage % 3 === 0 ?
            <div className="old-pin-label">Please Enter Old Pin Number</div> : null
        }
        {
          this.state.stage % 3 === 1 ?
            <div className="old-pin-label">Please Enter New Pin Number</div> : null
        }
                {
          this.state.stage % 3 === 2 ?
            <div className="old-pin-label">Please Re-Enter New Pin Number</div> : null
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
          <div></div>
        </div>
      </div>
    )
  }
}
export default ChangePin