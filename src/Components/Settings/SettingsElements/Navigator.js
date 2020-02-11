import React, { Component } from 'react'
import './Navigator.css'

import LeftArrow from '../../../Assets/MenuIcons/left-arrow2.png'
import RightArrow from '../../../Assets/MenuIcons/right-arrow2.png'

class Navigator extends Component {
  // constructor(props) {
  //   super(props)

  // }

  componentDidUpdate(prevProps) {
    if (prevProps.activeSettingTab % 3 === 2 && this.props.activeSettingTab % 3 === 0) {
      this.refs.naviSlider.style.transform = `translateX(${-1 * this.props.activeSettingTab * 220}px)`
    }
    else if (prevProps.activeSettingTab % 3 === 0 && this.props.activeSettingTab % 3 === 2) {
      this.refs.naviSlider.style.transform = `translateX(${-1 * Math.trunc((this.props.activeSettingTab) / 3) * 660}px)`
    }
  }

  render() {
    return (
      <div className="navigator-component">
        <img alt="left" className={`navigator-left-arrow ${this.props.activeSettingTab !== 0 ? 'show' : 'hide'}`} src={LeftArrow}></img>
        <img alt="right" className={`navigator-right-arrow ${this.props.activeSettingTab !== 9 ? 'show' : 'hide'}`} src={RightArrow}></img>

        <div className="navigator-buttons" ref="naviSlider">
          {
            this.props.buttons.map((e, k) => {
              return (
                <div key={k} className={`navigator-button ${(this.props.activeSettingTab === k && this.props.active) ? 'selected' : ''}`}>
                  {e.name}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Navigator