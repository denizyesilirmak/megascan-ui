import React, { Component } from 'react'
import Navigator from './SettingsElements/Navigator'
import SocketHelper from '../../SocketHelper'
import './Settings.css'

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSettingTab: 0
    }

    this.buttons = [
      {
        name: "Power"
      },
      {
        name: "Time & Date"
      },
      {
        name: "Storage"
      },
      {
        name: "Connection"
      },
      {
        name: "Security"
      },
      {
        name: "Reset"
      },
      {
        name: "Display"
      },
      {
        name: "Language"
      },
      {
        name: "Sound"
      },
      {
        name: "Info"
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

    this.setState({
      activeSettingTab: tempActiveSettingTab
    })
  }

  render() {
    return (
      <div className="settings-component component">
        <Navigator activeSettingTab={this.state.activeSettingTab} buttons={this.buttons}></Navigator>
        <SocketHelper ref="socket" onMessage={this.handleKeyDown} />
      </div>
    )
  }
}

export default Settings