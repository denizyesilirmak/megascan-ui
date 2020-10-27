import React, { Component } from 'react'
import './Target.css'
import { DeviceContext } from '../../../../../Contexts/DeviceContext'

import bronze from '../../../../../Assets/materials/out/bronze.png'
import cavity from '../../../../../Assets/materials/out/cavity.png'
import copper from '../../../../../Assets/materials/out/copper.png'
import diamond from '../../../../../Assets/materials/out/diamond.png'
import gemstones from '../../../../../Assets/materials/out/gemstones.png'
import goldore from '../../../../../Assets/materials/out/goldore.png'
import goldtreasure from '../../../../../Assets/materials/out/goldtreasure.png'
import goldveins from '../../../../../Assets/materials/out/goldveins.png'
import iron from '../../../../../Assets/materials/out/iron.png'
import platinium from '../../../../../Assets/materials/out/platinium.png'
import silver from '../../../../../Assets/materials/out/silver.png'

const targets = [
  {
    icon: bronze,
    name: 'bronze'
  },
  {
    icon: cavity,
    name: 'cavity'
  },
  {
    icon: copper,
    name: 'copper'
  },
  {
    icon: diamond,
    name: 'diamond'
  },
  {
    icon: gemstones,
    name: 'gemstones'
  },
  {
    icon: goldore,
    name: 'goldore'
  },
  {
    icon: goldtreasure,
    name: 'goldtreasure'
  },
  {
    icon: goldveins,
    name: 'goldveins'
  },
  {
    icon: iron,
    name: 'iron'
  },
  {
    icon: platinium,
    name: 'platinium'
  },
  {
    icon: silver,
    name: 'silver'
  }
]

class Target extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="ctrl-lrl-target">
        <div className="target-button-container">

          <div className="target-slider" style={{ transform: `translatex(${(this.props.index - 1) * -200}px)` }}>

            {
              targets.map((e, i) => {
                return (
                  <div key={e.name} className={`target-item ${this.props.index === i ? 'target-active' : null}`} >
                    <img alt="target" src={e.icon} />
                    <div className="target-name">{this.context.strings[e.name]}</div>
                  </div>
                )
              })
            }

          </div>

          {/* <div className="target-button" style={{ transform: `scale(${this.props.index === 0 ? '1.1' : '0.8'})`, opacity: this.props.index === 0 ? 1 : 0.7 }}>
            <img alt="goldore" src={Gold} />
            <div className="label">{this.context.strings["gold"]}</div>
          </div>

          <div className="target-button" style={{ transform: `scale(${this.props.index === 1 ? '1.1' : '0.8'})`, opacity: this.props.index === 1 ? 1 : 0.7 }}>
            <img alt="silverore" src={Silver} />
            <div className="label">{this.context.strings["silver"]}</div>
          </div>

          <div className="target-button" style={{ transform: `scale(${this.props.index === 2 ? '1.1' : '0.9'})`, opacity: this.props.index === 2 ? 1 : 0.7 }}>
            <img alt="diamond" src={Diamond} />
            <div className="label">{this.context.strings["diamond"]}</div>
          </div> */}

        </div>
      </div>
    )
  }
}
export default Target