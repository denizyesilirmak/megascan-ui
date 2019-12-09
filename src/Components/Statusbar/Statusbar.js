import React, { Component } from 'react'
import './Statusbar.css'

import Volume from './StatusbarElements/Volume'
import Wifi from './StatusbarElements/Wifi'
import Battery from './StatusbarElements/Battery'

class Statusbar extends Component{
  render(){
    return(
      <div className="status-bar-component">
        <div className="title"> MANUAL RESISTIVITY </div>
        <div className="icons">
          <Volume/>
          <Wifi/>
          <Battery/>
        </div>
      </div>
    )
  }
}

export default Statusbar