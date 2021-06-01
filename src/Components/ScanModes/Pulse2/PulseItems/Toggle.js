import React, { useContext } from 'react'
import './Toggle.css'
import { DeviceContext } from '../../../../Contexts/DeviceContext'

const Toggle = (props) => {
  const context = useContext(DeviceContext)
  return (
    <div className={`pulse2-toggle`}
      style={{ background: props.active ? context.theme.button_bg_selected : '#000000', color: props.active ? context.theme.selected_text_color : '#ffffff' }}
    >
      <div className="label">{props.label}</div>
      <div className={`toggle-indicator ${props.on ? 'active' : ''}`} />
    </div>
  )
}

export default Toggle