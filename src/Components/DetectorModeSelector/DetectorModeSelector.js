import React from 'react'
import './DetectorModeSelector.css'
import SocketHelper from '../../SocketHelper'

import PulseIcon from '../../Assets/MenuIcons/mainmenu/pulse.png'
import VlfIcon from '../../Assets/MenuIcons/mainmenu/vlf.png'
import PS25Icon from '../../Assets/MenuIcons/mainmenu/ps28.png'
import PS36Icon from '../../Assets/MenuIcons/mainmenu/ps36.png'


import IndicatorIcon from '../../Assets/MenuIcons/button-indicator.png'
import { DeviceContext } from '../../Contexts/DeviceContext'

class DetectorModeSelector extends React.Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.domref = React.createRef()

    this.state = {
      cursor: 1
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    setTimeout(() => {
      this.domref.current.style.transform = "scale(1)"
      this.domref.current.style.opacity = 1
    }, 100)
  }

  componentWillUnmount() {
    SocketHelper.detach(this.handleSocket)
  }

  handleSocket = (socketData) => {
    if (socketData.type !== 'button') {
      return
    }
    switch (socketData.payload) {
      case 'left':
        if (this.state.cursor > 0) {
          this.setState({ cursor: this.state.cursor - 1 })
        }
        break
      case 'right':
        if (this.state.cursor < 1) {
          this.setState({ cursor: this.state.cursor + 1 })
        }
        break
      case 'ok':
        if (this.state.cursor === 0) {

          this.props.navigateTo('pulse2Screen')
        }
        else if (this.state.cursor === 1) {
          this.props.navigateTo('nuggetScanScreen')
        }
        else if (this.state.cursor === 2) {
        }
        return
      case 'back':
        this.props.navigateTo('menuScreen')
        return

      default:
        break
    }
  }

  render() {
    return (
      <div className="detector-mode-selector component">
        <div className="detector-modes" ref={this.domref}>
          {/* <div className="detector-mode">
            <div className="detector-mode-icon-holder">
              <img src={IndicatorIcon} alt="indicator" className="detector-mode-indicator" style={{ display: this.state.cursor === 0 ? 'block' : 'none' }} />
              <img src={PulseIcon} alt="dms" />
            </div>
            <div className="detector-mode-title">
              {this.context.strings['detectorMode1']}
            </div>
          </div> */}

          <div className="detector-mode">
            <div className="detector-mode-icon-holder">
              <img src={IndicatorIcon} alt="indicator" className="detector-mode-indicator" style={{ display: this.state.cursor === 0 ? 'block' : 'none' }} />
              <img src={PS36Icon} alt="dms" />
            </div>
            <div className="detector-mode-title">
              {this.context.strings['detectorMode2']}

            </div>
          </div>

          <div className="detector-mode">
            <div className="detector-mode-icon-holder">
              <img src={IndicatorIcon} alt="indicator" className="detector-mode-indicator" style={{ display: this.state.cursor === 1 ? 'block' : 'none' }} />
              <img src={PS25Icon} alt="dms" />
            </div>
            <div className="detector-mode-title">
              {this.context.strings['detectorMode3']}

            </div>
          </div>
        </div>

        <div className="detector-mode-selector-info">
          <span style={{ display: this.state.cursor === 0 ? 'inline' : 'none' }}>{this.context.strings['detectorMode2Desc']}</span>
          <span style={{ display: this.state.cursor === 1 ? 'inline' : 'none' }}>{this.context.strings['detectorMode3Desc']}</span>
        </div>


      </div>
    )
  }
}

export default DetectorModeSelector