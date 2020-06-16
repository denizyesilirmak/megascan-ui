import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './CtrlLRL.css'
import Navigator from '../../Settings/SettingsElements/Navigator'

import SoilType from './CtrlLRLComponents/SoilType/SoilType'
import Frequency from './CtrlLRLComponents/Frequency/Frequency'
import Distance from './CtrlLRLComponents/Distance/Distance'

import { DeviceContext } from '../../../Contexts/DeviceContext'

class CtrlLRL extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      activeSettingTab: 0,
      activeSettingTabName: 'soiltype',
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
        this.refs.ctrllrl.style.transform = "translateY(200px)"
        this.refs.ctrllrl.style.opacity = 0
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
        return <SoilType />
      case "frequency":
        return <Frequency />
      case "distance":
        return <Distance />
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
        <div className={`settings-component-container`}
          style={{ borderColor: this.context.theme.border_color, boxShadow: this.state.verticalIndex ? this.context.theme.settings_shadow : 'none'  }}
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