import React, { Component } from 'react'
import './Mainmenu.css'

import Carousel from '../Carousel/Carousel'

class Mainmenu extends Component{

  render(){
    return(
      <div className="mainmenu-component">
        <Carousel/>
      </div>
    )
  }
}

export default Mainmenu