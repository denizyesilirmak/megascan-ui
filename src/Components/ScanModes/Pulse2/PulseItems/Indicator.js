import React from 'react'
import './Indicator.css'

const Indicator = (props) => {
  return (
    <svg width="436" height="350" className="pulse-2-indicator">
      <defs>
        <radialGradient id="gradient">
          <stop offset="60%" stopColor="#000000" />
          <stop offset="95%" stopColor="#133c6e" />
        </radialGradient>
      </defs>

      <g>
        <line x1="100" x2="150" y1="40" y2="40" strokeWidth="20" stroke="#d12a00" strokeLinecap="round" />
        <line x1="70" x2="150" y1="70" y2="70" strokeWidth="20" stroke="#d12a00" strokeLinecap="round" />
        <line x1="50" x2="150" y1="100" y2="100" strokeWidth="20" stroke="#d12a00" strokeLinecap="round" />
        <line x1="40" x2="150" y1="130" y2="130" strokeWidth="20" stroke="#d12a00" strokeLinecap="round" />
        <line x1="34" x2="150" y1="160" y2="160" strokeWidth="20" stroke="#d14600" strokeLinecap="round" />
        <line x1="34" x2="150" y1="190" y2="190" strokeWidth="20" stroke="#d15700" strokeLinecap="round" />
        <line x1="40" x2="150" y1="220" y2="220" strokeWidth="20" stroke="#d17300" strokeLinecap="round" />
        <line x1="50" x2="150" y1="250" y2="250" strokeWidth="20" stroke="#d19200" strokeLinecap="round" />
        <line x1="70" x2="150" y1="280" y2="280" strokeWidth="20" stroke="#d1ab00" strokeLinecap="round" />
        <line x1="100" x2="150" y1="310" y2="310" strokeWidth="20" stroke="#d1ca00" strokeLinecap="round" />
      </g>

      <g>
        <line x1="200" x2="335" y1="40" y2="40" strokeWidth="20" stroke="#005bd1" strokeLinecap="round" />
        <line x1="200" x2="370" y1="70" y2="70" strokeWidth="20" stroke="#005bd1" strokeLinecap="round" />
        <line x1="200" x2="390" y1="100" y2="100" strokeWidth="20" stroke="#005bd1" strokeLinecap="round" />
        <line x1="200" x2="400" y1="130" y2="130" strokeWidth="20" stroke="#005bd1" strokeLinecap="round" />
        <line x1="200" x2="405" y1="160" y2="160" strokeWidth="20" stroke="#005bd1" strokeLinecap="round" />
        <line x1="200" x2="405" y1="190" y2="190" strokeWidth="20" stroke="#006cd1" strokeLinecap="round" />
        <line x1="200" x2="400" y1="220" y2="220" strokeWidth="20" stroke="#0084d1" strokeLinecap="round" />
        <line x1="200" x2="390" y1="250" y2="250" strokeWidth="20" stroke="#0092d1" strokeLinecap="round" />
        <line x1="200" x2="370" y1="280" y2="280" strokeWidth="20" stroke="#00b2d1" strokeLinecap="round" />
        <line x1="200" x2="335" y1="310" y2="310" strokeWidth="20" stroke="#00bcd1" strokeLinecap="round" />
      </g>


      <circle
        cx="218"
        cy="175"
        r="150"
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
        {props.value}
      </text>
      <text
        fill="#ffffff20"
        x="218"
        y="185"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="126"
        fontFamily="Courier"
        fontWeight="bold"
      >
        {props.value}
      </text>
      <text
        fill="#ffffff20"
        x="218"
        y="185"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="142"
        fontFamily="Courier"
        fontWeight="bold"
      >
        {props.value}
      </text>

      <text
        fill="#ffffff"
        x="218"
        y="245"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="20"
        fontFamily="Courier"
        fontWeight="bold"
      >
        Non-Ferrous
      </text>

      <text
        fill="#ffffff90"
        x="218"
        y="275"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="25"
        fontFamily="Courier"
        fontWeight="bold"
      >
        GB:20
      </text>

    </svg>
  )
}

export default Indicator