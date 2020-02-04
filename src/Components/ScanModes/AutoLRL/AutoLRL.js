import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './AutoLRL.css'

import AutoLRLScan from './AutoLRLScan'
import AutoLRLSettings from './AutoLRLSettings'
import AutoLRLResultScreen from './AutoLRLResult'

class AutoLRL extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeScreen: 2
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
    let tempActiveScreen = this.state.activeScreen
    switch (socketData.payload) {
      case 'ok':
        if(tempActiveScreen >= 0 && tempActiveScreen < 3){
          tempActiveScreen ++
        }
        else if(tempActiveScreen === 3) tempActiveScreen = 0
        this.setState({
          activeScreen: tempActiveScreen
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

  renderScreen = (screen) => {
    switch (screen) {
      case 0: return <AutoLRLSettings />
      case 1: return <AutoLRLScan />
      case 2: return <AutoLRLResultScreen />
      default:
        break;
    }
  }

  render() {
    return (
      <div ref="autoLrl" className="auto-lrl-component component">
        {
          this.renderScreen(this.state.activeScreen)
        }
      </div>
    )
  }
}

export default AutoLRL