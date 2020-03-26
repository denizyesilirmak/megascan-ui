import React, { createContext, Component } from 'react'
const STRINGS = require('./Strings.json')
export const LanguageContext = createContext()

class LanguageContextProvider extends Component {
  state = {
    currentLanguage: 'tr'
  }
  render() {
    return (
      <LanguageContext.Provider value={STRINGS[this.state.currentLanguage]}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}

export default LanguageContextProvider