import React, { Component } from 'react'
import './ManualLRLScan.css'
import DialImage from '../../../Assets/MenuIcons/dial.png'
import CompassOut from '../../../Assets/MenuIcons/compas-out.png'

class ManualLRLScan extends Component {
  componentDidMount(){
    setInterval(() => {
      this.refs.compass.style.transform = "rotate(" + (Math.trunc(Math.random()*360)) + "deg)"
    }, 1500);
  }
  render() {
    return (
      <div className="manual-lrl-scan component">
        <div className="compass">
        <img ref="compass" className="compass-out" src={CompassOut} alt="compass-out" />
        </div>

        <div className="gauge">
          <img className="gauge-dial" src={DialImage} alt="dial" />
        </div>
      </div>
    )
  }
}
export default ManualLRLScan