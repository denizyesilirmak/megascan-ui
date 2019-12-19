import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './AutoLRL.css'

import AutoLRLScan from './AutoLRLScan'

class AutoLRL extends Component {

  
  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.autoLrl.style.opacity = 1
    }, 15);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    switch (socketData.payload) {
      case 'ok':

        return
      case 'back':
        console.log("back")
        this.refs.autoLrl.style.opacity = 0
        this.refs.autoLrl.style.transform = "translateY(200px)"
        setTimeout(() => {
          this.props.navigateTo("menuScreen")
        }, 500);
        return
      default:
        break
    }
  }

  render() {
    return (
      <div ref="autoLrl" className="auto-lrl-component component">
        <AutoLRLScan></AutoLRLScan>
      </div>
    )
  }
}

export default AutoLRL