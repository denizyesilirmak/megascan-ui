import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './CtrlLRL.css'
import Navigator from '../../Settings/SettingsElements/Navigator'

import SoilType from './CtrlLRLComponents/SoilType/SoilType'
import Frequency from './CtrlLRLComponents/Frequency/Frequency'
import Distance from './CtrlLRLComponents/Distance/Distance'

class CtrlLRL extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeSettingTab: 3,
      activeSettingTabName: 'distance',
      verticalIndex: 0
    }

    this.buttons = [
      {
        name: "soiltype"
      },
      {
        name: "frequency"
      },
      {
        name: "distance"
      },
      {
        name: "depth"
      },
      {
        name: "search"
      }
    ]

  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.ctrllrl.style.opacity = 1
    }, 15);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempActiveSettingTab = this.state.activeSettingTab
    let tempVerticalIndex = this.state.verticalIndex
    switch (socketData.payload) {
      case 'left':
        if (tempActiveSettingTab > 0)
          tempActiveSettingTab--
        break
      case 'right':
        if (tempActiveSettingTab < this.buttons.length - 1)
          tempActiveSettingTab++
        break
      case 'down':
        tempVerticalIndex++
        break
      case 'up':
        tempVerticalIndex++
        break
      case 'ok':

        return
      case 'back':
        this.refs.ctrllrl.style.opacity = 0
        this.refs.ctrllrl.style.transform = "translateY(200px)"
        setTimeout(() => {
          this.props.navigateTo("menuScreen")
        }, 500);
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
    switch (this.state.activeSettingTabName) {
      case "soiltype":
        return <SoilType/>
      case "frequency":
        return <Frequency/>
      case "distance":
        return <Distance/>
      case "depth":
        break
      case "search":
        break
      default:
        break;
    }
  }

  render() {
    return (
      <div ref="ctrllrl" className="ctrl-lrl-component component">
        <Navigator activeSettingTab={this.state.activeSettingTab} active={this.state.verticalIndex === 0} buttons={this.buttons} />
        <div className={`settings-component-container  ${this.state.verticalIndex === 1 ? 'selected' : ''}`}>
          {
            this.renderCtrlLrlComponent()
          }
        </div>
      </div>
    )
  }
}
export default CtrlLRL