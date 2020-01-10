import React, { Component } from 'react'
import './Statusbar.css'

import socketHelper from '../../SocketHelper'

import Volume from './StatusbarElements/Volume'
import Wifi from './StatusbarElements/Wifi'
import Battery from './StatusbarElements/Battery'
import Clock from './StatusbarElements/Clock'

class Statusbar extends Component {
  componentDidMount () {
    socketHelper.attachSpecial('battery', msg => {
      console.log('Statusbar diyor ki:', msg)
    })
  }

  render () {
    return (
      <div className='status-bar-component'>
        <div className='title'> {this.props.title} </div>
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
