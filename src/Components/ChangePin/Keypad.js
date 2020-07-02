import React, { Component } from 'react'
import { DeviceContext } from '../../Contexts/DeviceContext'

class Keypad extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="keypad" style={{ borderColor: this.context.theme.border_color }}>
        <div style={{ background: this.props.cursorX % 3 === 0 && this.props.cursorY % 4 === 0 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorX % 3 === 0 && this.props.cursorY % 4 === 0 ? "selected" : ""}`}>1</div>
        <div style={{ background: this.props.cursorX % 3 === 1 && this.props.cursorY % 4 === 0 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorX % 3 === 1 && this.props.cursorY % 4 === 0 ? "selected" : ""}`}>2</div>
        <div style={{ background: this.props.cursorX % 3 === 2 && this.props.cursorY % 4 === 0 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorX % 3 === 2 && this.props.cursorY % 4 === 0 ? "selected" : ""}`}>3</div>
        <div style={{ background: this.props.cursorX % 3 === 0 && this.props.cursorY % 4 === 1 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorX % 3 === 0 && this.props.cursorY % 4 === 1 ? "selected" : ""}`}>4</div>
        <div style={{ background: this.props.cursorX % 3 === 1 && this.props.cursorY % 4 === 1 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorX % 3 === 1 && this.props.cursorY % 4 === 1 ? "selected" : ""}`}>5</div>
        <div style={{ background: this.props.cursorX % 3 === 2 && this.props.cursorY % 4 === 1 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorX % 3 === 2 && this.props.cursorY % 4 === 1 ? "selected" : ""}`}>6</div>
        <div style={{ background: this.props.cursorX % 3 === 0 && this.props.cursorY % 4 === 2 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorX % 3 === 0 && this.props.cursorY % 4 === 2 ? "selected" : ""}`}>7</div>
        <div style={{ background: this.props.cursorX % 3 === 1 && this.props.cursorY % 4 === 2 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorX % 3 === 1 && this.props.cursorY % 4 === 2 ? "selected" : ""}`}>8</div>
        <div style={{ background: this.props.cursorX % 3 === 2 && this.props.cursorY % 4 === 2 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorX % 3 === 2 && this.props.cursorY % 4 === 2 ? "selected" : ""}`}>9</div>
        <div></div>
        <div style={{ background: this.props.cursorY % 4 === 3 ? this.context.theme.button_bg_selected : 'black' }} className={`key ${this.props.cursorY % 4 === 3 ? "selected" : ""}`}>0</div>
      </div>

    )
  }
}
export default Keypad