import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './CtrlLRL.css'
import Navigator from '../../Settings/SettingsElements/Navigator'

import SoilType from './CtrlLRLComponents/SoilType/SoilType'
import Frequency from './CtrlLRLComponents/Frequency/Frequency'
import Distance from './CtrlLRLComponents/Distance/Distance'
import Depth from './CtrlLRLComponents/Depth/Depth'

import { DeviceContext } from '../../../Contexts/DeviceContext'

class CtrlLRL extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      activeSettingTab: 0,
      activeSettingTabName: 'soiltype',
      verticalIndex: true,

      selectedSoilType: 6 * 300
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
        if (tempActiveSettingTab > 0 && tempVerticalIndex)
          tempActiveSettingTab--
        else if (!tempVerticalIndex) {
          if (this.state.activeSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType - 1 })
          }
        }
        break
      case 'right':
        if (tempActiveSettingTab < this.buttons.length - 1 && tempVerticalIndex)
          tempActiveSettingTab++
        else if (!tempVerticalIndex) {
          if (this.state.activeSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType + 1 })
          }
        }
        break
      case 'down':
        if (tempVerticalIndex)
          tempVerticalIndex++
        else if (!tempVerticalIndex) {
          if (this.state.activeSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType + 2 })
          }
        }
        break
      case 'up':
        if (!tempVerticalIndex) {
          if (this.state.activeSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType - 2 })
          }
        }

        break
      case 'ok':

        return
      case 'back':
        if (tempVerticalIndex) {
          // çocuk yukarıda main menuye gidelim.
          this.props.navigateTo("menuScreen");
          return
        } else {
          //çocuk aşağıda, geri gitmiyoruz, çocuğu yukarı çıkarızyoruz.
          
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
        return <SoilType index={this.state.selectedSoilType} />
      case 1:
        return <Frequency />
      case 2:
        return <Distance />
      case 3:
        return <Depth />
      case 4:
        break
      default:
        break;
    }
  }

  render() {
    return (
      <div ref="ctrllrl" className="ctrl-lrl-component component">
        <Navigator activeSettingTab={this.state.activeSettingTab} active={this.state.verticalIndex} buttons={this.buttons} />
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