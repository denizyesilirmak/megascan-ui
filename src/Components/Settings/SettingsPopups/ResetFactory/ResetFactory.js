import React, { Component } from 'react'
import { DeviceContext } from '../../../../Contexts/DeviceContext'
import socketHelper from '../../../../SocketHelper'
import './ResetFactory.css'

class ResetFactory extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      buttonIndex: 2 * 2500 + 1
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    switch (socketData.payload) {
      case 'left':
        this.setState({
          buttonIndex: this.state.buttonIndex + 1
        })
        break
      case 'right':
        this.setState({
          buttonIndex: this.state.buttonIndex - 1
        })
        break
      case 'back':

        return
      default:
        break
    }
  }



  render() {
    return (
      <div className="reset-factory component">
        <div className="reset-question">
          Restoring factory settings resets all device settings and deletes saved files. Are you sure?
        </div>
        <div className="reset-answers">
          <div className="reset-button" style={{ background: this.state.buttonIndex % 2 === 0 ? this.context.theme.button_bg_selected : null }}>Yes</div>
          <div className="reset-button" style={{ background: this.state.buttonIndex % 2 === 1 ? this.context.theme.button_bg_selected : null }}>No</div>
        </div>
      </div>
    )
  }
}
export default ResetFactory