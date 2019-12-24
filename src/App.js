import React, { Component } from 'react';
import './App.css';

//COMPONENTS
import Statusbar from './Components/Statusbar/Statusbar'
import MainMenu from './Components/Mainmenu/Mainmenu'
import Settings from './Components/Settings/Settings'

import AutoLRL from './Components/ScanModes/AutoLRL/AutoLRL'
import CtrlLRL from './Components/ScanModes/CtrlLRL/CtrlLRL'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeScreen: "settingsScreen"
    }
  }

  navigateTo = (screenName) => {
    console.log(screenName)
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
      case "autoLrlScanScreen":
        return (<AutoLRL navigateTo={this.navigateTo} />)
      case "ctrlLrlScanScreen":
        return (<CtrlLRL navigateTo={this.navigateTo} />)
      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <Statusbar />
        {
          this.renderScreen()
        }
      </div>
    )
  }

}

export default App;
