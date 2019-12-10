import React, { Component } from 'react'
import './Navigator.css'

import LeftArrow from '../../../Assets/MenuIcons/left-arrow2.png'
import RightArrow from '../../../Assets/MenuIcons/right-arrow2.png'

class Navigator extends Component{
  // constructor(props){
  //   super(props)
  // }

  render(){
    return(
      <div className="navigator-component">
        <img alt="left" className="navigator-left-arrow" src={LeftArrow}></img>
        <img alt="right" className="navigator-right-arrow" src={RightArrow}></img>

        <div className="navigator-buttons">
          <div className="navigator-button">
            Power Mode
          </div>
          <div className="navigator-button selected">
            Time & Date
          </div>
          <div className="navigator-button">
            STORAGE
          </div>
        </div>
      </div>
    )
  }
}

export default Navigator