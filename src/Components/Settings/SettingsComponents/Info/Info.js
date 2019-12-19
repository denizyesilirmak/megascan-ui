import React, { Component } from 'react'
import './Info.css'
import { QRCode } from "react-qr-svg";

class Info extends Component{
  render(){
    return(
      <div className="info-component">
        <div className="info-qr">
        <QRCode
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{ width: 120 }}
                value="some text"
            />
        </div>
        <div className="info-data">
          <div className="info-data-item">
            <div className="title">
              Device Version
            </div>
            <div className="value">
              1.0.9
            </div>
          </div>
          <div className="info-data-item">
            <div className="title">
              Software Version
            </div>
            <div className="value">
              1.0.7
            </div>
          </div>
          <div className="info-data-item">
            <div className="title">
              Model
            </div>
            <div className="value">
              1.9.21
            </div>
          </div>
          <div className="info-data-item">
            <div className="title">
              Serial Number
            </div>
            <div className="value">
              1256886
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Info