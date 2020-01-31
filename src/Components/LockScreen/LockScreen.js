import React, { Component } from 'react'
import './LockScreen.css'
import LockIcon from '../../Assets/MenuIcons/lock.png'

class LockScreen extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="lock-screen">
        <img className="lock-icon" alt="lock" src={LockIcon} />
        <div className="lock-holder">
          <div className="pin"> 1453 </div>
          <div className="num-pad">
            
          </div>
        </div>
      </div>
    )
  }
}
export default LockScreen