import React, { Component } from 'react'
import SetttingsItem from '../../SettingsElements/SettingsItem'
import './Power.css'
import PowerIcon from '../../../../Assets/MenuIcons/battery.svg'
import socketHelper from '../../../../SocketHelper'

class PowerSettings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      powersaver: false
    }

  }

  componentDidMount() {
  }

  componentDidUpdate() {
    if (this.props.selected) {
      socketHelper.attach(this.handleKeyDown)
    } else {
      socketHelper.detach(this.handleKeyDown)
    }
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    switch (socketData.payload) {
      case 'left':
        break
      case 'right':
        break
      case 'down':
        break
      case 'up':
        socketHelper.detach(this.handleKeyDown)
        this.props.exit()
        break
      case 'ok':
        console.log("okey")
        this.setState({
          powersaver: !this.state.powersaver
        })
        return
      case 'back':
        socketHelper.detach(this.handleKeyDown)
        this.props.exit()
        return
      default:
        break
    }
  }

  render() {
    return (
      <div className="power-settings">
        <SetttingsItem icon={PowerIcon} title="Power Saver" mode="toggle" selected={true} on={this.state.powersaver} />
      </div>
    )
  }
}
export default PowerSettings