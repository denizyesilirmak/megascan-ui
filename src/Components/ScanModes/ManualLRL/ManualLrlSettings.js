import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import '../CtrlLRL/CtrlLRL.css'
import Navigator from '../../Settings/SettingsElements/Navigator'


import Distance from '../CtrlLRL/CtrlLRLComponents/Distance/Distance'
import Depth from '../CtrlLRL/CtrlLRLComponents/Depth/Depth'
import Target from './ManualLRLComponents/Target/Target'

import { DeviceContext } from '../../../Contexts/DeviceContext'

const DISTANCEMAX = 2500
const DISTANCEMIN = 500
const DISTANCESTEP = 250

const DEPTHMAX = 10
const DEPTHMIN = 0
const DEPTHSTEP = 1



class CtrlLRL extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      activeSettingTab: 0,
      activeSettingTabName: 'target',
      verticalIndex: true,
      depth: 10,
      distance: 1000,
      targets: 500 * 3

    }

    this.buttons = [
      {
        name: "target"
      },
      {
        name: "distance"
      },
      {
        name: "depth"
      }
    ]

  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.ctrllrl.style.opacity = 1
    }, 15);
  }

  clamp = (value, min, max) => {
    if (value <= min) {
      return min
    }
    if (value >= max) {
      return max
    }
    else return value
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempActiveSettingTab = this.state.activeSettingTab
    let tempVerticalIndex = this.state.verticalIndex
    switch (socketData.payload) {
      case 'left':
        if (tempActiveSettingTab > 0 && tempVerticalIndex)
          tempActiveSettingTab--
        else if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            this.setState({ targets: this.state.targets - 1 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ distance: this.clamp(this.state.distance - DISTANCESTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ depth: this.clamp(this.state.depth - DEPTHSTEP, DEPTHMIN, DEPTHMAX) })
          }
        }
        break
      case 'right':
        if (tempActiveSettingTab < this.buttons.length - 1 && tempVerticalIndex)
          tempActiveSettingTab++
        else if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            this.setState({ targets: this.state.targets + 1 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ distance: this.clamp(this.state.distance + DISTANCESTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ depth: this.clamp(this.state.depth + DEPTHSTEP, DEPTHMIN, DEPTHMAX) })
          }
        }
        break
      case 'down':
        if (tempVerticalIndex)
          tempVerticalIndex++
        else if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType + 2 })
          }

        }
        break
      case 'up':
        if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType - 2 })
          }
        }

        break
      case 'ok':
        if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 4) {
            this.props.navigateTo('ctrlLrlSearchScreen')
            return
          }
        }
        tempVerticalIndex = !tempVerticalIndex
        break
      case 'back':
        if (tempVerticalIndex) {
          // çocuk yukarıda main menuye gidelim.
          this.props.navigateTo("menuScreen");
          return
        } else {
          //çocuk aşağıda, geri gitmiyoruz, çocuğu yukarı çıkarızyoruz.
          this.setState({ verticalIndex: !tempVerticalIndex })
        }
        return
      default:
        break
    }

    let activeTabName = this.buttons[tempActiveSettingTab]

    this.setState({
      activeSettingTab: tempActiveSettingTab,
      activeSettingTabName: activeTabName.name,
      verticalIndex: tempVerticalIndex % 2
    })
  }

  renderCtrlLrlComponent = () => {
    switch (this.state.activeSettingTab) {
      case 0:
        return <Target index={this.state.targets % 3} />
      case 1:
        return <Distance value={this.state.distance} />
      case 2:
        return <Depth value={this.state.depth} />
      default:
        break;
    }
  }

  render() {
    return (
      <div ref="ctrllrl" className="ctrl-lrl-component component">
        <Navigator arrowsAlwaysOn={true} last={4} activeSettingTab={this.state.activeSettingTab} active={this.state.verticalIndex} buttons={this.buttons} />
        <div className={`settings-component-container`}
          style={{ borderColor: this.context.theme.border_color, boxShadow: !this.state.verticalIndex ? this.context.theme.settings_shadow : 'none' }}
        >
          {
            this.renderCtrlLrlComponent()
          }
        </div>
      </div>
    )
  }
}
export default CtrlLRL