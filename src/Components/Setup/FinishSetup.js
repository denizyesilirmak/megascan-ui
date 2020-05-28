import React, { Component } from 'react'
import './FinishSetup.css'
import Tick from '../../Assets/MenuIcons/tick.png'

class FinishSetup extends Component {

  componentDidMount(){
    setTimeout(() => {
      this.props.navigateTo("menuScreen")
    }, 6000);
  }

  render() {
    return (
      <div className="finish-setup component">
        <img id="tick" src={Tick} alt="tick" style={{ width: 150 }} />
        <h3 id="tick-text" style={{ color: "white", fontSize: 34 }}>Setup has finished. </h3>
      </div>
    )
  }
}
export default FinishSetup