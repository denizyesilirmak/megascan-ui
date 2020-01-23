import React, { Component } from 'react'
import "./TurnOff.css"
import socketHelper from '../../SocketHelper'
import TurnOffIcon from "../../Assets/MenuIcons/reset.png"

class TurnOff extends Component{
  constructor(props){
    super(props)

    this.state = {
      yesNo: false
    }
  }

  componentDidMount(){
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempIndex = this.state.yesNo
    switch (socketData.payload) {
      case 'left':
        tempIndex = !tempIndex
        break
      case 'right':
        tempIndex = !tempIndex
        break
      case 'back':
        console.log("mainmenu: ok")
        this.refs.turnOff.style.transform = "translateY(400px)"
        this.refs.turnOff.style.opacity = 0
        
        setTimeout(() => {
            socketHelper.detach()
            this.props.navigateTo("menuScreen")
        }, 500);
        return
      case 'back':

        return
      default:
        break
    }

    this.setState({
      yesNo: tempIndex
    })
  }

  render(){
    return(
      <div ref="turnOff" className="turn-off component">
        <img alt="turn-off" className="turn-off-icon" src={TurnOffIcon}/>
        <div className="question">
          Do you want to turn off the device?
        </div>
        <div className="turn-off-buttons">
          <div className={`button ${this.state.yesNo ? "selected" : ""}`}>YES</div>
          <div className={`button ${!this.state.yesNo ? "selected" : ""}`}>NO</div>
        </div>

      </div>
    )
  }
}
export default TurnOff