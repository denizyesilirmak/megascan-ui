import React from 'react'
import './CrazyIndicator.css'

const CrazyIndicator = ({ textValue, leftValue, rightValue }) => {

  return (
    <svg width="436" height="350" className="pulse-indicator-crazy">
      <defs>
        <radialGradient x1="50%" y1="100%" x2="50%" y2="0%" id="rgrad" cx="50%" cy="50%" r="50%" >
          <stop offset="0%" stopColor="rgb(0,0,0)" />
          <stop offset="70%" stopColor="rgb(0,0,0)" />
          <stop offset="100%" stopColor="rgb(24,69,122)" />
        </radialGradient>

        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="lgrad" cx="50%" cy="50%" r="50%" >
          <stop offset="0%" stopColor="rgb(0,188,212)" />
          <stop offset="95%" stopColor="rgb(24,69,122)" />
        </linearGradient>

      </defs>

      {/* <g>
        <line x1="218" x2={330} y1={40} y2={40} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={365} y1={70} y2={70} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={385} y1={100} y2={100} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={395} y1={130} y2={130} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={405} y1={160} y2={160} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={405} y1={190} y2={190} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={395} y1={220} y2={220} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={385} y1={250} y2={250} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={365} y1={280} y2={280} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={330} y1={310} y2={310} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />

        <line x1="218" x2={440 - 330} y1={40} y2={40} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 365} y1={70} y2={70} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 385} y1={100} y2={100} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 395} y1={130} y2={130} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 405} y1={160} y2={160} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 405} y1={190} y2={190} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 395} y1={220} y2={220} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 385} y1={250} y2={250} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 365} y1={280} y2={280} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 330} y1={310} y2={310} stroke="#18457a50" strokeWidth="20" strokeLinecap="round" />
      </g> */}

      <g className="indicator-bars-disc">
        {/* right */}
        <line x1="218" x2={330} y1={40} y2={40} stroke={rightValue > 9 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={365} y1={70} y2={70} stroke={rightValue > 8 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={385} y1={100} y2={100} stroke={rightValue > 7 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={395} y1={130} y2={130} stroke={rightValue > 6 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={405} y1={160} y2={160} stroke={rightValue > 5 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={405} y1={190} y2={190} stroke={rightValue > 4 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={395} y1={220} y2={220} stroke={rightValue > 3 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={385} y1={250} y2={250} stroke={rightValue > 2 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={365} y1={280} y2={280} stroke={rightValue > 1 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={330} y1={310} y2={310} stroke={rightValue > 0 ? 'silver' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />

        {/* left */}
        <line x1="218" x2={440 - 330} y1={40} y2={40} stroke={leftValue > 9 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 365} y1={70} y2={70} stroke={leftValue > 8 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 385} y1={100} y2={100} stroke={leftValue > 7 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 395} y1={130} y2={130} stroke={leftValue > 6 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 405} y1={160} y2={160} stroke={leftValue > 5 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 405} y1={190} y2={190} stroke={leftValue > 4 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 395} y1={220} y2={220} stroke={leftValue > 3 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 385} y1={250} y2={250} stroke={leftValue > 2 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 365} y1={280} y2={280} stroke={leftValue > 1 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
        <line x1="218" x2={440 - 330} y1={310} y2={310} stroke={leftValue > 0 ? 'gold' : '#18457a50'} strokeWidth="20" strokeLinecap="round" />
      </g>

      <circle
        cx="218"
        cy="175"
        r="155"
        strokeWidth="16"
        stroke="url(#lgrad)"
        fill="url(#rgrad)"
      />

      <circle
        cx="218"
        cy="175"
        r="122"
        strokeWidth="50"
        stroke="#000000"
        fill="none"
        strokeDasharray="2 16.68"
      />

      <circle
        cx="218"
        cy="175"
        r="140"
        strokeWidth="5"
        stroke="rgb(0,188,212,0.6)"
        fill="none"
        className="animated-indicator-circle"
        style={{
          animationDelay: "0.2s"
        }}
      />

      <circle
        cx="218"
        cy="175"
        r="140"
        strokeWidth="5"
        stroke="rgb(0,188,212,0.6)"
        fill="none"
        className="animated-indicator-circle"
        style={{
          animationDelay: "0.6s"
        }}
      />



      <text
        fill="rgb(24,69,122,0.6)"
        fontSize="145"
        x="218"
        y="188"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Courier"
        fontWeight="bold"
      >
        {textValue}
      </text>

      <text
        fill="url(#rgrad)"
        fontSize="130"
        x="218"
        y="188"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Courier"
        fontWeight="bold"
        stroke="url(#lgrad)"
        strokeWidth="3"
      >
        {textValue}
      </text>

      <g>
        <circle cx="176" cy="260" r="5" fill={textValue > 0 ? 'lime' : '#00ff0040'} stroke="#ffffff" strokeWidth="1" />
        <circle cx="190" cy="260" r="5" fill={textValue > 5 ? 'lime' : '#00ff0040'} stroke="#ffffff" strokeWidth="1" />
        <circle cx="204" cy="260" r="5" fill={textValue > 10 ? 'lime' : '#00ff0040'} stroke="#ffffff" strokeWidth="1" />
        <circle cx="218" cy="260" r="5" fill={textValue > 30 ? 'lime' : '#00ff0040'} stroke="#ffffff" strokeWidth="1" />
        <circle cx="232" cy="260" r="5" fill={textValue > 50 ? 'lime' : '#00ff0040'} stroke="#ffffff" strokeWidth="1" />
        <circle cx="246" cy="260" r="5" fill={textValue > 60 ? 'lime' : '#00ff0040'} stroke="#ffffff" strokeWidth="1" />
        <circle cx="260" cy="260" r="5" fill={textValue > 80 ? 'lime' : '#00ff0040'} stroke="#ffffff" strokeWidth="1" />
      </g>

      <g>
        <rect
          fill="#000000"
          x="134"
          y="89"
          width="162"
          height="30"
          rx="10"
        />
        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="14"
          x="216"
          y="106"
          fill="gold"
          style={{ display: leftValue > 0 ? 'block' : 'none' }}
          className="metal-type-text"
        >
          NON-FERROUS
        </text>

        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="14"
          x="216"
          y="106"
          fill="white"
          style={{ display: rightValue > 0 ? 'block' : 'none' }}
          className="metal-type-text"
        >
          FERROUS
        </text>
      </g>

    </svg>
  )
}

export default CrazyIndicator