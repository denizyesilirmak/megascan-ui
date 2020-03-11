import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './AutoLRL.css'

import AutoLRLScan from './AutoLRLScan'
import AutoLRLSettings from './AutoLRLSettings'
import AutoLRLResultScreen from './AutoLRLResult'


const LIMITS = {
  MAXDISTANCE:  2500,
  MINDISTANCE:  100,
  MAXDEPTH:  100,
  MINDEPTH:  10
}

class AutoLRL extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeScreen: 0,
      settingsMode: true, //true: distance false: depth
      distance: LIMITS.MINDISTANCE,
      depth: LIMITS.MINDEPTH

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
        if (tempActiveScreen >= 0 && tempActiveScreen < 2) {
          tempActiveScreen++
        }
        else if (tempActiveScreen === 2) tempActiveScreen = 0
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

      case 'right':
        if (this.state.activeScreen === 0) {
          this.setState({ settingsMode: !this.state.settingsMode })
        }
        return
      case 'left':
        if (this.state.activeScreen === 0) {
          this.setState({ settingsMode: !this.state.settingsMode })
        }
        return
      case 'up':
        if (this.state.activeScreen === 0) {
          if (this.state.settingsMode === true) {
            //change distance
            if (this.state.distance < LIMITS.MAXDISTANCE) {
              this.setState({ distance: this.state.distance + 50 })
            }
          } else {
            //change depth
            if (this.state.depth < LIMITS.MAXDEPTH) {
              this.setState({ depth: this.state.depth + 10 })
            }
          }
        }
        return
      case 'down':
        if (this.state.activeScreen === 0) {
          if (this.state.settingsMode === true) {
            //change distance
            if (this.state.distance > LIMITS.MINDISTANCE) {
              this.setState({ distance: this.state.distance - 50 })
            }
          } else {
            //change depth
            if (this.state.depth > LIMITS.MINDEPTH) {
              this.setState({ depth: this.state.depth - 10 })
            }
          }
        }
        return
      default:
        break
    }
  }

  renderScreen = (screen) => {
    switch (screen) {
      case 0: return <AutoLRLSettings mode={this.state.settingsMode} distance={this.state.distance} depth={this.state.depth} limits={LIMITS} />
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