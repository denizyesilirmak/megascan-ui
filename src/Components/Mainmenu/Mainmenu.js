import React, { Component } from 'react'
import './Mainmenu.css'
import socketHelper from '../../SocketHelper'
import Carousel from '../Carousel/Carousel'


import GroundScanIcon from '../../Assets/MenuIcons/m-ground-scan.png'
import GeoPhysicalIcon from '../../Assets/MenuIcons/m-grophysical.png'
import AutoLRLIcon from '../../Assets/MenuIcons/m-auto-lrl.png'
import CtrlLrlIcon from '../../Assets/MenuIcons/m-ctrl-lrl.png'
import IonicIcon from '../../Assets/MenuIcons/m-ionic.png'
import BionicIcon from '../../Assets/MenuIcons/m-bionic.png'
import SettingIcon from '../../Assets/MenuIcons/m-settings.png'
import LiveStreamIcon from '../../Assets/MenuIcons/m-live-stream.png'
import ManualLRLIcon from '../../Assets/MenuIcons/m-device.png'

class Mainmenu extends Component {
  constructor(props) {
    super(props)


    this.state = {
      index: 0
    }

    this.buttons = [
      {
        name: "Ground Scan",
        icon: GroundScanIcon,
        screenName: "groundScanMethodSelectionScreen"
      },
      {
        name: "Geophysical",
        icon: GeoPhysicalIcon,
        screenName: ""
      },
      {
        name: "Auto LRL",
        icon: AutoLRLIcon,
        screenName: "autoLrlScanScreen"
      },
      {
        name: "CTRL LRL",
        icon: CtrlLrlIcon,
        screenName: "ctrlLrlScanScreen"
      },
      {
        name: "Manual LRL",
        icon: ManualLRLIcon,
        screenName: "manualLRLScreen"
      },
      {
        name: "Ionic",
        icon: IonicIcon,
        screenName: "ionicScreen"
      },
      {
        name: "Bionic",
        icon: BionicIcon,
        screenName: "bionicScreen"
      },
      {
        name: "Live Stream",
        icon: LiveStreamIcon,
        screenName: "controlMagnetometer"
      },
      {
        name: "Settings",
        icon: SettingIcon,
        screenName: "settingsScreen"
      }
    ]
  }

  componentDidMount() {
    console.log("mainmenu mounted")
    socketHelper.attach(this.handleKeyDown)
    setTimeout(() => {
      this.refs.mainmenu.style.opacity = 1
    }, 100);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempIndex = this.state.index
    switch (socketData.payload) {
      case 'left':
        // console.log("mainmenu: left")
        if (tempIndex >= 0)
          tempIndex--
        break
      case 'right':
        if (tempIndex < this.buttons.length - 2)
          tempIndex++
        break
      case 'ok':
        // console.log("mainmenu: ok")
        this.refs.mainmenu.style.transform = "scale(2)"
        this.refs.mainmenu.style.opacity = 0
        
        setTimeout(() => {
          if (this.buttons[this.state.index + 1].screenName !== ""){
            // console.log("main menu unmount")
            socketHelper.detach()
            this.props.navigateTo(this.buttons[this.state.index + 1].screenName)
          }
        }, 300);
        return
      case 'back':
        this.props.navigateTo("lockScreen")
        return
      default:
        break
    }

    this.setState({
      index: tempIndex
    })
  }

  componentWillUnmount(){

  }

  render() {
    return (
      <div ref="mainmenu" className="mainmenu-component">
        <Carousel buttons={this.buttons} index={this.state.index} />
      </div>
    )
  }
}

export default Mainmenu