import React, { Component } from 'react'
import './Carousel.css'

import LeftArrow from '../../Assets/MenuIcons/left-arrow1.png'
import RightArrow from '../../Assets/MenuIcons/right-arrow1.png'

import ButtonIndicator from '../../Assets/MenuIcons/button-indicator.png'

class Carousel extends Component {

  componentDidMount(){
    this.refs.slider.style.transform = 'translateX(' + -220 * this.props.index + 'px)'
  }

  componentDidUpdate () {
    this.refs.slider.style.transform = 'translateX(' + -220 * this.props.index + 'px)'
  }

  render () {
    return (
      <div className='carousel-component'>
        <img src={LeftArrow} className={`left-arrow ${(this.props.index !== -1) ? 'show' : 'hide'}`} alt='la' />
        <img src={RightArrow} className={`right-arrow ${(this.props.index !== this.props.buttons.length - 2) ? 'show' : 'hide'}`} alt='la' />
        <div className='carousel-buttons'>
          <div className='slider' ref='slider'>
            {
              this.props.buttons.map((e, k) => {
                return (
                  <div key={k} className={`carousel-button ${this.props.index + 1 === k ? 'selected' : ''}`}>
                    <img alt='ind' className='indicator' src={ButtonIndicator} style={{ display: (this.props.index + 1 === k) ? 'block' : 'none' }} />
                    <img alt='mi' className='carousel-icon' src={e.icon} />
                    <div className='carousel-title'>{e.name}</div>
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
