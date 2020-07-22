import React, { Component } from 'react'
import './MobileGroundScan.css'
import socketHelper from '../../SocketHelper'

class MobileGroundScan extends Component {
  constructor(props) {
    super(props)

    this.state = {
      line: 10,
      step: 10
    }
  }
  componentDidMount() {
    socketHelper.attachSpecial("mobile", this.mobile)
    socketHelper.attach(this.handleKeyDown)
    console.log("aa")
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
          <div className="mgs-prop">
            <div className="title">Lines: </div>
            <div className="value">{this.state.line}</div>
          </div>
          <div className="mgs-prop">
            <div className="title">Steps: </div>
            <div className="value">{this.state.step}</div>
          </div>
          <div className="mgs-prop">
            <div className="title">Scan Path: </div>
            <div className="value">Alternate</div>
          </div>

          <div className="mgs-prop">
            <div className="title">Start Point: </div>
            <div className="value">Left</div>
          </div>

          <div className="mgs-prop">
            <div className="title">Scan Mode: </div>
            <div className="value">Auto</div>
          </div>
        </div>

      </div>
    )
  }
}
export default MobileGroundScan