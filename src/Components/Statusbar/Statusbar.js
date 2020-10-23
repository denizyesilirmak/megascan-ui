import React, { Component } from 'react'
import './Statusbar.css'

import ResponsizeText from '../../ResponsiveText'

// import socketHelper from '../../SocketHelper'

import Volume from './StatusbarElements/Volume'
import Wifi from './StatusbarElements/Wifi'
import Battery from './StatusbarElements/Battery'
import Clock from './StatusbarElements/Clock'

import Infinity_D from '../../Assets/Logos/infinity.png'
import Goldstar_D from '../../Assets/Logos/goldstar.png'
import Concord_D from '../../Assets/Logos/concord.png'
import Pheonix_D from '../../Assets/Logos/pheonix.png'

import { DeviceContext } from '../../Contexts/DeviceContext'

class Statusbar extends Component {
  static contextType = DeviceContext

  getLogo = () => {
    switch (this.context.device) {
      case "infinity": return Infinity_D
      case "goldstar": return Goldstar_D
      case "concord": return Concord_D
      case "pheonix": return Pheonix_D


      default:
        break;
    }
  }

  render() {
    return (
      <div className='status-bar-component'>
        <img className="device-logo" src={this.getLogo()} alt="logo"></img>
        <div className='title'> <ResponsizeText large={this.props.currentLanguage === 'ar'} text={this.context.strings[this.props.title]} /> </div>
        <div className='icons'>
          <Volume generalVolume={this.props.generalVolume} />
          <Wifi />
          <Battery />
          <Clock />
        </div>
      </div>
    )
  }
}

export default Statusbar
