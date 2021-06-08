import React, { useContext } from 'react'
import './Slider.css'
import { DeviceContext } from '../../../../Contexts/DeviceContext'
import DownIcon from '../../../../Assets/MenuIcons/icons8-sort-down-60.png'
import UpIcon from '../../../../Assets/MenuIcons/icons8-sort-up-60.png'

const Slider = (props) => {
  const context = useContext(DeviceContext)

  return (
    <div className="slider-pulse">
      <div className="title">{context.strings['treshold']}</div>
      <div className="slider-pulse-value">{props.value}</div>

      <div className="slider-container" style={{
        background: props.active ? context.theme.button_bg_selected : '#000000'
      }}>
        <img className="pulse-slider-icon" src={UpIcon} alt="up" />
        <svg width="30" height="170" >

          <line x1="15" x2="15" y1="15" y2="155"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <circle
            cx="15"
            cy={(props.value * 14) + 15}
            r="10"
            fill="#404040"
            stroke="#ffffff"
            strokeWidth="2"
          />


        </svg>
        <img className="pulse-slider-icon" src={DownIcon} alt="down" />
      </div>
    </div>
  )
}

export default Slider