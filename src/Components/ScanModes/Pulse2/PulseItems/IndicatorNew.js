import React from 'react'
import './IndicatorNew.css'

const IndicatorNew = ({ value }) => {

  return (
    <svg width="436" height="350" className="pulse-2-indicator">
      <defs>
        <radialGradient id="gradient">
          <stop offset="60%" stopColor="#000000" />
          <stop offset="95%" stopColor="#133c6e" />
        </radialGradient>
      </defs>

      <line
        x1="210"
        x2="320"
        y1="300"
        y2="300"
        stroke="#ffffff"
        strokeWidth="20"
        strokeLinecap="round"
      />

      <line
        x1="210"
        x2="350"
        y1="270"
        y2="270"
        stroke="#ffffff"
        strokeWidth="20"
        strokeLinecap="round"
      />

      <line
        x1="210"
        x2="320"
        y1="50"
        y2="50"
        stroke="#ffffff"
        strokeWidth="20"
        strokeLinecap="round"
      />

      <circle
        cx="218"
        cy="175"
        r="140"
        stroke="#18457a"
        strokeWidth="20"
        fill="url('#gradient')"
      />
      <text
        fill="#ffffff"
        x="218"
        y="185"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="110"
        fontFamily="Courier"
        fontWeight="bold"
      >
        {value}
      </text>
      <text
        fill="#ffffff50"
        x="218"
        y="185"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="120"
        fontFamily="Courier"
        fontWeight="bold"
      >
        {value}
      </text>
      <text
        fill="#ffffff50"
        x="218"
        y="185"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="130"
        fontFamily="Courier"
        fontWeight="bold"
      >
        {value}
      </text>


    </svg>
  )
}

export default IndicatorNew