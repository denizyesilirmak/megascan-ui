import React, { Component } from 'react'
import './Bionic.css'

import Depth_Icon from '../../../Assets/MenuIcons/icon-depth-2.png'
import Save_Icon from '../../../Assets/MenuIcons/icon-save-outline.png'
import Bionic_Rotator from '../../../Assets/MenuIcons/bionic-rotator.png'


class Bionic extends Component{

  componentDidMount(){

  }

  render(){
    return(
      <div className="bionic component">

        <div className="b-button" id="depth-button">
          <img src={Depth_Icon} alt="depthicon" />
          <div className="label">Depth</div>
        </div>

        <div className="b-button" id="save-button">
          <img src={Save_Icon} alt="saveicon" />
          <div className="label">Save</div>
        </div>

        <div className="rotating-indicator-container">
          <img ref="Rotator" className="rotator" src={Bionic_Rotator} alt="rotator"/>
        </div>

        <div className="line-chart">

        </div>

        



      </div>
    )
  }
}
export default Bionic