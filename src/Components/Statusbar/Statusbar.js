import React, { Component } from 'react'
import './Statusbar.css'

import socketHelper from '../../SocketHelper'

import Volume from './StatusbarElements/Volume'
import Wifi from './StatusbarElements/Wifi'
import Battery from './StatusbarElements/Battery'
import Clock from './StatusbarElements/Clock'

import Logo from '../../Assets/Logos/1.png'

import { LanguageContext } from '../../Contexts/LanguageContext'

class Statusbar extends Component {
  static contextType = LanguageContext

  render() {
    return (
      <div className='status-bar-component'>
        <img className="device-logo" src={Logo} alt="logo"></img>
        <div className='title'> {this.context[this.props.title]} </div>
        <div className='icons'>
          <Volume />
          <Wifi />
          <Battery />
          <Clock />
        </div>
      </div>
    )
  }
}

export default Statusbar
