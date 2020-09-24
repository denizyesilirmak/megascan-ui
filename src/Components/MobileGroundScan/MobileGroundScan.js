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
      width: this.props.info.width || 0,
      height: this.props.info.height || 0,
      scanPath: this.props.info.scanPattern || "NONE",
      startPoint: this.props.info.startPoint || "NONE",
      scanMode: this.props.info.scanMode || 0,
      exitPopup: false,
      cursorIndex: true
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleSocketData)
  }


  handleSocketData = (socketData) => {
    if (socketData.type === "mobile") {
      // console.log(socketData)
      if (socketData.info)
        this.setState({
          width: socketData.info.width,
          height: socketData.info.height,
          scanPath: socketData.info.scanPattern,
          startPoint: socketData.info.startPoint,
          scanMode: socketData.info.scanMode
        })
      else if (socketData.payload === "exitGroundScanMenu") {
        console.log("çıkıyorum")
        this.props.navigateTo('menuScreen')
        return
      }
    }
    else if (socketData.type === "button") {
      switch (socketData.payload) {
        case "left":
          this.setState({
            cursorIndex: !this.state.cursorIndex
          })
          break;
        case "right":
          this.setState({
            cursorIndex: !this.state.cursorIndex
          })
          break;
        case "back":
          if (this.state.exitPopup) {
            this.setState({ exitPopup: false })
          }else{
            this.setState({ exitPopup: true })
          }
          break;
        case "ok":
          if (this.state.exitPopup) {
            if(this.state.cursorIndex){
              this.props.navigateTo("menuScreen")
              return
            }else{
              this.setState({
                exitPopup: false
              })
            }
          }
          return;

        default:
          break;
      }
    }
  }

  componentWillUnmount() {
    socketHelper.detachSpecial("mobile")
  }

  renderExitPopup = () => {
    return (
      <div className="exit-popup-container">
        <div className="exit-popup">
          <div className="question">
            Do you really want to exit Mobile Ground Scan Mode?
          </div>
          <div className="exit-buttons">
            <div className="exit-button" style={{ background: this.state.cursorIndex ? this.context.theme.button_bg_selected : 'black' }}>
              Yes
            </div>
            <div className="exit-button" style={{ background: !this.state.cursorIndex ? this.context.theme.button_bg_selected : 'black' }}>
              No
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="mobile-ground-scan component">

        {
          this.state.exitPopup ? this.renderExitPopup() : null
        }


        <div className="mgs-props">
          <div className="mgs-prop" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="title">Width: </div>
            <div className="value">{this.state.width}</div>
          </div>
          <div className="mgs-prop" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="title">Height: </div>
            <div className="value">{this.state.height}</div>
          </div>
          <div className="mgs-prop" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="title">Scan Path: </div>
            <div className="value">{this.state.scanPath}</div>
          </div>

          <div className="mgs-prop" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="title">Start Point: </div>
            <div className="value">{this.state.startPoint}</div>
          </div>

          <div className="mgs-prop" style={{ background: this.context.theme.button_bg_selected }}>
            <div className="title">Scan Mode: </div>
            <div className="value">{this.state.scanMode}</div>
          </div>
        </div>

        <img alt="tablet" className="tablet-image" src={TabletImage} />




      </div>
    )
  }
}
export default MobileGroundScan