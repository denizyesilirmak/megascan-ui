import React, { Component } from 'react';
import './App.css';

//COMPONENTS
import Statusbar from './Components/Statusbar/Statusbar'
import MainMenu from './Components/Mainmenu/Mainmenu'
import Settings from './Components/Settings/Settings'
import TurnOff from './Components/TurnOff/TurnOff'
import LockScreen from './Components/LockScreen/LockScreen.js'

//Scan modes
import AutoLRL from './Components/ScanModes/AutoLRL/AutoLRL'
import CtrlLRL from './Components/ScanModes/CtrlLRL/CtrlLRL'
import LiveStream from './Components/ScanModes/LiveStream/LiveStream'
import GroundScanMethodSelection from './Components/ScanModes/GroundScan/GroundScanMethodSelection/GroundScanMethodSelection'
import DeviceGroundScanProperties from './Components/ScanModes/GroundScan/DeviceGroundScanProperties/DeviceGroundScanProperties'
import Bionic from './Components/ScanModes/Bionic/Bionic'
import Ionic from './Components/ScanModes/Ionic/Ionic'

import ScanViewer from './Components/ScanViewer/ScanViewer'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeScreen: "lockScreen"
    }
  }

  navigateTo = (screenName) => {
    this.setState({
      activeScreen: screenName
    })
  }

  renderScreen = () => {
    switch (this.state.activeScreen) {
      case "menuScreen":
        return (<MainMenu navigateTo={this.navigateTo} />)
      case "settingsScreen":
        return (<Settings navigateTo={this.navigateTo} />)
      case "turnOff":
        return (<TurnOff navigateTo={this.navigateTo} />)
      case "autoLrlScanScreen":
        return (<AutoLRL navigateTo={this.navigateTo} />)
      case "ctrlLrlScanScreen":
        return (<CtrlLRL navigateTo={this.navigateTo} />)
      case "liveStreamScreen":
        return (<LiveStream navigateTo={this.navigateTo} />)
      case "groundScanMethodSelectionScreen":
        return (<GroundScanMethodSelection navigateTo={this.navigateTo} />)
      case "deviceGroundScanPropertiesScreen":
        return (<DeviceGroundScanProperties navigateTo={this.navigateTo} />)
      case "scanViewerScreen":
        return (<ScanViewer navigateTo={this.navigateTo} />)
      case "bionicScreen":
        return (<Bionic navigateTo={this.navigateTo} />)
      case "ionicScreen":
        return (<Ionic navigateTo={this.navigateTo} />)
      case "lockScreen":
        return (<LockScreen navigateTo={this.navigateTo} />)
      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <Statusbar title={this.state.activeScreen} />
        {
          this.renderScreen()
        }
      </div>
    )
  }

}

export default App;
