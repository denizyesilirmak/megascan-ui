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

import { DeviceContext } from '../../Contexts/DeviceContext'

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (2000 * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

class Mainmenu extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    const lastIndex = getCookie("menuIndex")
    this.state = {
      index: Number.isNaN(parseInt(lastIndex)) ? -1 : parseInt(lastIndex),
      buttons: []
    }


    

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
        screenName: "autoLrlScanScreen"
      },
      {
        name: "ctrllrl",
        icon: CtrlLrlIcon,
        screenName: "ctrlLrlScanScreen"
      },
      {
        name: "manuallrl",
        icon: ManualLRLIcon,
        screenName: "manualLRLScreen"
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
        screenName: "pinPointerScreen"
      },
      {
        name: "files",
        icon: FilesIcon,
        screenName: "fileListScreen"
      },
      {
        name: "settings",
        icon: SettingIcon,
        screenName: "settingsScreen"
      }
    ]
  }
  
  componentDidMount() {
    console.log(this.context.systems)
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
    if (socketData.type !== 'button') { return }
    let tempIndex = this.state.index
    switch (socketData.payload) {
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
        break
      case 'ok':
        // console.log("mainmenu: ok")
        setCookie("menuIndex", this.state.index)
        this.refs.mainmenu.style.transform = "scale(2)"
        this.refs.mainmenu.style.opacity = 0

        setTimeout(() => {
          if (this.buttons[this.state.index + 1].screenName !== "") {
            // console.log("main menu unmount")
            socketHelper.detach()
            this.props.navigateTo(this.state.buttons[this.state.index + 1].screenName)
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

  render() {
    return (
      <div ref="mainmenu" className="mainmenu-component">
        <Carousel buttons={this.state.buttons} index={this.state.index} />
      </div>
    )
  }
}

export default Mainmenu