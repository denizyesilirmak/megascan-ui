import React, { Component } from 'react'
import './Carousel.css'
import LeftArrow from '../../Assets/MenuIcons/left-arrow1.png'
import RightArrow from '../../Assets/MenuIcons/right-arrow1.png'
import ButtonIndicator from '../../Assets/MenuIcons/button-indicator_deniz.png'

import { DeviceContext } from '../../Contexts/DeviceContext'
import ResponsiveText from '../../ResponsiveText'
//import { clamp } from 'lodash'

class Carousel extends Component {
  static contextType = DeviceContext
  componentDidMount() {
    this.refs.slider.style.transform = 'translateX(' + -220 * this.props.index + 'px)'
  }

  componentDidUpdate() {
    this.refs.slider.style.transform = 'translateX(' + -220 * this.props.index + 'px)'
  }

  render() {
    return (
      <div className='carousel-component'>
        <img src={LeftArrow} style={{ filter: this.context.theme.arrorHueRotation }} className={`left-arrow ${(this.props.index !== -1) ? 'show' : 'hide'}`} alt='la' />
        <img src={RightArrow} style={{ filter: this.context.theme.arrorHueRotation }} className={`right-arrow ${(this.props.index !== this.props.buttons.length - 2) ? 'show' : 'hide'}`} alt='la' />
        <div className='carousel-buttons'>
          <div className='slider' ref='slider'>
            {
              this.props.buttons.map((e, k) => {
                return (
                  <div
                    key={k}
                    className={`carousel-button ${this.props.index + 1 === k ? 'selected' : ''}`}
                  >
                    <img alt='ind' className='indicator' src={ButtonIndicator} style={{ display: (this.props.index + 1 === k) ? 'block' : 'none' }} />
                    <img alt='mi' className='carousel-icon' src={e.icon} />
                    <div className='carousel-title' style={{ color: this.context.theme.carousel_menu_text_color }}>
                      <ResponsiveText text={this.context.strings[e.name]} />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div >
    )
  }
}

export default Carousel
