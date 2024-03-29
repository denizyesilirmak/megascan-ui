import React, { Component } from 'react'
import './Navigator.css'

import ResponsiveText from '../../../ResponsiveText'

import LeftArrow from '../../../Assets/MenuIcons/left-arrow2.png'
import RightArrow from '../../../Assets/MenuIcons/right-arrow2.png'
import { DeviceContext } from '../../../Contexts/DeviceContext'

class Navigator extends Component {
  static contextType = DeviceContext

  componentDidMount() {
    this.refs.naviSlider.style.transform = `translateX(${-1 * this.props.activeSettingTab * 220}px)`
    this.refs.naviSlider.style.transform = `translateX(${-1 * Math.trunc((this.props.activeSettingTab) / 3) * 660}px)`
  }

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
      <div className="navigator-component" style={{ opacity: this.props.active ? 1 : 0.34 }}>
        <img style={{ filter: this.context.theme.arrorHueRotation }} alt="left" className={`navigator-left-arrow ${(this.props.activeSettingTab !== 0) || this.props.arrowsAlwaysOn ? 'show' : 'hide'}`} src={LeftArrow}></img>
        <img style={{ filter: this.context.theme.arrorHueRotation }} alt="right" className={`navigator-right-arrow ${(this.props.activeSettingTab !== this.props.last) || this.props.arrowsAlwaysOn ? 'show' : 'hide'}`} src={RightArrow}></img>

        <div className="navigator-buttons" ref="naviSlider">
          {
            this.props.buttons.map((e, k) => {
              return (
                <div key={k}
                  style={
                    {
                      background: (this.props.activeSettingTab === k && this.props.active) ? this.context.theme.button_bg_selected : "black",
                      color: (this.props.activeSettingTab === k && this.props.active) ? this.context.theme.selected_text_color : "white",
                      borderColor: this.context.theme.border_color,
                    }
                  }
                  className={`navigator-button`}>
                  <ResponsiveText text={this.context.strings[e.name]} />

                </div>
              )
            })
          }
        </div>
      </div >
    )
  }
}


export default Navigator