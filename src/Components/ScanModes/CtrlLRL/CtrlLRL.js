import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import './CtrlLRL.css'
import Navigator from '../../Settings/SettingsElements/Navigator'

import SoilType from './CtrlLRLComponents/SoilType/SoilType'
import Frequency from './CtrlLRLComponents/Frequency/Frequency'
import Distance from './CtrlLRLComponents/Distance/Distance'
import Depth from './CtrlLRLComponents/Depth/Depth'
import Search from './CtrlLRLComponents/Search/Search'

import DatabaseHelper from '../../../DatabaseHelper'

import { DeviceContext } from '../../../Contexts/DeviceContext'

const DISTANCEMAX = 3000
const DISTANCEMIN = 250
const DISTANCESTEP = 50
const DISTANCEJUMPSTEP = 250

const DEPTHMAX = 50
const DEPTHMIN = 0
const DEPTHSTEP = 1
const DEPTHJUMPSTEP = 10

const FREQUENCYMAX = 18000
const FREQUENCYMIN = 250
const FREQUENCYSTEP = 250
const FREQUENCYJUMPSTEP = 1000

class CtrlLRL extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      activeSettingTab: 0,
      activeSettingTabName: 'soiltype',
      verticalIndex: true,

      selectedSoilType: 6 * 3000,
      frequency: 500,
      depth: 10,
      distance: 1000
    }


    DatabaseHelper.getAll()
      .then(lastState => {
        this.setState({
          selectedSoilType: lastState.ctrllrl_soiltype || 6 * 3000,
          frequency: lastState.ctrllrl_frequency || 500,
          depth: lastState.ctrllrl_depth || 10,
          distance: lastState.ctrllrl_distance || 1000
        })
      })

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

  clamp = (value, min, max) => {
    if (value <= min) {
      return min
    }
    if (value >= max) {
      return max
    }
    else return value
  }

  saveToDb = () => {
    DatabaseHelper.setItem({
      "ctrllrl_soiltype": this.state.selectedSoilType,
      "ctrllrl_frequency": this.state.frequency,
      "ctrllrl_distance": this.state.distance,
      "ctrllrl_depth": this.state.depth
    })
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
            this.setState({ selectedSoilType: this.state.selectedSoilType - 1 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ frequency: this.clamp(this.state.frequency - FREQUENCYSTEP, FREQUENCYMIN, FREQUENCYMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ distance: this.clamp(this.state.distance - DISTANCESTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 3) {
            this.setState({ depth: this.clamp(this.state.depth - DEPTHSTEP, DEPTHMIN, DEPTHMAX) })
          }
        }
        break
      case 'right':
        if (tempActiveSettingTab < this.buttons.length - 1 && tempVerticalIndex)
          tempActiveSettingTab++
        else if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType + 1 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ frequency: this.clamp(this.state.frequency + FREQUENCYSTEP, FREQUENCYMIN, FREQUENCYMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ distance: this.clamp(this.state.distance + DISTANCESTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 3) {
            this.setState({ depth: this.clamp(this.state.depth + DEPTHSTEP, DEPTHMIN, DEPTHMAX) })
          }
        }
        break
      case 'down':
        if (tempVerticalIndex)
          tempVerticalIndex++
        else if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType + 3 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ frequency: this.clamp(this.state.frequency - FREQUENCYJUMPSTEP, FREQUENCYMIN, FREQUENCYMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ distance: this.clamp(this.state.distance - DISTANCEJUMPSTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 3) {
            this.setState({ depth: this.clamp(this.state.depth - DEPTHJUMPSTEP, DEPTHMIN, DEPTHMAX) })
          }
        }
        break
      case 'up':
        if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType - 3 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ frequency: this.clamp(this.state.frequency + FREQUENCYJUMPSTEP, FREQUENCYMIN, FREQUENCYMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ distance: this.clamp(this.state.distance + DISTANCEJUMPSTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 3) {
            this.setState({ depth: this.clamp(this.state.depth + DEPTHJUMPSTEP, DEPTHMIN, DEPTHMAX) })
          }
        }

        break
      case 'ok':
        if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 4) {
            socketHelper.send(JSON.stringify({
              type: 'settings',
              mode: 'frequency',
              payload: 'fr.' + this.state.frequency
            }))
            this.saveToDb()
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
        return <SoilType index={this.state.selectedSoilType} />
      case 1:
        return <Frequency hertz={this.state.frequency} />
      case 2:
        return <Distance value={this.state.distance} />
      case 3:
        return <Depth value={this.state.depth} />
      case 4:
        return <Search
          active={!this.state.verticalIndex && this.state.activeSettingTab === 4}
          soiltype={this.state.selectedSoilType}
          distance={this.state.distance}
          frequency={this.state.frequency}
          depth={this.state.depth}
        />
      default:
        break;
    }
  }

  render() {
    return (
      <div ref="ctrllrl" className="ctrl-lrl-component component">
        <Navigator last={4} activeSettingTab={this.state.activeSettingTab} active={this.state.verticalIndex} buttons={this.buttons} />
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