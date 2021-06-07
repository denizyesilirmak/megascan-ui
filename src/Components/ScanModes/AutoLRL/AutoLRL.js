import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './AutoLRL.css'

import AutoLRLScan from './AutoLRLScan'
import AutoLRLSettings from './AutoLRLSettings'
import AutoLRLResultScreen from './AutoLRLResult'

import dbStorage from '../../../DatabaseHelper'

const LIMITS = {
  MAXDISTANCE: 3000,
  MINDISTANCE: 100,
  MAXDEPTH: 100,
  MINDEPTH: 10
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

  async componentDidMount() {
    //getting last state from db
    this.setState({
      distance: await dbStorage.getItem("autolrl_distance") || LIMITS.MINDISTANCE,
      depth: await dbStorage.getItem("autolrl_depth") || LIMITS.MINDEPTH,
    })

    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.autoLrl.style.opacity = 1
    }, 15);
  }

  handleKeyDown = async (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempActiveScreen = this.state.activeScreen
    switch (socketData.payload) {
      case 'ok':
        if (tempActiveScreen >= 0 && tempActiveScreen < 1) {
          tempActiveScreen++
          await dbStorage.setItem("autolrl_distance", this.state.distance)
          await dbStorage.setItem("autolrl_depth", this.state.depth)
        }
        else if (tempActiveScreen === 2) tempActiveScreen = 0
        this.setState({
          activeScreen: tempActiveScreen
        })
        return
      case 'back':
        console.log("back")
        if (this.state.activeScreen === 0) {
          this.refs.autoLrl.style.opacity = 0
          this.refs.autoLrl.style.transform = "translateY(200px)"
          setTimeout(() => {
            this.props.navigateTo('menuScreen')
            return
          }, 500);
        } else {
          tempActiveScreen = tempActiveScreen - 1
          this.setState({
            activeScreen: tempActiveScreen
          })
        }
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
      case 'turnoff':
        this.props.navigateTo('turnOff')
        return
      default:
        break
    }
  }

  goToResults = () => {
    this.setState({
      activeScreen: 2
    })
  }

  renderScreen = (screen) => {
    switch (screen) {
      case 0: return <AutoLRLSettings mode={this.state.settingsMode} distance={this.state.distance} depth={this.state.depth} limits={LIMITS} />
      case 1: return <AutoLRLScan next={() => this.goToResults()} />
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