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
      {
        props.selectedDiscType === 0 ?
          <g>
            <line className="level-lines" x1="100" x2="150" y1="40" y2="40" strokeWidth="20" stroke={(props.value) > 700 ? '#de2923' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="70" x2="150" y1="70" y2="70" strokeWidth="20" stroke={(props.value) > 500 ? '#de2923' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="50" x2="150" y1="100" y2="100" strokeWidth="20" stroke={(props.value) > 400 ? '#de2923' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="40" x2="150" y1="130" y2="130" strokeWidth="20" stroke={(props.value) > 300 ? '#de4623' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="34" x2="150" y1="160" y2="160" strokeWidth="20" stroke={(props.value) > 200 ? '#db6c53' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="34" x2="150" y1="190" y2="190" strokeWidth="20" stroke={(props.value) > 150 ? '#db7e53' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="40" x2="150" y1="220" y2="220" strokeWidth="20" stroke={(props.value) > 70 ? '#db9253' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="50" x2="150" y1="250" y2="250" strokeWidth="20" stroke={(props.value) > 30 ? '#dba553' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="70" x2="150" y1="280" y2="280" strokeWidth="20" stroke={(props.value) > 10 ? '#dbc253' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="100" x2="150" y1="310" y2="310" strokeWidth="20" stroke={(props.value) > 5 ? '#dbdb53' : '#303030'} strokeLinecap="round" />

            <line className="level-lines" x1="200" x2="335" y1="40" y2="40" strokeWidth="20" stroke={(props.value) > 700 ? '#1c35d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="370" y1="70" y2="70" strokeWidth="20" stroke={(props.value) > 500 ? '#1c35d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="390" y1="100" y2="100" strokeWidth="20" stroke={(props.value) > 400 ? '#1c35d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="400" y1="130" y2="130" strokeWidth="20" stroke={(props.value) > 300 ? '#1c60d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="405" y1="160" y2="160" strokeWidth="20" stroke={(props.value) > 200 ? '#1c7cd6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="405" y1="190" y2="190" strokeWidth="20" stroke={(props.value) > 150 ? '#1c98d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="400" y1="220" y2="220" strokeWidth="20" stroke={(props.value) > 70 ? '#1cbad6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="390" y1="250" y2="250" strokeWidth="20" stroke={(props.value) > 30 ? '#1cd6d0' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="370" y1="280" y2="280" strokeWidth="20" stroke={(props.value) > 10 ? '#1cd6ab' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="335" y1="310" y2="310" strokeWidth="20" stroke={(props.value) > 5 ? '#1cd679' : '#303030'} strokeLinecap="round" />
          </g> : null
      }

      {
        props.selectedDiscType === 1 ?
          <g>
            <line className="level-lines" x1="100" x2="150" y1="40" y2="40" strokeWidth="20" stroke={(props.value) > 700 ? '#de2923' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="70" x2="150" y1="70" y2="70" strokeWidth="20" stroke={(props.value) > 500 ? '#de2923' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="50" x2="150" y1="100" y2="100" strokeWidth="20" stroke={(props.value) > 400 ? '#de2923' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="40" x2="150" y1="130" y2="130" strokeWidth="20" stroke={(props.value) > 300 ? '#de4623' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="34" x2="150" y1="160" y2="160" strokeWidth="20" stroke={(props.value) > 200 ? '#db6c53' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="34" x2="150" y1="190" y2="190" strokeWidth="20" stroke={(props.value) > 150 ? '#db7e53' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="40" x2="150" y1="220" y2="220" strokeWidth="20" stroke={(props.value) > 70 ? '#db9253' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="50" x2="150" y1="250" y2="250" strokeWidth="20" stroke={(props.value) > 30 ? '#dba553' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="70" x2="150" y1="280" y2="280" strokeWidth="20" stroke={(props.value) > 10 ? '#dbc253' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="100" x2="150" y1="310" y2="310" strokeWidth="20" stroke={(props.value) > 5 ? '#dbdb53' : '#303030'} strokeLinecap="round" />

            <line className="level-lines" x1="200" x2="335" y1="40" y2="40" strokeWidth="20" stroke={(props.value) > 700 ? '#de2923' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="370" y1="70" y2="70" strokeWidth="20" stroke={(props.value) > 500 ? '#de2923' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="390" y1="100" y2="100" strokeWidth="20" stroke={(props.value) > 400 ? '#de2923' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="400" y1="130" y2="130" strokeWidth="20" stroke={(props.value) > 300 ? '#de4623' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="405" y1="160" y2="160" strokeWidth="20" stroke={(props.value) > 200 ? '#db6c53' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="405" y1="190" y2="190" strokeWidth="20" stroke={(props.value) > 150 ? '#db7e53' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="400" y1="220" y2="220" strokeWidth="20" stroke={(props.value) > 70 ? '#db9253' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="390" y1="250" y2="250" strokeWidth="20" stroke={(props.value) > 30 ? '#dba553' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="370" y1="280" y2="280" strokeWidth="20" stroke={(props.value) > 10 ? '#dbc253' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="335" y1="310" y2="310" strokeWidth="20" stroke={(props.value) > 5 ? '#dbdb53' : '#303030'} strokeLinecap="round" />
          </g> : null
      }

      {
        props.selectedDiscType === 2 ?
          <g>
            <line className="level-lines" x1="100" x2="150" y1="40" y2="40" strokeWidth="20" stroke={(props.value) > 700 ? '#1c35d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="70" x2="150" y1="70" y2="70" strokeWidth="20" stroke={(props.value) > 500 ? '#1c35d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="50" x2="150" y1="100" y2="100" strokeWidth="20" stroke={(props.value) > 400 ? '#1c35d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="40" x2="150" y1="130" y2="130" strokeWidth="20" stroke={(props.value) > 300 ? '#1c60d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="34" x2="150" y1="160" y2="160" strokeWidth="20" stroke={(props.value) > 200 ? '#1c7cd6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="34" x2="150" y1="190" y2="190" strokeWidth="20" stroke={(props.value) > 150 ? '#1c98d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="40" x2="150" y1="220" y2="220" strokeWidth="20" stroke={(props.value) > 70 ? '#1cbad6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="50" x2="150" y1="250" y2="250" strokeWidth="20" stroke={(props.value) > 30 ? '#1cd6d0' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="70" x2="150" y1="280" y2="280" strokeWidth="20" stroke={(props.value) > 10 ? '#1cd6ab' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="100" x2="150" y1="310" y2="310" strokeWidth="20" stroke={(props.value) > 5 ? '#1cd679' : '#303030'} strokeLinecap="round" />

            <line className="level-lines" x1="200" x2="335" y1="40" y2="40" strokeWidth="20" stroke={(props.value) > 700 ? '#1c35d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="370" y1="70" y2="70" strokeWidth="20" stroke={(props.value) > 500 ? '#1c35d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="390" y1="100" y2="100" strokeWidth="20" stroke={(props.value) > 400 ? '#1c35d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="400" y1="130" y2="130" strokeWidth="20" stroke={(props.value) > 300 ? '#1c60d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="405" y1="160" y2="160" strokeWidth="20" stroke={(props.value) > 200 ? '#1c7cd6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="405" y1="190" y2="190" strokeWidth="20" stroke={(props.value) > 150 ? '#1c98d6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="400" y1="220" y2="220" strokeWidth="20" stroke={(props.value) > 70 ? '#1cbad6' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="390" y1="250" y2="250" strokeWidth="20" stroke={(props.value) > 30 ? '#1cd6d0' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="370" y1="280" y2="280" strokeWidth="20" stroke={(props.value) > 10 ? '#1cd6ab' : '#303030'} strokeLinecap="round" />
            <line className="level-lines" x1="200" x2="335" y1="310" y2="310" strokeWidth="20" stroke={(props.value) > 5 ? '#1cd679' : '#303030'} strokeLinecap="round" />
          </g> : null
      }

      <circle
        cx="218"
        cy="175"
        r={160 - Math.abs(props.value) / 60}
        className="pulse-scale-circle"
        stroke="#18457a"
        strokeWidth="20"
        fill="url('#gradient')"
      />


      <g>
        <circle
          id="svg-p-1"
          cx="218"
          cy="175"
          stroke="#ffffff50"
          strokeWidth="4"
          fill="none"
          style={{
            animationDuration: '1s',
            animationName: props.value > 10 ? 'pulse-p' : 'null'
          }}
        />

        <circle
          id="svg-p-2"
          cx="218"
          cy="175"
          stroke="#ffffff50"
          strokeWidth="4"
          fill="none"
          style={{
            animationDuration: '1s',
            animationName: props.value > 10 ? 'pulse-p' : 'null'
          }}
        />

        <circle
          id="svg-p-3"
          cx="218"
          cy="175"
          stroke="#ffffff50"
          strokeWidth="4"
          fill="none"
          style={{
            animationDuration: '1s',
            animationName: props.value > 10 ? 'pulse-p' : 'null'
          }}
        />
      </g>

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
        {props.valueIndicator}
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
        {props.valueIndicator}
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
        {props.valueIndicator}
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
        {props.value > 30 ? 'Non-Ferrous' : props.value < -30 ? 'Ferrous' : ''}
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
        GB: {Math.trunc(props.groundBalance / 50)}
      </text>

    </svg>
  )
}

export default Indicator