import React, { Component } from 'react'
import './Mainmenu.css'
import socketHelper from '../../SocketHelper'
import Carousel from '../Carousel/Carousel'


import GroundScanIcon from '../../Assets/MenuIcons/mainmenu/groundscan.png'
import GeoPhysicalIcon from '../../Assets/MenuIcons/mainmenu/geophysical.png'
import AutoLRLIcon from '../../Assets/MenuIcons/mainmenu/autolrl.png'
import CtrlLrlIcon from '../../Assets/MenuIcons/mainmenu/ctrllrl.png'
import IonicIcon from '../../Assets/MenuIcons/mainmenu/ionic.png'
import BionicIcon from '../../Assets/MenuIcons/mainmenu/bionic.png'
import SettingIcon from '../../Assets/MenuIcons/mainmenu/settings.png'
import LiveStreamIcon from '../../Assets/MenuIcons/mainmenu/livestream.png'
import ManualLRLIcon from '../../Assets/MenuIcons/mainmenu/manuallrl.png'
import FilesIcon from '../../Assets/MenuIcons/mainmenu/files.png'
import PinPointerIcon from '../../Assets/MenuIcons/mainmenu/pinpointer.png'
import PulseIcon from '../../Assets/MenuIcons/mainmenu/pulse.png'

import { DeviceContext } from '../../Contexts/DeviceContext'


class Mainmenu extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.buttons = [
      {
        name: "groundscan",
        icon: GroundScanIcon,
        screenName: "controlGroundScan"
      },
      {
        name: "geophysical",
        icon: GeoPhysicalIcon,
        screenName: "geophysicalScreen"
      },
      {
        name: "autolrl",
        icon: AutoLRLIcon,
        screenName: "controlAutoLrlScreen"
      },
      {
        name: "ctrllrl",
        icon: CtrlLrlIcon,
        screenName: "controlCtrlLrlScreen"
      },
      {
        name: "manuallrl",
        icon: ManualLRLIcon,
        screenName: "controlManualLrlScreen"
      },
      {
        name: "ionic",
        icon: IonicIcon,
        screenName: "controlIonic"
      },
      {
        name: "bionic",
        icon: BionicIcon,
        screenName: "controlBionic"
      },
      {
        name: "livestream",
        icon: LiveStreamIcon,
        screenName: "controlLiveStream"
      },
      {
        name: "pinpointer",
        icon: PinPointerIcon,
        screenName: "controlPinPointer"
      },
      {
        name: "files",
        icon: FilesIcon,
        screenName: "fileListScreen"
      },
      {
        name: "pulse",
        icon: PulseIcon,
        screenName: "pulseScreen"
      },
      {
        name: "settings",
        icon: SettingIcon,
        screenName: "settingsScreen"
      }
    ]

    this.state = {
      index: this.props.lastIndex,
      buttons: [],
      lockScreenCounter: 0
    }

  }

  componentDidMount() {
    // console.log(this.context.systems)
    this.setState({
      buttons: this.buttons.filter(e => {
        return this.context.systems[e.name]
      })
    })

    // console.log("mainmenu mounted")
    socketHelper.attach(this.handleKeyDown)
    this.timeout = setTimeout(() => {
      this.refs.mainmenu.style.opacity = 1
    }, 100);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  handleKeyDown = (socketData) => {
    //console.log(socketData)
    if (socketData.type === 'button') {
      this.context.buttonInterrupt()
      let tempIndex = this.state.index
      switch (socketData.payload) {
        case 'home':
          this.props.navigateTo('homeScreen')
          return
        case 'left':
          // console.log("mainmenu: left")
          if (tempIndex >= 0)
            tempIndex--
          break
        case 'right':
          if (tempIndex < this.state.buttons.length - 2)
            tempIndex++
          break
        case 'mgs':
          this.props.navigateTo("mobileGroundScan")
          return
        case 'turnoff':
          this.props.navigateTo("turnOff")
          return
        case 'ok':
          socketHelper.detach()
          // console.log("mainmenu: ok")
          this.refs.mainmenu.style.transform = "scale(2)"
          this.refs.mainmenu.style.opacity = 0
          this.props.setLastMainMenuIndex(this.state.index)
          setTimeout(() => {
            if (this.buttons[this.state.index + 1].screenName !== "") {
              // console.log("main menu unmount")
              socketHelper.detach()
              this.props.navigateTo(this.state.buttons[this.state.index + 1].screenName)
            }
          }, 300);
          return
        case 'back':
          if (this.state.lockScreenCounter > 2) {
            this.props.navigateTo("lockScreen")
          } else {
            this.setState({
              lockScreenCounter: this.state.lockScreenCounter + 1
            })
          }
          return
        default:
          break
      }


      this.setState({
        index: tempIndex
      })
    }
    else if (socketData.type === 'mobile' && socketData.payload !== 'exitGroundScanMenu') {
      // console.log("giriyorum kanka")
      if (socketData.payload === 'gs') {
        this.props.navigateTo("mobileGroundScan", null, null, socketData.info)
        return
      }
      else if(socketData.payload === 'ls'){
        this.props.navigateTo("mobileLiveStream")
        return
      }
    }
  }

  render() {
    return (
      <div ref="mainmenu" className="mainmenu-component">
        <Carousel buttons={this.state.buttons} index={this.state.index} />
      </div>
    )
  }
}

export default Mainmenu