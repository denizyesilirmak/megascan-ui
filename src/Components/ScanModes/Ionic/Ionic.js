import React, { Component } from 'react'
import './Ionic.css'
import Depth_Icon from '../../../Assets/MenuIcons/icon-depth-2.png'
import Save_Icon from '../../../Assets/MenuIcons/icon-save-outline.png'

class Ionic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursorIndex: 1000
    }
  }

  render() {
    return (
      <div className="ionic component">
        <div className={`b-button ${(this.state.cursorIndex % 4 === 0) ? "selected" : ""}`} id="depth-button">
          <img src={Depth_Icon} alt="depthicon" />
          <div className="label">Depth</div>
        </div>

        <div className={`b-button ${(this.state.cursorIndex % 4 === 3) ? "selected" : ""}`} id="save-button">
          <img src={Save_Icon} alt="saveicon" />
          <div className="label">Save</div>
        </div>
      </div>
    )
  }
}
export default Ionic