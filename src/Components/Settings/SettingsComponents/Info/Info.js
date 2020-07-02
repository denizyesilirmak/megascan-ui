import React, { Component } from 'react'
import { QRCode } from "react-qr-svg";
import './Info.css'
import GermanyFlag from '../../../../Assets/MenuIcons/germany.svg'
import { DeviceContext } from '../../../../Contexts/DeviceContext'

class Info extends Component {
  static contextType = DeviceContext

  componentDidMount = () => {
    setTimeout(() => {
      try {
        this.refs.sc.style.opacity = 1
      } catch (error) {
        console.warn("couldn't catch speed")

      }
    }, 15);
  }

  componentDidCatch(error, info) {
    console.log("ERROR")
  }

  render() {
    return (
      <div ref="sc" className="power-settings">
        <div className="info-container">
          <div className="info-left">
            <QRCode
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="Q"
              style={{ width: 160 }}
              value="A1357"
            />
          </div>

          <div className="info-right">
            <div className="info-item">
              <span>{this.context.strings["deviceversion"]}</span>
              <span>1.0.9</span>
            </div>

            <div className="info-item">
              <span>{this.context.strings["softwareversion"]}</span>
              <span>1.0.8</span>
            </div>

            <div className="info-item">
              <span>{this.context.strings["model"]}</span>
              <span>1.9.21</span>
            </div>

            <div className="info-item">
              <span>{this.context.strings["serialnumber"]}</span>
              <span>{this.props.serial}</span>
            </div>

            <div className="info-item" style={{ justifyContent: "center" }}>
              <span>
                {this.context.strings["madeingermany"]}
              </span>
              <img alt="gf" id="germany-flag" src={GermanyFlag}></img>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Info