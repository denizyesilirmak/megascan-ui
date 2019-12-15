import React, { Component } from 'react'
import './Statusbar.css'

import { subscribeLocal } from 'warp-client'
import socketHelper from '../../SocketHelper'

import Volume from './StatusbarElements/Volume'
import Wifi from './StatusbarElements/Wifi'
import Battery from './StatusbarElements/Battery'
import Clock from './StatusbarElements/Clock'

class Statusbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'SYSTEMS'
    }
  }

  componentDidMount () {
    subscribeLocal('title', title => { this.setState({ title }) })
    socketHelper.attachSpecial('battery', msg => {
      console.log('Statusbar diyor ki:', msg)
    })
  }

  render () {
    return (
      <div className='status-bar-component'>
        <div className='title'>
          {this.state.title}
        </div>
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
