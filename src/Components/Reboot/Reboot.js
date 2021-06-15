import React from 'react'
import './Reboot.css'
import SocketHelper from '../../SocketHelper'

class Reboot extends React.Component {
  componentDidMount() {
    console.log("reboot request in 5 seconds")
    setTimeout(() => {
      SocketHelper.send(JSON.stringify({
        'type': 'settings',
        'mode': 'reboot' 
      }))
    }, 5000);
  }

  render() {
    return (
      <div className="reboot component">
        <div className="reboot-text">
          Please wait... Your device will reboot in a second! Please do not unplug the battery socket!
        </div>
      </div>
    )
  }
}

export default Reboot