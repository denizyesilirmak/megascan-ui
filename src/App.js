import React, { Component } from 'react'
import './App.css'
import DeviceContextProvider from './Contexts/DeviceContext'
import DeviceInfo from './Contexts/_DeviceInfo.json'

//COMPONENTS
import Statusbar from './Components/Statusbar/Statusbar'
import MainMenu from './Components/Mainmenu/Mainmenu'
import Settings from './Components/Settings/Settings'
import TurnOff from './Components/TurnOff/TurnOff'
import TurningOff from './Components/TurnOff/TurningOff'
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
import CompassCalibration from './Components/Compass/Compass'
import Locker from './Components/Locker/Locker'
import Suprise from './Components/Suprise/Suprise'
import DetectorModeSelector from './Components/DetectorModeSelector/DetectorModeSelector'
import ResistivityCalibration from './Components/ResistivityCalibration/ResistivityCalibration'
import PluggedSensorTest from './Components/PluggedSensorTest/PluggedSensorTest'
import LockerMenu from './Components/LockerMenu/LockerMenu'

//Scan modes
import AutoLRL from './Components/ScanModes/AutoLRL/AutoLRL'
import CtrlLRL from './Components/ScanModes/CtrlLRL/CtrlLRL'
import CtrlScan from './Components/ScanModes/CtrlLRL/CtrlLRLComponents/CtrlScan/CtrlScan'

import LiveStream from './Components/ScanModes/LiveStream/LiveStream'
import GroundScanMethodSelection from './Components/ScanModes/GroundScan/GroundScanMethodSelection/GroundScanMethodSelection'
import DeviceGroundScanProperties from './Components/ScanModes/GroundScan/DeviceGroundScanProperties/DeviceGroundScanProperties'

import TunnelScanMethodSelection from './Components/ScanModes/TunnelScan/GroundScanMethodSelection/GroundScanMethodSelection'
import DeviceTunnelScanProperies from './Components/ScanModes/TunnelScan/DeviceGroundScanProperties/DeviceGroundScanProperties'

import Bionic from './Components/ScanModes/Bionic/Bionic'
import IonicNew from './Components/ScanModes/Ionic/InonicNew'
import ManualScan from './Components/ScanModes/ManualLRL/ManualLRLScan'
import Geophysical from './Components/ScanModes/Geophysical/Geophysical'
import GeopyhsicalAction from './Components/ScanModes/Geophysical/GeophysicalAction'
import GeophysicalReport from './Components/ScanModes/Geophysical/GeophysicalResport'
import MobileGroundScan from './Components/MobileGroundScan/MobileGroundScan'
import PinPointer from './Components/ScanModes/PinPointer/PinPointer'
import ManualLRLSettings from './Components/ScanModes/ManualLRL/ManualLrlSettings'
import MobileLiveStream from './Components/MobileLiveStream/MobileLiveStream'
import Pulse from './Components/ScanModes/Pulse/Pulse'
// import VlfScan from './Components/ScanModes/Vlf/VlfScan'
// import Nugget from './Components/ScanModes/Nugget/Nugget'
import Pulse2 from './Components/ScanModes/Pulse2/Pulse'
import Pulse3 from './Components/ScanModes/Pulse3/Pulse3'

//3D scan
import ScanViewer from './Components/ScanViewer/ScanViewer'
import ScanScreen from './Components/ScanScreen/ScanScreen'
import TunnelScanScreen from './Components/TunnelScanScreen/ScanScreen'

//Sensor Controls
import ControlMagnetometer from './Components/SensorControl/SensorControl'
import PulseTimings from './Components/PulseTimings/PulseTimings'
import PulseDiscriminationTest from './Components/PulseDiscriminationTest/PulseDiscriminationTest'

import dbStorage from './DatabaseHelper'
import EasterEgg from './Components/Suprise/EasterEgg'
import ProjectHistory from './Components/Suprise/ProjectHistory'
import DetectorNoiseLevelAnalyser from './Components/DetectorNoiseLevelAnalyser/DetectorNoiseLevelAnalyser'
dbStorage.init()

class App extends Component {
  constructor(props) {
    super(props)
    this.tmpScanPropObj = { mode: "manual", path: "zigzag", lines: 10, steps: 10, startPoint: "right" } // not if this is needed.
    document.body.style.backgroundImage = "url('backgrounds/" + DeviceInfo.deviceModelName + ".jpg')"
    // console.log(DeviceInfo.deviceModelName)

    this.state = {
      ready: false,
      activeScreen: "setupScreen",
      fileToOpen: null,
      serial: '',
      lastMainMenuIndex: -1,
      settingsTabIndex: 0,
      info: {},
      resistivityParams: {},
      isFileTunnelScan: false
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
      //console.log("kilit")
      this.navigateTo("lockScreen")
    }
  }

