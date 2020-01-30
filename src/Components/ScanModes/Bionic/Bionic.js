import React, { Component } from 'react'
import './Bionic.css'

import socketHelper from '../../../SocketHelper'

import Depth_Icon from '../../../Assets/MenuIcons/icon-depth-2.png'
import Save_Icon from '../../../Assets/MenuIcons/icon-save-outline.png'
import Bionic_Rotator from '../../../Assets/MenuIcons/bionic-rotator.png'

import LineChart from './LineChat'


class Bionic extends Component {
  constructor(props){
    super(props)
    this.state={
      sensorData: 0
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)

    this.testInterval = setInterval(() => {
      socketHelper.send('Q')
    }, 60);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'left':
          break
        case 'right':

          break
        case 'down':

          break
        case 'up':

          break
        case 'ok':

          return
        case 'back':
          clearInterval(this.testInterval);
          setTimeout(() => {
            this.props.navigateTo("menuScreen")
          }, 250);
        default:
          break
      }
    }
    else if (socketData.type === 'sensor') {
      this.setState({
        sensorData: socketData.payload
      })
    }
  }

  render() {
    return (
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
          <img ref="Rotator" className="rotator" src={Bionic_Rotator} alt="rotator" />
        </div>

        <div className="line-chart">
          <LineChart value={this.state.sensorData} />
        </div>





      </div>
    )
  }
}
export default Bionic