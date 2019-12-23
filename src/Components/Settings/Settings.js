import React, { Component } from 'react'
import Navigator from './SettingsElements/Navigator'
import socketHelper from '../../SocketHelper'
import './Settings.css'

import Power from './SettingsComponents/Power/Power'
import Datetime from './SettingsComponents/Datetime/Datetime'
import Security from "./SettingsComponents/Security/Security";
import Display from './SettingsComponents/Display/Display'
import Info from './SettingsComponents/Info/Info'
import Reset from './SettingsComponents/Reset/Reset'
import Language from './SettingsComponents/Language/Language'

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSettingTab: 0,
      activeSettingTabName: 'power',
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

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.settings.style.opacity = 1
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
        this.refs.settings.style.opacity = 0
        this.refs.settings.style.transform = "translateY(200px)"
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

  renderSettingsComponent = () => {
    switch (this.state.activeSettingTabName) {
      case 'power':
        return (<Power />)
      case 'datetime':
        return (<Datetime />)
      case 'security':
        return (<Security />)
      case 'display':
        return (<Display />)
      case 'info':
        return (<Info />)
      case 'language':
        return (<Language />)
      case 'reset':
        return (<Reset />)
      default:
        break;
    }
  }

  render() {
    return (
      <div ref="settings" className={`settings-component component `}>
        <Navigator activeSettingTab={this.state.activeSettingTab} buttons={this.buttons}></Navigator>
        <div className={`settings-component-container  ${this.state.verticalIndex === 1 ? 'selected' : ''}`}>
          {
            this.renderSettingsComponent()
          }
        </div>
      </div>
    )
  }
}

export default Settings