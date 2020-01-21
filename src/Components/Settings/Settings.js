import React, { Component } from 'react'
import Navigator from './SettingsElements/Navigator'
import socketHelper from '../../SocketHelper'
import './Settings.css'

import Power from './SettingsComponents/Power/Power'
import DateTime from './SettingsComponents/Datetime/DateTime'
import Security from './SettingsComponents/Security/Security'
import Reset from './SettingsComponents/Reset/Reset'
import Display from './SettingsComponents/Display/Display'
import Language from './SettingsComponents/Language/Language'
import Sound from './SettingsComponents/Sound/Sound'
import Info from './SettingsComponents/Info/Info'


class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSettingTab: 0,
      activeSettingTabName: 'power',
      verticalIndex: false
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

  exitChild = () => {
    this.setState({
      verticalIndex: false
    })
  }


  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempActiveSettingTab = this.state.activeSettingTab
    let tempVerticalIndex = this.state.verticalIndex
    switch (socketData.payload) {
      case 'left':
        if (tempActiveSettingTab > 0 && !this.state.verticalIndex)
          tempActiveSettingTab--
        break
      case 'right':
        if (tempActiveSettingTab < this.buttons.length - 1 && !this.state.verticalIndex)
          tempActiveSettingTab++
        break
      case 'down':
        tempVerticalIndex = true
        break
      case 'up':
        tempVerticalIndex = false
        break
      case 'ok':

        return
      case 'back':
        this.refs.settings.style.opacity = 0
        this.refs.settings.style.transform = "translateY(400px)"
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
      verticalIndex: tempVerticalIndex
    })
  }

  renderSettingsComponent = () => {
    switch (this.state.activeSettingTabName) {
      case 'power':
        return (<Power selected={this.state.verticalIndex} exit={this.exitChild} />)
      case 'datetime':
        return (<DateTime selected={this.state.verticalIndex} />)
      case 'security':
        return (<Security selected={this.state.verticalIndex} />)
      case 'reset':
        return (<Reset selected={this.state.verticalIndex} />)
      case 'display':
        return (<Display selected={this.state.verticalIndex} />)
      case 'language':
        return (<Language selected={this.state.verticalIndex} />)
      case 'sound':
        return (<Sound selected={this.state.verticalIndex} />)
      case 'info':
        return (<Info selected={this.state.verticalIndex} />)
      default:
        break;
    }
  }

  render() {
    return (
      <div ref="settings" className={`settings-component component `}>
        <Navigator activeSettingTab={this.state.activeSettingTab} buttons={this.buttons}></Navigator>
        <div className={`settings-component-container  ${this.state.verticalIndex ? 'selected' : ''}`}>
          {
            this.renderSettingsComponent()
          }
        </div>
      </div>
    )
  }
}

export default Settings