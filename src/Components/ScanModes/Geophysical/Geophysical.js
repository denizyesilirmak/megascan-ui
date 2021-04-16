import React, { Component } from 'react'
import './Geophysical.css'
import socketHelper from '../../../SocketHelper'
import Selector from './Selector/Selector'

import Gold from '../../../Assets/Sprites/gold.png'
import Bronze from '../../../Assets/Sprites/bronze.png'
import Silver from '../../../Assets/Sprites/silver.png'
import Water from '../../../Assets/Sprites/water.png'
import Iron from '../../../Assets/Sprites/iron.png'

import GeoPhysical from '../../../Assets/MenuIcons/geophysical.png'
// import Restart from '../../../Assets/MenuIcons/restart.png'

const MATERIALS = [
  {
    name: "Gold",
    sprite: Gold
  },
  {
    name: "Bronze",
    sprite: Bronze
  },
  {
    name: "Silver",
    sprite: Silver
  },
  {
    name: "Water",
    sprite: Water
  },
  {
    name: "Iron",
    sprite: Iron
  }
]


class Geophysical extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMaterialIndex: 0,
      activeCursor: 0
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    switch (socketData.payload) {
      case 'up':
        if (this.state.activeCursor === 1) {
          this.setState({ activeCursor: 0 })
        }
        break
      case 'down':
        if (this.state.activeCursor === 0) {
          this.setState({ activeCursor: 1 })
        }
        break
      case 'left':
        if (this.state.activeCursor === 0) {
          if (this.state.activeMaterialIndex >= 1) {
            this.setState({
              activeMaterialIndex: this.state.activeMaterialIndex - 1
            })
          }
          else if (this.state.activeMaterialIndex === 0) {
            this.setState({
              activeMaterialIndex: 4
            })
          }
        }
        break
      case 'right':
        if (this.state.activeCursor === 0) {
          if (this.state.activeMaterialIndex < 4) {
            this.setState({
              activeMaterialIndex: this.state.activeMaterialIndex + 1
            })
          }
          else if (this.state.activeMaterialIndex === 4) {
            this.setState({
              activeMaterialIndex: 0
            })
          }
        }
        break
      case 'back':
        this.props.navigateTo("menuScreen")
        return

      case 'ok':
        if (this.state.activeCursor === 1) {
          this.props.navigateTo("geophysicalActionScreen", null, null, null, { target: (MATERIALS[this.state.activeMaterialIndex].name).toLowerCase() })
        }
        return
      default:
        break
    }
  }

  render() {
    return (
      <div className="component geophysical">
        <div className="resistivity">
          <img src={GeoPhysical} alt="geophysical" />
        </div>
        <div className="materials" >
          <Selector active={this.state.activeCursor === 0} selected={MATERIALS[this.state.activeMaterialIndex]} />
        </div>
        <div className="geo-start-results">
          <div className={`geo-start-button ${this.state.activeCursor === 1 ? " selected" : ""}`}>
            Start
          </div>
        </div>
        {/* <div className="geo-restart">
          <div className={`restart-button ${this.state.activeCursor === 2 ? " selected" : ""}`}>
            <img src={Restart} alt="restart" />
            <div className="geo-restart">Restart</div>
          </div>
        </div> */}
      </div>
    )
  }
}
export default Geophysical