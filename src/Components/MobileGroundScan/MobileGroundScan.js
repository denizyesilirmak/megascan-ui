import React, { Component } from 'react'
import './MobileGroundScan.css'
import socketHelper from '../../SocketHelper'
import { DeviceContext } from '../../Contexts/DeviceContext'
import TabletImage from '../../Assets/MenuIcons/mobile-app.png'


class MobileGroundScan extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.state = {
      line: 10,
      step: 10
    }
  }
  componentDidMount() {
    socketHelper.send('selam ')
  }

  mobile = (a) => {
    console.log("mobile channel")

  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    switch (socketData.payload) {
      case 'left':

        break
      case 'right':

        break
      case 'back':
        this.props.navigateTo("menuScreen")

        return
      default:
        break
    }
  }

  componentWillUnmount(){
    socketHelper.detachSpecial("mobile")
  }

  render() {
    return (
      <div className="mobile-ground-scan component">

        <div className="mgs-props">
          <div className="mgs-prop" style={{background: this.context.theme.button_bg_selected}}>
            <div className="title">Lines: </div>
            <div className="value">{this.state.line}</div>
          </div>
          <div className="mgs-prop" style={{background: this.context.theme.button_bg_selected}}>
            <div className="title">Steps: </div>
            <div className="value">{this.state.step}</div>
          </div>
          <div className="mgs-prop" style={{background: this.context.theme.button_bg_selected}}>
            <div className="title">Scan Path: </div>
            <div className="value">Alternate</div>
          </div>

          <div className="mgs-prop" style={{background: this.context.theme.button_bg_selected}}>
            <div className="title">Start Point: </div>
            <div className="value">Left</div>
          </div>

          <div className="mgs-prop" style={{background: this.context.theme.button_bg_selected}}>
            <div className="title">Scan Mode: </div>
            <div className="value">Auto</div>
          </div>
        </div>

        <img alt="tablet" className="tablet-image" src={TabletImage} />

      </div>
    )
  }
}
export default MobileGroundScan