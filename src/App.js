import React, { Component } from 'react';
import './App.css';

//COMPONENTS
import Statusbar from './Components/Statusbar/Statusbar'
import MainMenu from './Components/Mainmenu/Mainmenu'
import Settings from './Components/Settings/Settings'


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeScreen: "settingsScreen"
    }
  }

  renderScreen = () => {
    switch (this.state.activeScreen) {
      case "menuScreen":
        return (<MainMenu />)
      case "settingsScreen":
        return (<Settings />)
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
