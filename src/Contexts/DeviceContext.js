import React, { createContext, Component } from 'react'
import dbStorage from '../DatabaseHelper'
const STRINGS = require('./_Strings.json')
const DEVICE_MODEL = require('./_DeviceInfo.json').deviceModelName
const DEVICE_LIST = require('./_DeviceList.json')
const THEMES = require('./_Themes.json')
export const DeviceContext = createContext()

// console.log(DEVICE_MODEL)
// console.log(DEVICE_LIST[DEVICE_MODEL])
const systems = DEVICE_LIST[DEVICE_MODEL]
const curentTheme = THEMES[DEVICE_MODEL]

const SLEEPMODETIMEOUT = 5000

class DeviceContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sleepModeActive: false
    }
  }

  getSleepModeStatus = async () => {
    //gets sleep mode status current state on device boot
    this.sleepModeStatus = await dbStorage.getItem("sleepmode") || false
    console.log(this.sleepModeStatus)
  }

  componentDidMount() {
    this.getSleepModeStatus()

    this.sleepModeTimer = setTimeout(() => {
      //turn off screen after SLEEPMODETIMEOUT ms
      if (this.sleepModeStatus === true) {
        console.log("screen off")
        this.sleepMode = true;
        this.setState({ sleepModeActive: true })
      }
    }, SLEEPMODETIMEOUT);
  }



  changeSleepModeStatus = (status) => {
    this.sleepModeStatus = status
    this.sleepModeTimer = setTimeout(() => {
      //turn off screen after SLEEPMODETIMEOUT ms
      if (this.sleepModeStatus === true) {
        console.log("screen off")
        this.sleepMode = true;
        this.setState({ sleepModeActive: true })
      }
    }, SLEEPMODETIMEOUT);
  }

  buttonInterrupt = () => {
    //listen for button interrupts, reset sleep mode timer.
    // console.log("button interrupt")
    if (this.sleepMode) {
      this.sleepMode = false;
      this.setState({ sleepModeActive: false })
      clearTimeout(this.sleepModeTimer)
      console.log("screen on")
      this.sleepModeTimer = setTimeout(() => {
        if (this.sleepModeStatus === true) {
          console.log("screen off")
          this.sleepMode = true;
          this.setState({ sleepModeActive: true })
        }
      }, SLEEPMODETIMEOUT);
    }
  }



  render() {
    return (
      <DeviceContext.Provider value={{
        strings: STRINGS[this.props.language],
        systems: systems,
        theme: curentTheme,
        device: DEVICE_MODEL,
        buttonInterrupt: this.buttonInterrupt,
        changeSleepModeStatus: this.changeSleepModeStatus,
        setScanProperties: this.setScanProperties,
      }}>

        <div className="sleepmode-overlay black-screen" style={{ transform: `scaleY(${this.state.sleepModeActive ? 1 : 0})` }} />


        {this.props.children}
      </DeviceContext.Provider>
    )
  }
}

export default DeviceContextProvider