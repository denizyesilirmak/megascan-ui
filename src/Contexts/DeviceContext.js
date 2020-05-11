import React, { createContext, Component } from 'react'
const STRINGS = require('./_Strings.json')
const DEVICE_MODEL = require('./_DeviceInfo.json').deviceModelName
const DEVICE_LIST = require('./_DeviceList.json')
export const DeviceContext = createContext()

// console.log(DEVICE_MODEL)
// console.log(DEVICE_LIST[DEVICE_MODEL])
const systems = DEVICE_LIST[DEVICE_MODEL]
// console.log(systems)

class DeviceContextProvider extends Component {
  render() {
    return (
      <DeviceContext.Provider value={{ strings: STRINGS[this.props.language], systems: systems}}>
        {this.props.children}
      </DeviceContext.Provider>
    )
  }
}

export default DeviceContextProvider