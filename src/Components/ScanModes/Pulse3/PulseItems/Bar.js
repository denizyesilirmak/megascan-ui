import React from 'react'
import './Bar.css'

const Bar = (props) => {
  return (
    <svg width="178" height="367">

      <text
        fontSize="20"
        fill="#ffffff"
        x="89"
        y="30"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {props.label}
      </text>

      <line
        x1="89"
        y1="60"
        x2="89"
        y2="340"
        stroke="#ffffff"
        strokeWidth="6"
      />

      <line
        x1="89"
        y1="60"
        x2="89"
        y2="340"
        stroke="#ffffff"
        strokeWidth="12"
        strokeDasharray="3 31.6"
      />

      <text x={props.left ? '110' : '68'} y="62" fontSize="18" textAnchor="middle" alignmentBaseline="middle" fill={props.active && props.level === 0 ? "#ff0000" : "#ffffff"}>1</text>
      <text x={props.left ? '110' : '68'} y="96" fontSize="18" textAnchor="middle" alignmentBaseline="middle" fill={props.active && props.level === 1 ? "#ff0000" : "#ffffff"}>2</text>
      <text x={props.left ? '110' : '68'} y="131" fontSize="18" textAnchor="middle" alignmentBaseline="middle" fill={props.active && props.level === 2 ? "#ff0000" : "#ffffff"}>3</text>
      <text x={props.left ? '110' : '68'} y="165" fontSize="18" textAnchor="middle" alignmentBaseline="middle" fill={props.active && props.level === 3 ? "#ff0000" : "#ffffff"}>4</text>
      <text x={props.left ? '110' : '68'} y="200" fontSize="18" textAnchor="middle" alignmentBaseline="middle" fill={props.active && props.level === 4 ? "#ff0000" : "#ffffff"}>5</text>
      <text x={props.left ? '110' : '68'} y="235" fontSize="18" textAnchor="middle" alignmentBaseline="middle" fill={props.active && props.level === 5 ? "#ff0000" : "#ffffff"}>6</text>
      <text x={props.left ? '110' : '68'} y="270" fontSize="18" textAnchor="middle" alignmentBaseline="middle" fill={props.active && props.level === 6 ? "#ff0000" : "#ffffff"}>7</text>
      <text x={props.left ? '110' : '68'} y="305" fontSize="18" textAnchor="middle" alignmentBaseline="middle" fill={props.active && props.level === 7 ? "#ff0000" : "#ffffff"}>8</text>
      <text x={props.left ? '110' : '68'} y="340" fontSize="18" textAnchor="middle" alignmentBaseline="middle" fill={props.active && props.level === 8 ? "#ff0000" : "#ffffff"}>9</text>

      {
        props.left ?
          <path
            strokeLinecap="round"
            fill={props.active ? '#ff0000' : '#ffffffad'}
            strokeWidth="4"
            stroke={props.active ? '#ff0000' : '#ffffffad'}
            d={`M60,${50 + props.level * 35} 75,${60 + props.level * 35} 60,${70 + props.level * 35}`}
          />
          :
          <path
            strokeLinecap="round"
            fill={props.active ? '#ff0000' : '#ffffffad'}
            strokeWidth="4"
            stroke={props.active ? '#ff0000' : '#ffffffad'}
            d={`M120,${50 + props.level * 35} 105,${60 + props.level * 35} 120,${70 + props.level * 35}`}
          />
      }

    </svg>
  )
}

export default Bar