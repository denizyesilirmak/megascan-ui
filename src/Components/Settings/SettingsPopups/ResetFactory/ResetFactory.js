import React, { Component } from 'react'
import { DeviceContext } from '../../../../Contexts/DeviceContext'
import socketHelper from '../../../../SocketHelper'
import dbStorage from '../../../../DatabaseHelper'
import './ResetFactory.css'

class ResetFactory extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      buttonIndex: 2 * 2500 + 1,
      progress: 0,
      popup: false
    }
  }


  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.reset.style.transform = "scale(1)"
      this.refs.reset.style.opacity = 1
    }, 150);
  }

  handleKeyDown = async (socketData) => {
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
          await this.deleteAllFiles()
          await this.resetDbStorage()

          setTimeout(() => {
            this.setState({
              progress: 100
            })
          }, 600);

          setTimeout(() => {
            this.props.navigateTo('rebootScreen')
          }, 7000);
        } else {
          this.props.navigateTo("settingsScreen")
        }
        break
      default:
        break
    }
  }


  deleteAllFiles = async () => {
    fetch('http://localhost:9090/deleteallfiles')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          progress: 80
        })

      })
  }

  resetDbStorage = async () => {
    dbStorage.setItem({
      setupCompleted: false,
      pinlock: false,
      brightness: 100,
      generalVolume: 100,
      searchVolume: 100,
      keyToneVolume: 100,
      autolrl_depth: 10,
      autolrl_distance: 100,
      ctrllrl_depth: 0,
      ctrllrl_distance: 500,
      ctrllrl_frequency: 250,
      ctrllrl_soiltype: 18000,
      lang: 'en'
    })
  }

  render() {
    return (
      <div className="reset-factory component" ref="reset">

        {
          this.state.popup ?
            <div className="reset-preloader" style={{ background: this.context.theme.button_bg_selected }}>
              <div className="reseting-text">Resetting to factory settings, please wait...</div>
              <div className="reset-progress-bar-container" >
                <div className="reset-progress-bar" style={{ width: `${this.state.progress}%` }}></div>
              </div>
            </div> : null
        }

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