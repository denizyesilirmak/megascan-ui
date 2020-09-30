import React from 'react'
import './PulseBar.css'

const PulseBar = (props) => {
  return (
    <div className="pulse-bar">
      <svg width="120" height="20" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path stroke="null" d="m15.21066,4.28627l-5.4524,5.78995l5.4524,5.78994l-3.11599,3.31087l-8.56838,-9.10081l8.56838,-9.10151" strokeWidth="1.5" fill="#ffcf56" />
          <path stroke="null" d="m85.30994,15.8943l5.50314,-5.88929l-5.50314,-5.88933l3.14532,-3.36568l8.64913,9.25501l-8.64913,9.25788" strokeWidth="1.5" fill="#ffcf56" />
          <text textAnchor="center" fontFamily="Helvetica, Arial, sans-serif" fontWeight="bold" fontSize="24" y="19" x="104" fill="#ffcf56">{props.value}</text>
          <rect rx="2" height="15" width="6" y="2.5" x="22" fill={props.value <= 0 ? "#404040" : "#ffcf56"} />
          <rect rx="2" height="15" width="6" y="2.5" x="32" fill={props.value <= 1 ? "#404040" : "#ffcf56"} />
          <rect rx="2" height="15" width="6" y="2.5" x="42" fill={props.value <= 2 ? "#404040" : "#ffcf56"} />
          <rect rx="2" height="15" width="6" y="2.5" x="52" fill={props.value <= 3 ? "#404040" : "#ffcf56"} />
          <rect rx="2" height="15" width="6" y="2.5" x="62" fill={props.value <= 4 ? "#404040" : "#ffcf56"} />
          <rect rx="2" height="15" width="6" y="2.5" x="72" fill={props.value <= 5 ? "#404040" : "#ffcf56"} />
        </g>
      </svg>
    </div>
  )
}

export default PulseBar