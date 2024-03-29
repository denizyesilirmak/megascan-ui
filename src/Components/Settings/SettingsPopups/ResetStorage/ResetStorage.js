import React, { Component } from 'react'
import { DeviceContext } from '../../../../Contexts/DeviceContext'
import socketHelper from '../../../../SocketHelper'

class ResetStorage extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      buttonIndex: 2 * 2500 + 1,
      progress: 0,
      popup: false,
      success: false
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.reset.style.transform = "scale(1)"
      this.refs.reset.style.opacity = 1
    }, 150);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    switch (socketData.payload) {
      case 'left':
        if (!this.state.popup) {
          this.setState({
            buttonIndex: this.state.buttonIndex + 1
          })
        }
        break
      case 'right':
        if (!this.state.popup) {
          this.setState({
            buttonIndex: this.state.buttonIndex - 1
          })
        }
        break
      case 'back':
        if (!this.state.popup) {
          this.props.navigateTo("settingsScreen", null, 3)
          return
        }
        break
      case 'ok':
        if (!this.state.popup && this.state.buttonIndex % 2 === 0) {
          this.setState({
            popup: true,
          })
          fetch('http://localhost:9090/deleteallfiles')
            .then(res => res.json())
            .then(data => {
              console.log(data)
              this.setState({
                progress: 80
              })

            })
          setTimeout(() => {
            this.setState({
              progress: 100
            })
          }, 2500);

          setTimeout(() => {
            this.props.navigateTo('settingsScreen')
          }, 7000);


        } else {
          this.props.navigateTo("settingsScreen")
        }
        break
      default:
        break
    }
  }

  render() {
    return (
      <div className="reset-factory component" ref="reset">

        {
          this.state.popup ?
            <div className="reset-preloader" style={{ background: this.context.theme.button_bg_selected }}>
              <div className="reseting-text">{this.context.strings['resetStorageProgress']}</div>
              <div className="reset-progress-bar-container" >
                <div className="reset-progress-bar" style={{ width: `${this.state.progress}%` }}></div>
              </div>
            </div> : null
        }

        <div className="reset-question">
          {this.context.strings['resetStorageQuestion']}
        </div>
        <div className="reset-answers">
          <div className="reset-button" style={{ background: this.state.buttonIndex % 2 === 0 ? this.context.theme.button_bg_selected : null }}>{this.context.strings['yes']}</div>
          <div className="reset-button" style={{ background: this.state.buttonIndex % 2 === 1 ? this.context.theme.button_bg_selected : null }}>{this.context.strings['no']}</div>
        </div>
      </div>
    )
  }
}
export default ResetStorage