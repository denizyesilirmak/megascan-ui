import React, { Component } from 'react'
import './Switch.css'

class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      on: false
    }
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="switch-component">

        <div className="toggler-container">
          <div style={{ transform: `translateX(${this.state.on ? 50 : 0}px)`, backgroundColor: `${this.state.on ? 'green' : 'red'}` }} className="toggler"></div>
        </div>

        <div className="status">{this.state.on ? 'on' : 'off'}</div>
      </div>
    )
  }
}

export default Switch