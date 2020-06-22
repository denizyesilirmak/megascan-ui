import React, { Component } from 'react';
import './App.css';
import DeviceContextProvider from './Contexts/DeviceContext'
import DeviceInfo from './Contexts/_DeviceInfo.json'

//COMPONENTS
import Statusbar from './Components/Statusbar/Statusbar'
import MainMenu from './Components/Mainmenu/Mainmenu'
import Settings from './Components/Settings/Settings'
import TurnOff from './Components/TurnOff/TurnOff'
import LockScreen from './Components/LockScreen/LockScreen.js'
import ChangePinScreen from './Components/ChangePin/ChangePin'
import ChangeLanguage from './Components/ChangeLanguage/ChangeLanguage'
import FileList from './Components/FileList/FileList'
import Setup from './Components/Setup/Setup'
import ResetFactory from './Components/Settings/SettingsPopups/ResetFactory/ResetFactory'
import ResetSettings from './Components/Settings/SettingsPopups/ResetSettings/ResetSettings'
import ResetStorage from './Components/Settings/SettingsPopups/ResetStorage/ResetStorage'

//Scan modes
import AutoLRL from './Components/ScanModes/AutoLRL/AutoLRL'
import CtrlLRL from './Components/ScanModes/CtrlLRL/CtrlLRL'
import LiveStream from './Components/ScanModes/LiveStream/LiveStream'
import GroundScanMethodSelection from './Components/ScanModes/GroundScan/GroundScanMethodSelection/GroundScanMethodSelection'
import DeviceGroundScanProperties from './Components/ScanModes/GroundScan/DeviceGroundScanProperties/DeviceGroundScanProperties'
import Bionic from './Components/ScanModes/Bionic/Bionic'
import Ionic from './Components/ScanModes/Ionic/Ionic'
import ManualScan from './Components/ScanModes/ManualLRL/ManualLRLScan'
import Geophysical from './Components/ScanModes/Geophysical/Geophysical'
import MobileGroundScan from './Components/MobileGroundScan/MobileGroundScan'
import PinPointer from './Components/ScanModes/PinPointer/PinPointer'

//3D scan
import ScanViewer from './Components/ScanViewer/ScanViewer'
import ScanScreen from './Components/ScanScreen/ScanScreen'

//Sensor Controls
import ControlMagnetometer from './Components/SensorControl/ControlMagnetometer'

import dbStorage from './DatabaseHelper'
dbStorage.init()

// import SoundHelper from './SoundHelper'

class App extends Component {
  constructor(props) {
    super(props)
    this.tmpScanPropObj = { mode: "manual", path: "zigzag", lines: 10, steps: 10, startPoint: "right" } // not if this is needed.
    document.body.style.backgroundImage = "url('backgrounds/" + DeviceInfo.deviceModelName + ".jpg')";
    // console.log(DeviceInfo.deviceModelName)

    this.state = {
      ready: false,
      activeScreen: "setupScreen",
      fileToOpen: null,
    }

    dbStorage.getAll()
      .then(settings => {
        // console.log('Got settings:', settings)
        console.log(settings['setupCompleted'])
        this.setState({
          ready: true,
          currentLanguage: settings['language'] || 'en',
          activeScreen: settings['setupCompleted'] ? "menuScreen" : "setupScreen",
          generalVolume: settings['generalVolume'] || 100
        })
      })



  }

  componentDidMount() {
    if (this.state.lock)
      this.navigateTo("lockScreen")
  }

  componentDidCatch(error, info) {
    // console.log("ERROR HATASI")
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }

  setScanProperties = (scanPropObj) => {
    // console.log(scanPropObj)
    this.tmpScanPropObj = scanPropObj
  }

  navigateTo = (screenName, file) => {
    this.setState({
      activeScreen: screenName,
      fileToOpen: file
    })
  }

  setLanguage = (lang_code) => {
    console.log("selected language:", lang_code)
    this.setState({
      currentLanguage: lang_code
    })
  }

  setVolume = (volume) => {
    this.setState({
      generalVolume: volume
    })
  }

  renderScreen = () => {
    switch (this.state.activeScreen) {
      case "menuScreen":
        return (<MainMenu navigateTo={this.navigateTo} />)
      case "settingsScreen":
        return (<Settings navigateTo={this.navigateTo} setVolume={this.setVolume} />)
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
        return (<DeviceGroundScanProperties navigateTo={this.navigateTo} setScanProperties={this.setScanProperties} />)
      case "scanViewerScreen":
        return (<ScanViewer navigateTo={this.navigateTo} fileToOpen={this.state.fileToOpen} />)
      case "bionicScreen":
        return (<Bionic navigateTo={this.navigateTo} />)
      case "ionicScreen":
        return (<Ionic navigateTo={this.navigateTo} />)
      case "lockScreen":
        return (<LockScreen navigateTo={this.navigateTo} />)
      case "manualLRLScreen":
        return (<ManualScan navigateTo={this.navigateTo} />)
      case "controlLiveStream":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="liveStreamScreen" />)
      case "controlBionic":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="bionicScreen" />)
      case "controlIonic":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="ionicScreen" />)
      case "controlGroundScan":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="groundScanMethodSelectionScreen" />)
      case "scanScreen":
        return (<ScanScreen navigateTo={this.navigateTo} scanProps={this.tmpScanPropObj} />)
      case "changePinScreen":
        return (<ChangePinScreen navigateTo={this.navigateTo} />)
      case "changeLanguageScreen":
        return (<ChangeLanguage navigateTo={this.navigateTo} setLanguage={(a) => this.setLanguage(a)} />)
      case "fileListScreen":
        return (<FileList navigateTo={this.navigateTo} />)
      case "geophysicalScreen":
        return (<Geophysical navigateTo={this.navigateTo} />)
      case "mobileGroundScan":
        return (<MobileGroundScan navigateTo={this.navigateTo} />)
      case "pinPointerScreen":
        return (<PinPointer navigateTo={this.navigateTo} />)
      case "setupScreen":
        return (<Setup navigateTo={this.navigateTo} setLanguage={(a) => this.setLanguage(a)} />)
      case "factoryResetScreen":
        return (<ResetFactory navigateTo={this.navigateTo} />)
      case "resetSettingsScreen":
        return (<ResetSettings navigateTo={this.navigateTo} />)
      case "resetStorageScreen":
        return (<ResetStorage navigateTo={this.navigateTo} />)
      default:
        break;
    }
  }

  render() {
    if (this.state.ready) {
      return (
        <div className="App">
          <DeviceContextProvider language={this.state.currentLanguage}>
            <Statusbar title={this.state.activeScreen} generalVolume={this.state.generalVolume}/>
            {
              this.renderScreen()
            }
          </DeviceContextProvider>
        </div>
      )
    } else {
      return null
    }

  }
}

export default App;
