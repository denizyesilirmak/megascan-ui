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
import Reboot from './Components/Reboot/Reboot'
import HomeScreen from './Components/Homescreen/Homescreen'
import AntennaCalibration from './Components/AntennaCalibration/AntennaCalibration'
import GroundScanSensorCalibration from './Components/GroundScanSensorCalibration/GroundScanSensorCalibration'
import SerialCodeChanger from './Components/SerialCodeChanger/SerialCodeChanger'

//Scan modes
import AutoLRL from './Components/ScanModes/AutoLRL/AutoLRL'
import CtrlLRL from './Components/ScanModes/CtrlLRL/CtrlLRL'
import CtrlScan from './Components/ScanModes/CtrlLRL/CtrlLRLComponents/CtrlScan/CtrlScan'

import LiveStream from './Components/ScanModes/LiveStream/LiveStream'
import GroundScanMethodSelection from './Components/ScanModes/GroundScan/GroundScanMethodSelection/GroundScanMethodSelection'
import DeviceGroundScanProperties from './Components/ScanModes/GroundScan/DeviceGroundScanProperties/DeviceGroundScanProperties'
import Bionic from './Components/ScanModes/Bionic/Bionic'
import IonicNew from './Components/ScanModes/Ionic/InonicNew'
import ManualScan from './Components/ScanModes/ManualLRL/ManualLRLScan'
import Geophysical from './Components/ScanModes/Geophysical/Geophysical'
import MobileGroundScan from './Components/MobileGroundScan/MobileGroundScan'
import PinPointer from './Components/ScanModes/PinPointer/PinPointer'
import ManualLRLSettings from './Components/ScanModes/ManualLRL/ManualLrlSettings'
import MobileLiveStream from './Components/MobileLiveStream/MobileLiveStream'
import Pulse from './Components/ScanModes/Pulse/Pulse'

//3D scan
import ScanViewer from './Components/ScanViewer/ScanViewer'
import ScanScreen from './Components/ScanScreen/ScanScreen'

//Sensor Controls
import ControlMagnetometer from './Components/SensorControl/SensorControl'

