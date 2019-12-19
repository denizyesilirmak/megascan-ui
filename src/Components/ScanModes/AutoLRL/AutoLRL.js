import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './AutoLRL.css'

import AutoLRLScan from './AutoLRLScan'
import AutoLRLSettings from './AutoLRLSettings'

class AutoLRL extends Component {

  constructor(props) {
    super(props)

    this.state = {
      settingsActive: true
    }
  }


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
        this.setState({
          settingsActive: !this.state.settingsActive
        })
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
        {
          this.state.settingsActive ?
            <AutoLRLSettings />
            :
            <AutoLRLScan />
        }
      </div>
    )
  }
}

export default AutoLRL