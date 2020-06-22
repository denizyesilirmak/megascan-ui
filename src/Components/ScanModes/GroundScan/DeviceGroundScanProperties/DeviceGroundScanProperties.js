import React, { Component } from 'react'
import './DeviceGroundScanProperties.css'
import socketHelper from '../../../../SocketHelper'

import TabLeftArrow from '../../../../Assets/MenuIcons/left-arrow2.png'
import TabRightArrow from '../../../../Assets/MenuIcons/right-arrow2.png'

import ManualIcon from '../../../../Assets/MenuIcons/menu-icon-manual-scan.png'
import AutomaticIcon from '../../../../Assets/MenuIcons/menu-icon-automatic-scan.png'
import AlternateIcon from '../../../../Assets/MenuIcons/m-alternative-scan.png'
import OneDirectionIcon from '../../../../Assets/MenuIcons/m-one-direction-scan.png'
import LeftStartPointIcon from '../../../../Assets/MenuIcons/menu-icon-left.png'
import RightStartPointIcon from '../../../../Assets/MenuIcons/menu-icon-right.png'

import upArrow from '../../../../Assets/MenuIcons/up-arrow.png'
import downArrow from '../../../../Assets/MenuIcons/down-arrow.png'

import MiniCarousel from '../MiniCarousel/MiniCarousel'

import dbStorage from '../../../../DatabaseHelper'
import { DeviceContext } from '../../../../Contexts/DeviceContext'

const MAXSTEPS = 20
const MAXLINES = 10

class DeviceGroundScanProperties extends Component {
  static contextType = DeviceContext

