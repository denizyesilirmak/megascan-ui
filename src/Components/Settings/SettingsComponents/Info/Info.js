import React, { Component, cloneElement } from 'react'
import { QRCode } from "react-qr-svg";
import './Info.css'
import GermanyFlag from '../../../../Assets/MenuIcons/germany.svg'

class Info extends Component {
  render() {
    return (
      <div className="power-settings">
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
              <span>Device Version</span>
              <span>1.0.9</span>
            </div>

            <div className="info-item">
              <span>Software Version</span>
              <span>1.0.8</span>
            </div>

            <div className="info-item">
              <span>Model</span>
              <span>1.9.21</span>
            </div>

            <div className="info-item">
              <span>Serial Number</span>
              <span>7578</span>
            </div>

            <div className="info-item" style={{ justifyContent: "center" }}>
              <span>
                Made in Germany
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