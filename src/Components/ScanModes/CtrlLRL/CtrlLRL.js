import React, { Component } from 'react'
import './CtrlLRL.css'
import Navigator from '../../Settings/SettingsElements/Navigator'

class CtrlLRL extends Component {

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

  renderCtrlLrlComponent = () => {
    switch (this.state.activeSettingTabName) {
      case "soiltype":
        break
      case "frequency":
        break
      case "distance":
        break
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
      <div className="ctrl-lrl-component component">
        <Navigator activeSettingTab={this.state.activeSettingTab} buttons={this.buttons} />
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