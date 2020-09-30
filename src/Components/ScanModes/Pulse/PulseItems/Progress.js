import React from 'react'
import './Progress.css'


const Progress = (props) => {
  return (
    <div className="pulse-progress">
      <div className="pulse-progress-container">
        <div style={{ width: props.value + '%' }} className={`pulse-progress-bar ${props.type}`}>

        </div>
      </div>
      <div className="pulse-progress-label">
        {props.label}
      </div>
    </div>
  )
}

export default Progress