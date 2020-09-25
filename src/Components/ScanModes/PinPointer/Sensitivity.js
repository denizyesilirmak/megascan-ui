import React, { Component } from 'react'
import './Sensitivity.css'
import { DeviceContext } from '../../../Contexts/DeviceContext'

class Sensitivity extends Component {
  static contextType = DeviceContext
  render() {
    return (
      <div className="sensitivity" style={{ background: this.props.selected ? this.context.theme.button_bg_selected : null }}>
        <span>{this.context.strings["sensitivity"]}</span>
        <svg width="120" height="30">
          <g>
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="6.73157" fill={this.props.value < 1 ? '#333333' : '#ffffff'} />
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="17.42017" fill={this.props.value < 2 ? '#333333' : '#ffffff'} />
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="28.23158" fill={this.props.value < 3 ? '#333333' : '#ffffff'} />
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="38.92018" fill={this.props.value < 4 ? '#333333' : '#ffffff'} />
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="49.73377" fill={this.props.value < 5 ? '#333333' : '#ffffff'} />
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="60.42237" fill={this.props.value < 6 ? '#333333' : '#ffffff'} />
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="71.23378" fill={this.props.value < 7 ? '#333333' : '#ffffff'} />
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="81.92239" fill={this.props.value < 8 ? '#333333' : '#ffffff'} />
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="92.661" fill={this.props.value < 9 ? '#333333' : '#ffffff'} />
            <rect rx="2" stroke="null" height="21.99964" width="8.87485" y="4.00018" x="103.3496" fill={this.props.value < 10 ? '#333333' : '#ffffff'} />
          </g>
        </svg>
        <div className="sensitivity-numeric-holder">

          <svg width="40" height="60">
            <g>
              <path transform="rotate(-90 20.000000000000004,11.78031921386719) " id="svg_36" d="m18.05846,11.78033l-4.18015,-12.51955l12.24338,12.51955l-12.24338,12.51953l4.18015,-12.51953z" fill="#ffffff" />
              <path transform="rotate(90 19.999999999999996,48.734630584716804) " stroke="null" id="svg_37" d="m18.05846,48.73464l-4.18015,-12.51954l12.24338,12.51954l-12.24338,12.51953l4.18015,-12.51953z" fill="#ffffff" />
              <text fontFamily="Helvetica, Arial, sans-serif" fontWeight="bold" textAnchor="middle" fontSize="18" y="60%" x="49%" stroke="null" fill="#ffffff">{this.props.value}</text>
            </g>
          </svg>
        </div>
      </div>
    )
  }
}
export default Sensitivity