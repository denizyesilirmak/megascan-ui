import React, { Component } from 'react'
import './Mainmenu.css'
import SocketHelper from '../../SocketHelper'
import Carousel from '../Carousel/Carousel'


import GroundScanIcon from '../../Assets/MenuIcons/m-ground-scan.png'
import GeoPhysicalIcon from '../../Assets/MenuIcons/m-grophysical.png'
import AutoLRLIcon from '../../Assets/MenuIcons/m-auto-lrl.png'
import CtrlLrlIcon from '../../Assets/MenuIcons/m-ctrl-lrl.png'
import IonicIcon from '../../Assets/MenuIcons/m-ionic.png'
import BionicIcon from '../../Assets/MenuIcons/m-bionic.png'
import SettingIcon from '../../Assets/MenuIcons/m-settings.png'

class Mainmenu extends Component {
  constructor(props) {
    super(props)


    this.state = {
      index: 0
    }

    this.buttons = [
      {
        name: "Ground Scan",
        icon: GroundScanIcon
      },
      {
        name: "Geophysical",
        icon: GeoPhysicalIcon
      },
      {
        name: "Auto LRL",
        icon: AutoLRLIcon
      },
      {
        name: "CTRL LRL",
        icon: CtrlLrlIcon
      },
      {
        name: "Ionic",
        icon: IonicIcon
      },
      {
        name: "Bionic",
        icon: BionicIcon
      },
      {
        name: "Setting",
        icon: SettingIcon
      }
    ]
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempIndex = this.state.index
    switch (socketData.payload) {
      case 'left':
        if(tempIndex>=0)
        tempIndex--
        break
      case 'right':
        if(tempIndex<this.buttons.length-2)
          tempIndex++
        break
      case 'ok':

        return
      case 'back':

        return
      default:
        break
    }

    this.setState({
      index: tempIndex
    })
  }

  render() {
    return (
      <div className="mainmenu-component">
        <Carousel buttons={this.buttons} index={this.state.index}/>
        <SocketHelper ref="socket" onMessage={this.handleKeyDown} />
      </div>
    )
  }
}

export default Mainmenu