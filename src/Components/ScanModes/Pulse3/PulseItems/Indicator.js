import React from 'react'
import './Indicator.css'

const Indicator = (props) => {

  const map = (x, in_min, in_max, out_min, out_max) => {
    return Math.trunc((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
  }

  return (
    <svg width="400" height="366" xmlns="http://www.w3.org/2000/svg">

      <rect
        width="130"
        height="34"
        fill="#a1a115"
        y="67"
        rx="4"
        opacity={props.disc > 0.6 ? 1 : 0.1}

      />

      <text
        fill="#ffffff"
        x="10"
        y="90"
        fontSize="18"
        opacity={props.disc > 0.6 ? 1 : 0.1}
      >
        NONFE
      </text>


      <rect
        width="130"
        height="34"
        fill="#7a7a74"
        y="67"
        x="260"
        rx="4"
        opacity={props.disc < 0.4 ? 1 : 0.1}

      />

      <text
        fill="white"
        x="315"
        y="90"
        fontSize="20"
        opacity={props.disc < 0.4 ? 1 : 0.1}

      >
        FE
      </text>


      <rect
        x="115"
        y="46"
        width="165"
        height="76"
        fill="#000000"
        rx="30"
        stroke="#ffffff"
        strokeWidth="6"
      />

      <text
        fill="#ffffff"
        x="197"
        y="90"
        fontSize="40"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontWeight="bold"
      >
        {map(props.value, 0, 930, 0, 100)}
      </text>

      <g>
        <ellipse className="indicator-elipse" stroke={props.value > 900 ? '#eb3434' : '#303030da'} ry="28" rx="184" cy={314} cx="200" strokeWidth="7" strokeLinecap="round" fill="#000000aa" strokeDasharray={`${props.value / 10 + 90} 20`} />
        <ellipse className="indicator-elipse" stroke={props.value > 800 ? '#eb4634' : '#303030da'} ry="27" rx="175" cy={297} cx="200" strokeWidth="7" strokeLinecap="round" fill="#000000aa" strokeDasharray={`${props.value / 10 + 90} 20`} />
        <ellipse className="indicator-elipse" stroke={props.value > 600 ? '#eb5334' : '#303030da'} ry="25" rx="166" cy={278} cx="200" strokeWidth="7" strokeLinecap="round" fill="#000000aa" strokeDasharray={`${props.value / 10 + 90} 20`} />
        <ellipse className="indicator-elipse" stroke={props.value > 450 ? '#eb6834' : '#303030da'} ry="24" rx="157" cy={260} cx="199" strokeWidth="7" strokeLinecap="round" fill="#000000aa" strokeDasharray={`${props.value / 10 + 90} 20`} />
        <ellipse className="indicator-elipse" stroke={props.value > 300 ? '#eb7734' : '#303030da'} ry="23" rx="149" cy={242} cx="199" strokeWidth="7" strokeLinecap="round" fill="#000000aa" strokeDasharray={`${props.value / 10 + 90} 20`} />
        <ellipse className="indicator-elipse" stroke={props.value > 150 ? '#eb8c34' : '#303030da'} ry="21" rx="137" cy={225} cx="199" strokeWidth="7" strokeLinecap="round" fill="#000000aa" strokeDasharray={`${props.value / 10 + 90} 20`} />
        <ellipse className="indicator-elipse" stroke={props.value > 50 ? '#eba834' : '#303030da'} ry="19" rx="126" cy={206} cx="200" strokeWidth="7" strokeLinecap="round" fill="#000000aa" strokeDasharray={`${props.value / 10 + 90} 20`} />
        <ellipse className="indicator-elipse" stroke={props.value > 10 ? '#ebc334' : '#303030da'} ry="18" rx="118" cy={189} cx="200" strokeWidth="7" strokeLinecap="round" fill="#000000aa" strokeDasharray={`${props.value / 10 + 90} 20`} />
        <ellipse className="indicator-elipse" stroke={props.value > 3 ? '#ebe234' : '#303030da'} ry="17" rx="113" cy={170} cx="200" strokeWidth="7" strokeLinecap="round" fill="#000000aa" strokeDasharray={`${props.value / 10 + 90} 20`} />
      </g>
    </svg>
  )
}

export default Indicator