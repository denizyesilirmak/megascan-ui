import React, { Component } from 'react'
import "./Carousel.css"

import ButtonIndicator from '../../Assets/MenuIcons/button-indicator.png'
// import ButtonBorder from '../../Assets/MenuIcons/button-border.png'
import GroundScanIcon from '../../Assets/MenuIcons/ground-scan.png'

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
        icon: GroundScanIcon
      },
      {
        name: "Auto LRL",
        icon: GroundScanIcon
      },
      {
        name: "CTRL LRL",
        icon: GroundScanIcon
      },
      {
        name: "Ionic",
        icon: GroundScanIcon
      },
      {
        name: "Bionic",
        icon: GroundScanIcon
      }
    ]
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.index < this.buttons.length - 2) {
        this.setState({
          index: this.state.index + 1
        })
      } else {
        this.setState({
          index: -1
        })
      }

      this.refs.slider.style.transform = "translateX(" + -220 * this.state.index + "px)"
    }, 1500);
  }

  render() {
    return (
      <div className="carousel-component">
        <div className="carousel-buttons">
          <div className="slider" ref="slider">
            {
              this.buttons.map((e, k) => {
                return (
                  <div key={k} className={`carousel-button ${this.state.index + 1 === k ? 'selected' : ''}`}>
                    <img alt="ind" className="indicator" src={ButtonIndicator} style={{ display: (this.state.index + 1 === k) ? 'block' : 'none' }}></img>
                    <img alt="mi" className="carousel-icon" src={GroundScanIcon}></img>
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
      </div >
    )
  }
}

export default Carousel