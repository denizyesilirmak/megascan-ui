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
            <div className="key">1</div>
            <div className="key">2</div>
            <div className="key">3</div>
            <div className="key">4</div>
            <div className="key">5</div>
            <div className="key">6</div>
            <div className="key">7</div>
            <div className="key">8</div>
            <div className="key">9</div>
            <div className="key">0</div>
          </div>
        </div>
      </div>
    )
  }
}
export default LockScreen