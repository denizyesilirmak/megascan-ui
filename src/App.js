import React from 'react';
import './App.css';

//COMPONENTS
import Statusbar from './Components/Statusbar/Statusbar'
import MainMenu from './Components/Mainmenu/Mainmenu'


function App() {
  return (
    <div className="App">
      <Statusbar/>
      <MainMenu/>
    </div>
  )
}

export default App;
