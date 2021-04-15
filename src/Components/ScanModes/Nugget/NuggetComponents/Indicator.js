import React from 'react'

const Indicator = (props) => {
  return (
    <svg width="396" height="366" >
      <line stroke="#ffffff90" x1="40" y1="168" x2="356" y2="168" strokeWidth="3" />
      <line stroke="#ffffff90" x1="198" y1="10" x2="198" y2="326" strokeWidth="3" />
      <circle className="nugget-circle" cx="198" cy="168" r="20" stroke={props.rawValue > 0 ? "#0ced13" : '#202020'} strokeWidth="6" fill="none" />
      <circle className="nugget-circle" cx="198" cy="168" r="31" stroke={props.rawValue > 10 ? "#48ed0c" : '#202020'} strokeWidth="6" fill="none" />
      <circle className="nugget-circle" cx="198" cy="168" r="42" stroke={props.rawValue > 20 ? "#84ed0c" : '#202020'} strokeWidth="5" fill="none" />
      <circle className="nugget-circle" cx="198" cy="168" r="53" stroke={props.rawValue > 30 ? "#cfed0c" : '#202020'} strokeWidth="5" fill="none" />
      <circle className="nugget-circle" cx="198" cy="168" r="64" stroke={props.rawValue > 40 ? "#edd70c" : '#202020'} strokeWidth="5" fill="none" />
      <circle className="nugget-circle" cx="198" cy="168" r="75" stroke={props.rawValue > 50 ? "#ed970c" : '#202020'} strokeWidth="5" fill="none" />
      <circle className="nugget-circle" cx="198" cy="168" r="87" stroke={props.rawValue > 60 ? "#ed530c" : '#202020'} strokeWidth="5" fill="none" />
      <circle className="nugget-circle" cx="198" cy="168" r="100" stroke={props.rawValue > 70 ? "#ed3d0c" : '#202020'} strokeWidth="5" fill="none" />
      <circle className="nugget-circle" cx="198" cy="168" r="114" stroke={props.rawValue > 80 ? "#ed0c0c" : '#202020'} strokeWidth="6" fill="none" />
      <circle className="nugget-circle" cx="198" cy="168" r="128" stroke={props.rawValue > 90 ? "#ed0c0c" : '#202020'} strokeWidth="7" fill="none" />
      <circle cx="198" cy="168" r="140" stroke="#ffffff90" strokeWidth="3" fill="none" />

      <rect x="130" y="260" width="130" height="70" rx="15" fill="#000000" />
      <text
        x="195"
        y="300"
        alignmentBaseline="middle"
        textAnchor="middle"
        fontSize="55"
        fontWeight="bold"
        fill="#ffffff"
        fontFamily="Courier"
        stroke="#ffffff"
        strokeWidth="1"
      >
        {Math.trunc(props.rawValue)}
      </text>
    </svg>
  )
}

export default Indicator