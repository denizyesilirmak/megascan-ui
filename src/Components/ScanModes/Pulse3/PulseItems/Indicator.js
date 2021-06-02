import React from 'react'
import './Indicator.css'

const colors = [
  "#1cfc03",
  "#62fc03",
  "#adfc03",
  "#f4fc03",
  "#fcca03",
  "#fc9403",
  "#fc5e03",
  "#fc3903",
  "#fc1803",
]

const Indicator = (props) => {

  const getColor = (value) => {
    if (value < 5) {
      return '#303030'
    }
    else if (value >= 5 && value < 20) {
      return colors[0]
    }
    else if (value >= 20 && value < 50) {
      return colors[1]
    }
    else if (value >= 50 && value < 80) {
      return colors[2]
    }
    else if (value >= 80 && value < 120) {
      return colors[3]
    }
    else if (value >= 120 && value < 200) {
      return colors[4]
    }
    else if (value >= 200 && value < 400) {
      return colors[5]
    }
    else if (value >= 400 && value < 600) {
      return colors[6]
    }
    else if (value >= 600) {
      return colors[7]
    }
  }

  return (
    <svg width="400" height="366" xmlns="http://www.w3.org/2000/svg">
      <g>
        <ellipse className="indicator-elipse" stroke={getColor(props.dataHistory[8])} ry="28" rx="184" cy={314 } cx="200" strokeWidth="5" fill="#000000aa" />
        <ellipse className="indicator-elipse" stroke={getColor(props.dataHistory[7])} ry="27" rx="175" cy={297 - props.dataHistory[7] / 800} cx="200" strokeWidth="5" fill="#000000aa" />
        <ellipse className="indicator-elipse" stroke={getColor(props.dataHistory[6])} ry="25" rx="166" cy={278 - props.dataHistory[6] / 700} cx="200" strokeWidth="5" fill="#000000aa" />
        <ellipse className="indicator-elipse" stroke={getColor(props.dataHistory[5])} ry="24" rx="157" cy={260 - props.dataHistory[5] / 600} cx="199" strokeWidth="5" fill="#000000aa" />
        <ellipse className="indicator-elipse" stroke={getColor(props.dataHistory[4])} ry="23" rx="149" cy={242 - props.dataHistory[4] / 500} cx="199" strokeWidth="5" fill="#000000aa" />
        <ellipse className="indicator-elipse" stroke={getColor(props.dataHistory[3])} ry="21" rx="137" cy={225 - props.dataHistory[3] / 400} cx="199" strokeWidth="5" fill="#000000aa" />
        <ellipse className="indicator-elipse" stroke={getColor(props.dataHistory[2])} ry="19" rx="126" cy={206 - props.dataHistory[2] / 300} cx="200" strokeWidth="5" fill="#000000aa" />
        <ellipse className="indicator-elipse" stroke={getColor(props.dataHistory[1])} ry="18" rx="118" cy={189 - props.dataHistory[1] / 200} cx="200" strokeWidth="5" fill="#000000aa" />
        <ellipse className="indicator-elipse" stroke={getColor(props.dataHistory[0])} ry="17" rx="113" cy={170 - props.dataHistory[0] / 100} cx="200" strokeWidth="5" fill="#000000aa" />
      </g>
    </svg>
  )
}

export default Indicator