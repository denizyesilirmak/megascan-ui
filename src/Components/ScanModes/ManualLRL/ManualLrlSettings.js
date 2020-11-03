import React, { Component } from 'react'
import socketHelper from '../../../SocketHelper'
import '../CtrlLRL/CtrlLRL.css'
import Navigator from '../../Settings/SettingsElements/Navigator'


import Distance from '../CtrlLRL/CtrlLRLComponents/Distance/Distance'
import Depth from '../CtrlLRL/CtrlLRLComponents/Depth/Depth'
import Target from './ManualLRLComponents/Target/Target'
import Search from './ManualLRLComponents/Search/Search'

import DatabaseHelper from '../../../DatabaseHelper'

import { DeviceContext } from '../../../Contexts/DeviceContext'

const DISTANCEMAX = 2500
const DISTANCEMIN = 250
const DISTANCESTEP = 50
const DISTANCEJUMPSTEP = 250

const DEPTHMAX = 50
const DEPTHMIN = 0
const DEPTHSTEP = 1
const DEPTHJUMPSTEP = 10

const FREQUENCY_LIST = [
  11300, //bronze
  700, //cavity
  11700, //copper
  12700, //diamond
  13000, //gemstone
  5200, //goldore
  4700, //goldtreasure
  5500, //goldveins
  17000, //iron
  13500, //platinum
  8700  //silver
]


class CtrlLRL extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      activeSettingTab: 0,
      activeSettingTabName: 'target',
      verticalIndex: true,
      depth: 10,
      distance: 1000,
      targets: 0
    }

    DatabaseHelper.getAll()
      .then(lastState => {
        this.setState({
          targets: lastState.manuallrl_targets || 0,
          distance: lastState.manuallrl_distance || 500,
          depth: lastState.manuallrl_depth || 10
        })
      })

    this.buttons = [
      {
        name: "target"
      },
      {
        name: "distance"
      },
      {
        name: "depth"
      },
      {
        name: "scan"
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
      "manuallrl_targets": this.state.targets,
      "manuallrl_distance": this.state.distance,
      "manuallrl_depth": this.state.depth
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
            if (this.state.targets > 0)
              this.setState({ targets: this.state.targets - 1 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ distance: this.clamp(this.state.distance - DISTANCESTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ depth: this.clamp(this.state.depth - DEPTHSTEP, DEPTHMIN, DEPTHMAX) })
          }
        }
        break
      case 'right':
        if (tempActiveSettingTab < this.buttons.length - 1 && tempVerticalIndex)
          tempActiveSettingTab++
        else if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            if (this.state.targets < 10)
              this.setState({ targets: this.state.targets + 1 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ distance: this.clamp(this.state.distance + DISTANCESTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ depth: this.clamp(this.state.depth + DEPTHSTEP, DEPTHMIN, DEPTHMAX) })
          }
        }
        break
      case 'down':
        if (tempVerticalIndex)
          tempVerticalIndex++
        else if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType + 2 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ distance: this.clamp(this.state.distance - DISTANCEJUMPSTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ depth: this.clamp(this.state.depth - DEPTHJUMPSTEP, DEPTHMIN, DEPTHMAX) })
          }

        }
        break
      case 'up':
        if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 0) {
            this.setState({ selectedSoilType: this.state.selectedSoilType - 2 })
          }
          else if (tempActiveSettingTab === 1) {
            this.setState({ distance: this.clamp(this.state.distance + DISTANCEJUMPSTEP, DISTANCEMIN, DISTANCEMAX) })
          }
          else if (tempActiveSettingTab === 2) {
            this.setState({ depth: this.clamp(this.state.depth + DEPTHJUMPSTEP, DEPTHMIN, DEPTHMAX) })
          }
        }

        break
      case 'ok':
        if (!tempVerticalIndex) {
          if (tempActiveSettingTab === 3) {
            socketHelper.send(JSON.stringify({
              type: 'settings',
              mode: 'frequency',
              payload: 'fr.' + FREQUENCY_LIST[this.state.targets % 11]
            }))
            this.saveToDb()
            this.props.navigateTo('manualLRLScreen')
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
        return <Target index={this.state.targets % 11} />
      case 1:
        return <Distance value={this.state.distance} />
      case 2:
        return <Depth value={this.state.depth} />
      case 3:
        return <Search
          active={!this.state.verticalIndex && this.state.activeSettingTab === 3}
          target={this.state.targets % 11}
          distance={this.state.distance}
          depth={this.state.depth}
        />
      default:
        break;
    }
  }

  render() {
    return (
      <div ref="ctrllrl" className="ctrl-lrl-component component">
        <Navigator arrowsAlwaysOn={false} last={3} activeSettingTab={this.state.activeSettingTab} active={this.state.verticalIndex} buttons={this.buttons} />
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