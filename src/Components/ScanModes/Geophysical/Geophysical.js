import React, { Component } from 'react'
import './Geophysical.css'
import socketHelper from '../../../SocketHelper'
import Selector from './Selector/Selector'

import Gold from '../../../Assets/Sprites/gold.png'
import Bronze from '../../../Assets/Sprites/bronze.png'
import Silver from '../../../Assets/Sprites/silver.png'
import Water from '../../../Assets/Sprites/water.png'
import Iron from '../../../Assets/Sprites/iron.png'


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
      activeMaterialIndex: 0
    }

  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    switch (socketData.payload) {
      case 'left':
        break
      case 'right':
        this.setState({
          activeMaterialIndex: this.state.activeMaterialIndex + 1
        })
        break
      case 'back':
        this.props.navigateTo("menuScreen")
        return
      default:
        break
    }

  }

  render() {
    return (
      <div className="component geophysical">
        <div className="resistivity"></div>
        <div className="materials" >
          <Selector selected={MATERIALS[this.state.activeMaterialIndex]} />
        </div>
      </div>
    )
  }
}
export default Geophysical