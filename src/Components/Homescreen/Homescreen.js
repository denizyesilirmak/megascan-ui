import React, { Component } from 'react'
import './Homescreen.css'
import HomeScreenVideo from '../../Assets/homescreen/homescreen.mp4'
import MegaLogo from '../../Assets/homescreen/mega.png'
import SocketHelper from '../../SocketHelper'
import LiveClock from 'react-live-clock';

class Homescreen extends Component {
  constructor(props) {
    super(props)
    this.date = new Date()
    this.homescreenref = React.createRef()
  }
  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    this.timeout = setTimeout(() => {
      this.homescreenref.current.style.transform = "scale(1)"
      this.homescreenref.current.style.opacity = "1"
      clearTimeout(this.timeout)
    }, 120);


  }

  componentWillUnmount() {
    SocketHelper.detach()

  }

  handleSocket = (socketData) => {
    if (socketData.type !== 'button')
      return

    if (socketData.payload === 'back') {
      this.homescreenref.current.style.transform = "scale(2)"
      this.homescreenref.current.style.opacity = "0"
      setTimeout(() => {
        this.props.navigateTo('menuScreen')
        return
      }, 550);
    }
  }


  render() {
    return (
      <div className="home-screen" ref={this.homescreenref}>
        <div className="home-screen-date-time-container">
          <div className="home-screen-time">
            <LiveClock format={'HH:mm:ss'} ticking={true} />
          </div>
          <div className="home-screen-date">
            {
              this.date.toLocaleDateString('tr-TR')
            }
          </div>
        </div>
        <video
          src={HomeScreenVideo}
          autoPlay
          loop
          id="home-screen-video"
        />
        <img src={MegaLogo} alt="megalogo" id="mega-logo"></img>
      </div>
    )
  }
}

export default Homescreen