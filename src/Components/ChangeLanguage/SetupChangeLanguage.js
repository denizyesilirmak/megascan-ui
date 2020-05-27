import React, { Component } from 'react'
import './SetupChangeLanguage.css'


import select from '../../Assets/MenuIcons/button-indicator.png'



class SetupChangeLanguage extends Component {
  render() {
    return (
      <div className="setup-change-language">
        <div className="setup-languages">
          {
            this.props.languages.map((e, i) => {
              return (
                <div key={i} className="setup-language">
                  { 
                    this.props.cursor === i ?
                    <img alt="select" className="setup-lan-selected" src={select} /> : null
                  }
                  <img alt="flag" className="setup-lan-image" src={e.flag} style={{transform: `scale(${this.props.cursor === i ? '1.1' : '1'})`}} />
                  <div className="setup-lan-name"> {e.name} </div>
                </div>
              )
            })
          }

        </div>
      </div>
    )
  }
}
export default SetupChangeLanguage