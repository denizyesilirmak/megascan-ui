import React from 'react';
import battery_icon from '../../../Assets/sta-battery.png'

function Battery() {
  return (
    <div>
      <img style={{marginRight:13, marginLeft: 13}} alt="battery" src={battery_icon}></img>
    </div>
  );
}

export default Battery