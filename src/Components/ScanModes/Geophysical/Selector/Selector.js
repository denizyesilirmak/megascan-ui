import React, { Component } from 'react'
import './Selector.css'

import LeftArrow from '../../../../Assets/MenuIcons/left-arrow1.png'
import RightArrow from '../../../../Assets/MenuIcons/right-arrow1.png'
import ButtonBorder from '../../../../Assets/MenuIcons/button-border.png'
import ButtonIndicator from '../../../../Assets/MenuIcons/button-indicator.png'



class Selector extends Component {
  componentDidMount() {
    this.refs.material.style.backgroundImage = `url(${this.props.selected.sprite})`
  }

  componentDidUpdate() {
    this.refs.material.style.backgroundImage = `url(${this.props.selected.sprite})`
  }

  render() {
    return (
      <div className="geophysical-selector">
        <img className="geo-arrow" src={LeftArrow} alt="left"></img>
        <div className="geo-selected-material" ref="material"></div>
        <img className="geo-button-indicator" src={ButtonIndicator} alt="indicator" style={{ display: this.props.active ? "block" : "none" }}></img>
        <img className="geo-button" src={ButtonBorder} alt="right"></img>
        <img className="geo-arrow" src={RightArrow} alt="right"></img>
        <div className="geo-material-name">{this.props.selected.name}</div>
      </div>
    )
  }
}
export default Selector