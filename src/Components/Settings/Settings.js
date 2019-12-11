import React, { Component } from 'react'
import Navigator from './SettingsElements/Navigator'
import SocketHelper from '../../SocketHelper'
import './Settings.css'

import Power from './SettingsComponents/Power/Power'
import Datetime from './SettingsComponents/Datetime/Datetime'

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSettingTab: 0,
      activeSettingTabName: 'datetime',
      verticalIndex: 0
    }

    this.buttons = [
      {
        name: "power"
      },
      {
        name: "datetime"
      },
      {
        name: "storage"
      },
      {
        name: "connection"
      },
      {
        name: "security"
      },
      {
        name: "reset"
      },
      {
        name: "display"
      },
      {
        name: "language"
      },
      {
        name: "sound"
      },
      {
        name: "info"
      },
    ]
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempActiveSettingTab = this.state.activeSettingTab
    switch (socketData.payload) {
      case 'left':
        if (tempActiveSettingTab > 0)
          tempActiveSettingTab--
        break
      case 'right':
        if (tempActiveSettingTab < this.buttons.length - 1)
          tempActiveSettingTab++
        break
      case 'ok':

        return
      case 'back':

        return
      default:
        break
    }

    let activeTabName = this.buttons[tempActiveSettingTab]

    this.setState({
      activeSettingTab: tempActiveSettingTab,
      activeSettingTabName: activeTabName.name
    })
  }

  renderSettingsComponent = () => {
    switch (this.state.activeSettingTabName) {
      case 'power':
        return (<Power />)
      case 'datetime':
        return (<Datetime />)
      default:
        break;
    }
  }

  render() {
    return (
      <div className="settings-component component">
        <Navigator activeSettingTab={this.state.activeSettingTab} buttons={this.buttons}></Navigator>
        <div className="settings-component-container">
          {

            this.renderSettingsComponent()
          }
        </div>
        <SocketHelper ref="socket" onMessage={this.handleKeyDown} />
      </div>
    )
  }
}

export default Settings