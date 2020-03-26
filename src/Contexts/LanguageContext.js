import React, { createContext, Component } from 'react'
const STRINGS = require('./Strings.json')
export const LanguageContext = createContext()

class LanguageContextProvider extends Component {
  render() {
    return (
      <LanguageContext.Provider value={STRINGS[this.props.language]}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}

export default LanguageContextProvider