  componentDidCatch(error, info) {
    // console.log("ERROR HATASI")
    // setTimeout(() => {
    // window.location.reload()
    // }, 1500);
  }

  /**
   * @param {object} scanPropObj - Scan Properties
   */
  setScanProperties = (scanPropObj) => {
    console.log(scanPropObj)
    this.tmpScanPropObj = scanPropObj
  }

  /**
   * @param {string} screenName - Screen name to navigate.
   * @param {string} file - File name to send 3D Scan Viewer.
   * @param {number} settingsTabIndex - Last Settings Tab index.
   * @param {object} mobileGroundScan - Mobile ground scan options.
   * @param {object} resistivityParams - Resistivity data.
   */

  navigateTo = (screenName, file, settingsTabIndex = 0, mobileGroundScanInfo = {}, resistivityParams = {}, isFileTunnelScan = false) => {
    this.setState({
      settingsTabIndex: settingsTabIndex,
      activeScreen: screenName,
      fileToOpen: file,
      info: mobileGroundScanInfo,
      resistivityParams: resistivityParams,
      isFileTunnelScan: isFileTunnelScan
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
      case "turningOff":
        return (<TurningOff navigateTo={this.navigateTo} />)
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

      case "tunnelScanMethodSelectionScreen":
        return (<TunnelScanMethodSelection navigateTo={this.navigateTo} />)
      case "deviceTunnelScanPropertiesScreen":
        return (<DeviceTunnelScanProperies navigateTo={this.navigateTo} setScanProperties={this.setScanProperties} />)

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
      case "controlTunnelScan":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="tunnelScanMethodSelectionScreen" />)
      case "controlPinPointer":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="pinPointerScreen" />)
      case "controlManualLrlScreen":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="manualLRLSettingsScreen" />)
      case "controlCtrlLrlScreen":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="ctrlLrlScanScreen" />)
      case "controlAutoLrlScreen":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="autoLrlScanScreen" />)
      case "controlPulseScreen":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="pulseScreen" />)
      case "controlPulse2Screen":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="pulse2Screen" />)
      case "controlNuggetScanScreen":
        return (<ControlMagnetometer navigateTo={this.navigateTo} target="nuggetScanScreen" />)
      case "scanScreen":
        return (<ScanScreen navigateTo={this.navigateTo} scanProps={this.tmpScanPropObj} />)
      case "tunnelScanScreen":
        return (<TunnelScanScreen navigateTo={this.navigateTo} scanProps={this.tmpScanPropObj} />)
      case "changePinScreen":
        return (<ChangePinScreen navigateTo={this.navigateTo} currentPin={this.state.pin} />)
      case "changeLanguageScreen":
        return (<ChangeLanguage navigateTo={this.navigateTo} setLanguage={(languageCode) => this.setLanguage(languageCode)} />)
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
        return (<Setup navigateTo={this.navigateTo} setLanguage={(languageCode) => this.setLanguage(languageCode)} serial={this.state.serial} />)
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
      case "compassCalibrationScreen":
        return (<CompassCalibration navigateTo={this.navigateTo} />)
      case "lockerScreen":
        return (<Locker navigateTo={this.navigateTo} />)
      case "supriseScreen":
        return (<Suprise navigateTo={this.navigateTo} />)
      case "easterEggScreen":
        return (<EasterEgg navigateTo={this.navigateTo} />)
      case "detectorModeSelectorScreen":
        return (<DetectorModeSelector navigateTo={this.navigateTo} />)
      case "geophysicalActionScreen":
        return (<GeopyhsicalAction navigateTo={this.navigateTo} resistivityParams={this.state.resistivityParams} />)
      case "geophysicalReportScreen":
        return (<GeophysicalReport navigateTo={this.navigateTo} resistivityParams={this.state.resistivityParams} />)
      case "pulse2Screen":
        return (<Pulse2 navigateTo={this.navigateTo} />)
      case "nuggetScanScreen":
        return (<Pulse3 navigateTo={this.navigateTo} />)
      case "resistivityCalibrationScreen":
        return (<ResistivityCalibration navigateTo={this.navigateTo} />)
      case "pluggedSensorTestScreen":
        return (<PluggedSensorTest navigateTo={this.navigateTo} />)
      case "pulseTimingsScreen":
        return (<PulseTimings navigateTo={this.navigateTo} />)
      case "pulseDiscriminationTest":
        return (<PulseDiscriminationTest navigateTo={this.navigateTo} />)
      case "projectHistoryScreen":
        return (<ProjectHistory navigateTo={this.navigateTo} />)
      case "detectorNoiseLevelScreen":
        return (<DetectorNoiseLevelAnalyser navigateTo={this.navigateTo} />)
      case "lockerMenuScreen":
        return (<LockerMenu navigateTo={this.navigateTo} />)
      default:
        break
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

export default App
