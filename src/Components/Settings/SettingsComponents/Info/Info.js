import React, { Component } from 'react'
import { QRCode } from "react-qr-svg";
import './Info.css'
import GermanyFlag from '../../../../Assets/MenuIcons/germany.svg'
import { LanguageContext } from '../../../../Contexts/LanguageContext'

class Info extends Component {
  static contextType = LanguageContext
  componentDidMount = () => {
    setTimeout(() => {
      this.refs.sc.style.opacity = 1
    }, 15);
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
              <span>{this.context["deviceversion"]}</span>
              <span>1.0.9</span>
            </div>

            <div className="info-item">
              <span>{this.context["softwareversion"]}</span>
              <span>1.0.8</span>
            </div>

            <div className="info-item">
              <span>{this.context["model"]}</span>
              <span>1.9.21</span>
            </div>

            <div className="info-item">
              <span>{this.context["serialnumber"]}</span>
              <span>7578</span>
            </div>

            <div className="info-item" style={{ justifyContent: "center" }}>
              <span>
                {this.context["madeingermany"]}
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