import dbStorage from './DatabaseHelper'
dbStorage.init()


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
      serial: '',
      lastMainMenuIndex: -1,
      settingsTabIndex: 0,
      info: {}
    }

    fetch('http://localhost:9090/serial')
      .then(data => data.text())
      .then(data => {
        if (data.length === 12)
          this.setState({
            serial: data
          })
        else {
          console.error("Cannot get serial number")
        }
      })

    dbStorage.getAll()
      .then(settings => {
        // console.log(typeof settings['generalVolume'])
        // activeScreen: settings['setupCompleted'] ? settings['pinlock'] ? 'lockScreen' : 'menuScreen' : "setupScreen", 
        this.setState({
          ready: true,
          currentLanguage: settings['lang'] || 'en',
          activeScreen: settings['setupCompleted'] ? settings['pinlock'] ? 'lockScreen' : 'menuScreen' : "setupScreen",
          generalVolume: settings['generalVolume'] || 0, // volume 0 gives false TODO
          searchVolume: settings['searchVolume'] || 0, // volume 0 gives false TODO
          pin: settings['pincode'] || this.state.serial.slice(-4),
          pinlock: settings['pinlock']
        })
      })
  }

  componentDidMount() {
    if (this.state.pinlock) {
      console.log("kilit")
      this.navigateTo("lockScreen")
    }
  }

  componentDidCatch(error, info) {
    // console.log("ERROR HATASI")
    // setTimeout(() => {
    // window.location.reload()
    // }, 1500);
  }

  setScanProperties = (scanPropObj) => {
    console.log(scanPropObj)
    this.tmpScanPropObj = scanPropObj
  }

  /**
   * @param {string} screenName - Screen name to navigate.
   * @param {string} file - File name to send 3D Scan Viewer.
   * @param {number} settingsTabIndex - Last Settings Tab index.
   * @param {object} mobileGroundScan - Mobile ground scan options.
   */
  navigateTo = (screenName, file, settingsTabIndex = 0, mobileGroundScanInfo = {}) => {
    this.setState({
      settingsTabIndex: settingsTabIndex,
      activeScreen: screenName,
      fileToOpen: file,
      info: mobileGroundScanInfo
    })
  }

  setLanguage = (lang_code) => {
    console.log("selected language:", lang_code)
    this.setState({
      currentLanguage: lang_code
    })
  }

  setVolume = (generalVolume, searchVolume) => {
    this.setState({
      generalVolume: generalVolume,
      searchVolume: searchVolume
    })
  }

  setLastMainMenuIndex = (index) => {
    this.setState({
      lastMainMenuIndex: index
    })
  }

  fontFallback = () => {
    switch (this.state.currentLanguage) {
      case 'tr': return 'lang-tr'
      case 'iw': return 'lang-iw'
      case 'ar': return 'lang-ar'
      default: return ''
    }
  }

  renderScreen = () => {
    switch (this.state.activeScreen) {
      case "menuScreen":
        return (<MainMenu navigateTo={this.navigateTo} setLastMainMenuIndex={this.setLastMainMenuIndex} lastIndex={this.state.lastMainMenuIndex} />)
      case "settingsScreen":
        return (<Settings navigateTo={this.navigateTo} setVolume={this.setVolume} settingsTabIndex={this.state.settingsTabIndex} />)
      case "turnOff":
        return (<TurnOff navigateTo={this.navigateTo} />)
      case "autoLrlScanScreen":
        return (<AutoLRL navigateTo={this.navigateTo} />)
      case "ctrlLrlScanScreen":
        return (<CtrlLRL navigateTo={this.navigateTo} />)
      case "liveStreamScreen":
        return (<LiveStream navigateTo={this.navigateTo} generalVolume={this.state.generalVolume} searchVolume={this.state.searchVolume} />)
      case "groundScanMethodSelectionScreen":
        return (<GroundScanMethodSelection navigateTo={this.navigateTo} />)
      case "deviceGroundScanPropertiesScreen":
        return (<DeviceGroundScanProperties navigateTo={this.navigateTo} setScanProperties={this.setScanProperties} />)
      case "scanViewerScreen":
        return (<ScanViewer navigateTo={this.navigateTo} fileToOpen={this.state.fileToOpen} />)
      case "bionicScreen":
        return (<Bionic navigateTo={this.navigateTo} />)
      case "ionicScreen":
        return (<IonicNew navigateTo={this.navigateTo} generalVolume={this.state.generalVolume} searchVolume={this.state.searchVolume} />)
      case "lockScreen":
        return (<LockScreen navigateTo={this.navigateTo} currentPin={this.state.pin} />)
      case "manualLRLScreen":
        return (<ManualScan navigateTo={this.navigateTo} />)
      case "manualLRLSettingsScreen":
        return (<ManualLRLSettings navigateTo={this.navigateTo} />)
      case "controlLiveStream":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="liveStreamScreen" />)
      case "controlBionic":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="bionicScreen" />)
      case "controlIonic":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="ionicScreen" />)
      case "controlGroundScan":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="groundScanMethodSelectionScreen" />)
      case "controlPinPointer":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="pinPointerScreen" />)
      case "controlManualLrlScreen":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="manualLRLSettingsScreen" />)
      case "controlCtrlLrlScreen":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="ctrlLrlScanScreen" />)
      case "controlAutoLrlScreen":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="autoLrlScanScreen" />)
      case "scanScreen":
        return (<ScanScreen navigateTo={this.navigateTo} scanProps={this.tmpScanPropObj} />)
      case "changePinScreen":
        return (<ChangePinScreen navigateTo={this.navigateTo} currentPin={this.state.pin} />)
      case "changeLanguageScreen":
        return (<ChangeLanguage navigateTo={this.navigateTo} setLanguage={(a) => this.setLanguage(a)} />)
      case "fileListScreen":
        return (<FileList navigateTo={this.navigateTo} />)
      case "geophysicalScreen":
        return (<Geophysical navigateTo={this.navigateTo} />)
      case "mobileGroundScan":
        return (<MobileGroundScan navigateTo={this.navigateTo} info={this.state.info} />)
      case "mobileLiveStream":
        return (<MobileLiveStream navigateTo={this.navigateTo} info={this.state.info} />)
      case "pinPointerScreen":
        return (<PinPointer navigateTo={this.navigateTo} generalVolume={this.state.generalVolume} searchVolume={this.state.searchVolume} />)
      case "setupScreen":
        return (<Setup navigateTo={this.navigateTo} setLanguage={(a) => this.setLanguage(a)} serial={this.state.serial} />)
      case "factoryResetScreen":
        return (<ResetFactory navigateTo={this.navigateTo} />)
      case "resetSettingsScreen":
        return (<ResetSettings navigateTo={this.navigateTo} />)
      case "resetStorageScreen":
        return (<ResetStorage navigateTo={this.navigateTo} />)
      case "ctrlLrlSearchScreen":
        return (<CtrlScan navigateTo={this.navigateTo} />)
      case "manualLrlSearchScreen":
        return (<CtrlScan navigateTo={this.navigateTo} />)
      case "rebootScreen":
        return (<Reboot navigateTo={this.navigateTo} />)
      case "pulseScreen":
        return (<Pulse navigateTo={this.navigateTo} />)
      case "homeScreen":
        return (<HomeScreen navigateTo={this.navigateTo} />)
      case "antennaCalibrationScreen":
        return (<AntennaCalibration navigateTo={this.navigateTo} />)
      case "groundScanSensorCalibration":
        return (<GroundScanSensorCalibration navigateTo={this.navigateTo} />)
      case "serialCodeChangerScreen":
        return (<SerialCodeChanger navigateTo={this.navigateTo} />)
      default:
        break;
    }
  }

  render() {
    if (this.state.ready) {
      return (
        <div className={`App ${this.fontFallback()}`}>
          <DeviceContextProvider language={this.state.currentLanguage} activeScreen={this.state.activeScreen}>
            <Statusbar title={this.state.activeScreen} generalVolume={this.state.generalVolume} currentLanguage={this.state.currentLanguage} />
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
