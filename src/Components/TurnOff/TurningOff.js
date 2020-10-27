import React from 'react'
import './TurningOff.css'
import MegaLogo from '../../Assets/MenuIcons/turn-off.png'
import SocketHelper from '../../SocketHelper'

class TurningOff extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      SocketHelper.send(JSON.stringify({
        type: 'settings',
        mode: 'turnoff'
      }))
    }, 3300);
  }

  render() {
    return (
      <div className="turning-off">
        <img alt="mega3dlogo" src={MegaLogo} />
      </div>
    )
  }
}

export default TurningOff