  constructor(props) {
    super(props)

    this.scanModeButtons = [
      {
        name: "manual",
        icon: ManualIcon
      },
      {
        name: "automatic",
        icon: AutomaticIcon
      }
    ]

    this.scanPathButtons = [
      {
        name: "alternative",
        icon: AlternateIcon
      },
      {
        name: "onedirection",
        icon: OneDirectionIcon
      }
    ]

    this.startPointButtons = [
      {
        name: "left",
        icon: LeftStartPointIcon
      },
      {
        name: "right",
        icon: RightStartPointIcon
      }
    ]

    this.state = {
      activeTabIndex: 4 * 2000 + 0,
      scanModeIndex: 2 * 2000,
      scanPathIndex: 2 * 2000,
      startPointIndex: 2 * 2000,
      scanStepIndex: 2 * 2000,
      verticalTabIndex: true, //true top, false bottom
      lines: 10,
      steps: 10
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    dbStorage.getAll()
      .then(e => {
        this.setState({
          scanModeIndex: e.gs_modeIndex || 2 * 2000,
          scanPathIndex: e.gs_pathIndex || 2 * 2000,
          startPointIndex: e.gs_pointIndex || 2 * 2000,
          lines: e.gs_lines || 10,
          steps: e.gs_steps || 10
        })
      })
  }


  savePropertiesState = async () => {
    dbStorage.setItem({
      gs_modeIndex: this.state.scanModeIndex,
      gs_pathIndex: this.state.scanPathIndex,
      gs_pointIndex: this.state.startPointIndex,
      gs_lines: this.state.lines,
      gs_steps: this.state.steps
    })
  }


  renderTabContent = () => {
    switch (this.state.activeTabIndex % 5) {
      case 0:
        return (
          <div className="dgsp-content">
            <MiniCarousel buttons={this.scanModeButtons} selectedButtonIndex={this.state.scanModeIndex % 2} active={!this.state.verticalTabIndex}></MiniCarousel>
          </div>
        )
      case 1:
        return (
          <div className="dgsp-content">
            <MiniCarousel buttons={this.scanPathButtons} selectedButtonIndex={this.state.scanPathIndex % 2} active={!this.state.verticalTabIndex}></MiniCarousel>
          </div>
        )
      case 2:
        return (
          <div className="dgsp-content scan-step-content">
            <div style={{boxShadow: this.state.scanStepIndex % 2 === 0 && !this.state.verticalTabIndex ? this.context.theme.settings_shadow : null, background: this.state.scanStepIndex % 2 === 0 && !this.state.verticalTabIndex ? this.context.theme.background3 : null}} className={`scan-step-selector`}>
              <img style={{filter: this.context.theme.arrorHueRotation}} src={upArrow} alt="column"></img>
              <div className="scan-step-value">{this.state.lines}</div>
              <img style={{filter: this.context.theme.arrorHueRotation}}  className="down-scan-step" src={downArrow} alt="column"></img>
              <div className="scan-step-label">Lines</div>
            </div>

            <div style={{boxShadow: this.state.scanStepIndex % 2 === 1 && !this.state.verticalTabIndex ? this.context.theme.settings_shadow : null, background: this.state.scanStepIndex % 2 === 1 && !this.state.verticalTabIndex ? this.context.theme.background3 : null}}  className={`scan-step-selector `}>
              <img style={{filter: this.context.theme.arrorHueRotation}} src={upArrow} alt="column"></img>
              <div className="scan-step-value">{this.state.steps}</div>
              <img style={{filter: this.context.theme.arrorHueRotation}}  className="down-scan-step" src={downArrow} alt="column"></img>
              <div className="scan-step-label">Steps</div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="dgsp-content">
            <MiniCarousel buttons={this.startPointButtons} selectedButtonIndex={this.state.startPointIndex % 2} active={!this.state.verticalTabIndex}></MiniCarousel>
          </div>
        )

      case 4:
        return (
          <div className="dgsp-content">
            <div className="summary-tab">
              <div className="summary-table">

                <div className="summary-prop" style={{ borderColor: this.context.theme.background2 }}>
                  <div className="summary-label" style={{ background: this.context.theme.button_bg_selected, borderBottomColor: this.context.theme.background2 }}>
                    Mode
                  </div>
                  <div className="summary-value">
                    {this.state.scanModeIndex % 2 === 0 ? "Auto" : "Manual"}
                  </div>
                </div>

                <div className="summary-prop" style={{ borderColor: this.context.theme.background2 }}>
                  <div className="summary-label" style={{ background: this.context.theme.button_bg_selected, borderBottomColor: this.context.theme.background2 }}>
                    Path
                  </div>
                  <div className="summary-value">
                    {this.state.scanPathIndex % 2 === 0 ? "Alternative" : "One Direction"}
                  </div>
                </div>

                <div className="summary-prop" style={{ borderColor: this.context.theme.background2 }}>
                  <div className="summary-label" style={{ background: this.context.theme.button_bg_selected, borderBottomColor: this.context.theme.background2 }}>
                    Size
                  </div>
                  <div className="summary-value">
                    {this.state.lines} x {this.state.steps}
                  </div>
                </div>

                <div className="summary-prop" style={{ borderColor: this.context.theme.background2 }}>
                  <div className="summary-label" style={{ background: this.context.theme.button_bg_selected, borderBottomColor: this.context.theme.background2 }}>
                    Start Point
                  </div>
                  <div className="summary-value">
                    {this.state.startPointIndex % 2 === 0 ? "Left" : "Right"}
                  </div>
                </div>


              </div>

              <div className="scan-start">PRESS OK TO START SCAN</div>
            </div>
          </div>
        )

      default:
        break;
    }
  }

  handleKeyDown = (socketData) => {
    if (socketData.type === 'button') {
      let tmpActiveTabIndex = this.state.activeTabIndex
      switch (socketData.payload) {
        case 'left':
          if (this.state.verticalTabIndex) {
            this.setState({
              activeTabIndex: tmpActiveTabIndex - 1
            })
          } else {
            if (this.state.activeTabIndex % 4 === 0) {
              this.setState({
                scanModeIndex: this.state.scanModeIndex - 1
              })
            }
            else if (this.state.activeTabIndex % 4 === 1) {
              this.setState({
                scanPathIndex: this.state.scanPathIndex - 1
              })
            }
            else if (this.state.activeTabIndex % 4 === 2) {
              this.setState({
                scanStepIndex: this.state.scanStepIndex - 1
              })
            }
            else if (this.state.activeTabIndex % 4 === 3) {
              this.setState({
                startPointIndex: this.state.startPointIndex - 1
              })
            }
          }
          break
        case 'right':
          if (this.state.verticalTabIndex) {
            this.setState({
              activeTabIndex: tmpActiveTabIndex + 1
            })
          } else {
            if (this.state.activeTabIndex % 4 === 0) {
              this.setState({
                scanModeIndex: this.state.scanModeIndex + 1
              })
            }
            else if (this.state.activeTabIndex % 4 === 1) {
              this.setState({
                scanPathIndex: this.state.scanPathIndex + 1
              })
            }
            else if (this.state.activeTabIndex % 4 === 2) {
              this.setState({
                scanStepIndex: this.state.scanStepIndex + 1
              })
            }
            else if (this.state.activeTabIndex % 4 === 3) {
              this.setState({
                startPointIndex: this.state.startPointIndex + 1
              })
            }
          }
          break
        case 'down':
          if (this.state.verticalTabIndex === false && this.state.activeTabIndex % 5 === 2) {
            if (this.state.scanStepIndex % 2 === 0) {
              if (this.state.lines > 2) {
                this.setState({
                  lines: this.state.lines - 1
                })
              }
            }
            if (this.state.scanStepIndex % 2 === 1) {
              if (this.state.steps > 2) {
                this.setState({
                  steps: this.state.steps - 1
                })
              }
            }
          }
          break
        case 'up':
          if (this.state.verticalTabIndex === false && this.state.activeTabIndex % 5 === 2) {
            if (this.state.scanStepIndex % 2 === 0) {
              if (this.state.lines < MAXLINES) {
                this.setState({
                  lines: this.state.lines + 1
                })
              }
            }
            if (this.state.scanStepIndex % 2 === 1) {
              if (this.state.steps < MAXSTEPS) {
                this.setState({
                  steps: this.state.steps + 1
                })
              }
            }
          }
          break
        case 'ok':
          if (this.state.activeTabIndex % 5 !== 4) {
            //active tab start sekmesinde değil. dolayısıyla aşağı in
            this.setState({
              verticalTabIndex: !this.state.verticalTabIndex
            })
          } else {
            //active tab start sekmesinde. taramaya başla
            //generate scan properties object
            let scanProperties = {
              mode: this.state.scanModeIndex % 2 === 0 ? "auto" : "manual",
              path: this.state.scanPathIndex % 2 === 0 ? "zigzag" : "parallel",
              lines: this.state.lines,
              steps: this.state.steps,
              startPoint: this.state.startPointIndex % 2 === 0 ? "left" : "right"
            }
            this.savePropertiesState()
            // console.log("Scan Properties: ", scanProperties)
            this.props.setScanProperties(scanProperties)
            this.props.navigateTo("scanScreen")
          }

          return
        case 'back':
          clearInterval(this.testInterval)
          if (this.state.verticalTabIndex) {
            this.props.navigateTo("menuScreen")
          } else {
            this.setState({
              verticalTabIndex: true
            })
          }

          return
        default:
          break
      }
    }
  }

  render() {
    return (
      <div ref="dgsp" className="device-ground-scan-properties component">
        <div className="dgsp-tabs">
          <img alt="left" src={TabLeftArrow}  style={{filter: this.context.theme.arrorHueRotation }}/>
          <div className={`dgsp-tab`}
            style={{
              background: this.state.activeTabIndex % 5 === 0 ? this.context.theme.button_bg_selected : "black",
              borderColor: this.context.theme.background3
            }}
          >
            Mode
            </div>
          <div className={`dgsp-tab`}
            style={{
              background: this.state.activeTabIndex % 5 === 1 ? this.context.theme.button_bg_selected : "black",
              borderColor: this.context.theme.background3
            }}
          >
            Path
            </div>
          <div className={`dgsp-tab`}
            style={{
              background: this.state.activeTabIndex % 5 === 2 ? this.context.theme.button_bg_selected : "black",
              borderColor: this.context.theme.background3
            }}
          >
            Size
            </div>
          <div className={`dgsp-tab`}
            style={{
              background: this.state.activeTabIndex % 5 === 3 ? this.context.theme.button_bg_selected : "black",
              borderColor: this.context.theme.background3
            }}
          >
            Start Point
            </div>
          <div className={`dgsp-tab`}
            style={{
              background: this.state.activeTabIndex % 5 === 4 ? this.context.theme.button_bg_selected : "black",
              borderColor: this.context.theme.background3
            }}
          >Scan</div>
          <img alt="left" src={TabRightArrow}  style={{filter: this.context.theme.arrorHueRotation }}/>
        </div>
        {
          this.renderTabContent()
        }
      </div>
    )
  }
}

export default DeviceGroundScanProperties