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

import DatePopup from './SettingsPopups/Date/DatePopup'
import TimePopup from './SettingsPopups/Time/TimePopup'
import PinPopup from './SettingsPopups/Pin/PinPopup'


class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSettingTab: 0,
      activeSettingTabName: 'power',
      verticalIndex: false,
      subCursor: 0,
      activePopup: "",

      powersaver: false,
      pinlock: false,
      sleepmode: false,
      generalVolume: 50,
      keyToneVolume: 50,
      searchVolume: 50,
      brightness: 10,
      hour: 0,
      minute: 23,
      day: 1,
      month: 1,
      year: 2003,
      selectedTimeIndex: 0,
      selectedDateIndex: 0
    }

    this.buttons = [
      {
        name: "power",
        buttonCount: 1
      },
      {
        name: "datetime",
        buttonCount: 2
      },
      {
        name: "storage",
        buttonCount: 1
      },
      {
        name: "connection",
        buttonCount: 1
      },
      {
        name: "security",
        buttonCount: 2
      },
      {
        name: "reset",
        buttonCount: 3
      },
      {
        name: "display",
        buttonCount: 2
      },
      {
        name: "language",
        buttonCount: 1
      },
      {
        name: "sound",
        buttonCount: 3
      },
      {
        name: "info",
        buttonCount: 1
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
        if (tempActiveSettingTab > 0 && !this.state.verticalIndex) {
          this.setState({
            subCursor: 0
          })
          tempActiveSettingTab--
        }
        else if (this.state.activePopup === "time") {
          this.setState({
            selectedTimeIndex: this.state.selectedTimeIndex + 1
          })
        }
        break
      case 'right':
        if (tempActiveSettingTab < this.buttons.length - 1 && !this.state.verticalIndex) {
          this.setState({
            subCursor: 0
          })
          tempActiveSettingTab++
        }

        else if (this.state.activePopup === "time") {
          this.setState({
            selectedTimeIndex: this.state.selectedTimeIndex + 1
          })
        }
        break
      case 'down':
        if (this.state.verticalIndex && this.state.activePopup === "") {
          if (this.buttons[this.state.activeSettingTab].buttonCount - 1 > this.state.subCursor)
            this.setState({ subCursor: this.state.subCursor + 1 })
        }

        if (this.state.activePopup === "time" && this.state.selectedTimeIndex % 2 === 0 && this.state.hour > 0) {
          //change hour
          this.setState({
            hour: this.state.hour - 1
          })
        }
        else if (this.state.activePopup === "time" && this.state.selectedTimeIndex % 2 === 1 && this.state.minute > 0) {
          //change minutes
          this.setState({
            minute: this.state.minute - 1
          })
        }

        break
      case 'up':
        if (this.state.verticalIndex && this.state.activePopup === "") {
          if (this.state.subCursor > 0)
            this.setState({ subCursor: this.state.subCursor - 1 })
        }
        if (this.state.activePopup === "time" && this.state.selectedTimeIndex % 2 === 0 && this.state.hour < 23) {
          //change hour
          this.setState({
            hour: this.state.hour + 1
          })
        }
        else if (this.state.activePopup === "time" && this.state.selectedTimeIndex % 2 === 1 && this.state.minute < 59) {
          //change minutes
          this.setState({
            minute: this.state.minute + 1
          })
        }
        break
      case 'ok':
        if (this.state.verticalIndex === false && this.state.activePopup === "") {
          this.setState({ verticalIndex: true })
        } else {
          if (this.state.activeSettingTab === 0) {
            //POWER
            if (this.state.subCursor === 0) {
              //Power saver
              this.setState({ powersaver: !this.state.powersaver })
            }
          }

          else if (this.state.activeSettingTab === 1) {
            //Datetime
            if (this.state.subCursor === 0) {
              console.log("change date")
              this.setState({ activePopup: "date" })
            }
            else if (this.state.subCursor === 1) {
              console.log("change time")
              this.setState({ activePopup: "time" })
            }
          }

          else if (this.state.activeSettingTab === 4) {
            //security
            if (this.state.subCursor === 0) {
              console.log("pin on off")
              this.setState({ pinlock: !this.state.pinlock })
            }
            else if (this.state.subCursor === 1) {
              console.log("change time")
              this.setState({ activePopup: "pin" })
            }
          }


          else if (this.state.activeSettingTab === 6) {
            //security
            if (this.state.subCursor === 0) {
              console.log("sleep mode on offs")
              this.setState({ sleepmode: !this.state.sleepmode })
            }
          }
        }
        return
      case 'back':
        if (this.state.verticalIndex === true && this.state.activePopup === "") {
          this.setState({ verticalIndex: false })
        } else if (this.state.activePopup === "") {
          this.refs.settings.style.opacity = 0
          this.refs.settings.style.transform = "translateY(400px)"
          setTimeout(() => {
            socketHelper.detach()
            this.props.navigateTo("menuScreen")
          }, 500);
        }

        if (this.state.activePopup !== "") {
          this.setState({ activePopup: "" })
        }



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
        return (<Power selected={this.state.verticalIndex} on={this.state.powersaver} />)
      case 'datetime':
        return (<DateTime selected={this.state.verticalIndex} cursorY={this.state.subCursor} />)
      case 'security':
        return (<Security selected={this.state.verticalIndex} cursorY={this.state.subCursor} on={this.state.pinlock} />)
      case 'reset':
        return (<Reset selected={this.state.verticalIndex} cursorY={this.state.subCursor} />)
      case 'display':
        return (<Display selected={this.state.verticalIndex} cursorY={this.state.subCursor} brightness={this.state.brightness} on={this.state.sleepmode} />)
      case 'language':
        return (<Language selected={this.state.verticalIndex} />)
      case 'sound':
        return (<Sound selected={this.state.verticalIndex} cursorY={this.state.subCursor} />)
      case 'info':
        return (<Info selected={this.state.verticalIndex} />)
      default:
        break;
    }
  }

  renderPopup = (popup) => {
    switch (popup) {
      case "date":
        return <DatePopup day={this.state.day} month={this.state.month} year={this.state.year} />
      case "time":
        return <TimePopup index={this.state.selectedTimeIndex % 2} hour={this.state.hour} minute={this.state.minute} />
      case "pin":
        return <PinPopup />
      default:
        break;
    }
  }

  render() {
    return (
      <div ref="settings" className={`settings-component component `}>
        {
          this.renderPopup(this.state.activePopup)
        }
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