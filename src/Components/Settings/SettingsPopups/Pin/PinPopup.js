import React, { Component } from 'react'
import './PinPopup.css'
// import socketHelper from '../../../../SocketHelper'
class PinPopup extends Component {
  componentDidMount(){
    // socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = () => {
    console.log("pin change input")
  }
  render() {
    return (
      <div className="settings-popup">
        <div className="change-pin">
          <div className="numpad-holder">
            <div className="numpad-button selected">1</div>
            <div className="numpad-button">2</div>
            <div className="numpad-button">3</div>
            <div className="numpad-button">4</div>
            <div className="numpad-button">5</div>
            <div className="numpad-button">6</div>
            <div className="numpad-button">7</div>
            <div className="numpad-button">8</div>
            <div className="numpad-button">9</div>
            <div ></div>
            <div className="numpad-button">0</div>
            <div ></div>
          </div>
        </div>
      </div>
    )
  }
}
export default PinPopup