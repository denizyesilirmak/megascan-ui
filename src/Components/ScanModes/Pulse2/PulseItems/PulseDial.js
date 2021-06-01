import React, { useContext } from 'react'
import './PulseDial.css'

import { DeviceContext } from '../../../../Contexts/DeviceContext'

const PulseDial = (props) => {
  const context = useContext(DeviceContext)

  return (
    <div className="pulse-dial" style={{ background: props.active ? context.theme.button_bg_selected : '#000000', color: props.active ? context.theme.selected_text_color : '#ffffff' }}>
      <div className="label">{props.label}</div>
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="#ffffff"
          stroke="#aaaaaa"
          strokeWidth="3"
        />
        <path
          d="m 20 60 a 1 1 0 0 1 80 0"
          strokeWidth="5"
          stroke="black"
          fill="none"
        />
        <path
          d="m 20 60 a 1 1 0 0 1 80 0"
          strokeWidth="7"
          stroke="green"
          fill="none"
          strokeDasharray="10 140"
        />
        <text x="60" y="65" alignmentBaseline="middle" textAnchor="middle" fontWeight="bold" fontSize="24" fill="black">30</text>

      </svg>
    </div>
  )
}

export default PulseDial