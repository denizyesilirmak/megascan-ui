import React, { Component } from 'react'
import "./Carousel.css"
import SocketHelper from '../../SocketHelper'

import LeftArrow from '../../Assets/MenuIcons/left-arrow1.png'
import RightArrow from '../../Assets/MenuIcons/right-arrow1.png'

import ButtonIndicator from '../../Assets/MenuIcons/button-indicator.png'
import GroundScanIcon from '../../Assets/MenuIcons/m-ground-scan.png'
import GeoPhysicalIcon from '../../Assets/MenuIcons/m-grophysical.png'
import AutoLRLIcon from '../../Assets/MenuIcons/m-auto-lrl.png'
import CtrlLrlIcon from '../../Assets/MenuIcons/m-ctrl-lrl.png'
import IonicIcon from '../../Assets/MenuIcons/m-ionic.png'
import BionicIcon from '../../Assets/MenuIcons/m-bionic.png'


class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }

    this.buttons = [
      {
        name: "Ground Scan",
        icon: GroundScanIcon
      },
      {
        name: "Geophysical",
        icon: GeoPhysicalIcon
      },
      {
        name: "Auto LRL",
        icon: AutoLRLIcon
      },
      {
        name: "CTRL LRL",
        icon: CtrlLrlIcon
      },
      {
        name: "Ionic",
        icon: IonicIcon
      },
      {
        name: "Bionic",
        icon: BionicIcon
      }
    ]
  }


  componentDidMount() {
    // setInterval(() => {
    //   if (this.state.index < this.buttons.length - 2) {
    //     this.setState({
    //       index: this.state.index + 1
    //     })
    //   } else {
    //     this.setState({
    //       index: -1
    //     })
    //   }

    //   this.refs.slider.style.transform = "translateX(" + -220 * this.state.index + "px)"
    // }, 1500);
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempIndex = this.state.index
    switch (socketData.payload) {
      case 'left':
        if(tempIndex>=0)
        tempIndex--
        break
      case 'right':
        if(tempIndex<this.buttons.length-2)
          tempIndex++
        break
      case 'ok':
        if (this.state.cursorY === 0) {
          
          // localStorage.setItem("turnOffCount", parseInt(localStorage.getItem("turnOffCount")) + 1)
          setTimeout(() => {
            this.props.navigateTo("turningOffScreen")
          }, 200);
        } else if (this.state.cursorY === 1) {
          this.props.navigateTo("menuScreen")
        }

        return
      case 'back':

        return
      default:
        break
    }

    this.setState({
      index: tempIndex
    })
    this.refs.slider.style.transform = "translateX(" + -220 * this.state.index + "px)"
  }


  render() {
    return (
      <div className="carousel-component">
        <img src={LeftArrow} className={`left-arrow ${(this.state.index  !== - 1) ? 'show' : 'hide'}`} alt="la"></img>
        <img src={RightArrow} className={`right-arrow ${(this.state.index  !== this.buttons.length - 2) ? 'show' : 'hide'}`} alt="la" ></img>
        <div className="carousel-buttons">
          <div className="slider" ref="slider">
            {
              this.buttons.map((e, k) => {
                return (
                  <div key={k} className={`carousel-button ${this.state.index + 1 === k ? 'selected' : ''}`}>
                    <img alt="ind" className="indicator" src={ButtonIndicator} style={{ display: (this.state.index + 1 === k) ? 'block' : 'none' }}></img>
                    <img alt="mi" className="carousel-icon" src={e.icon}></img>
                    <div className="carousel-title">{e.name}</div>
                  </div>
                )
              })
            }


            {/* <div className="carousel-button selected">
              <img alt="mi" className="carousel-icon" src={GroundScanIcon}></img>
              <div className="carousel-title">Ground Scan</div>
            </div>

            <div className="carousel-button">
              <img alt="mi" className="carousel-icon" src={GroundScanIcon}></img>
              <div className="carousel-title">Ground Scan</div>
            </div>

            <div className="carousel-button">
              <img alt="mi" className="carousel-icon" src={GroundScanIcon}></img>
              <div className="carousel-title">Ground Scan</div>
            </div>

            <div className="carousel-button">
              <img alt="mi" className="carousel-icon" src={GroundScanIcon}></img>
              <div className="carousel-title">Ground Scan</div>
            </div>

            <div className="carousel-button">
              <img alt="mi" className="carousel-icon" src={GroundScanIcon}></img>
              <div className="carousel-title">Ground Scan</div>
            </div>

            <div className="carousel-button">
              <img alt="mi" className="carousel-icon" src={GroundScanIcon}></img>
              <div className="carousel-title">Ground Scan</div>
            </div> */}

          </div>
        </div>
        <SocketHelper ref="socket" onMessage={this.handleKeyDown} />
      </div >
    )
  }
}

export default Carousel