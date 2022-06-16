import React, { useContext } from 'react'
import { DeviceContext } from '../../Contexts/DeviceContext'
import './PulseWaitingPopup.css'
import CalibrationIcon from '../../Assets/MenuIcons/calibration.png'

const PulseWaitingPopup = ({ show }) => {
  const device = useContext(DeviceContext)

  if (show) {
    return (
      <div className="pulse-waiting-popup-overlay">
        <div className="pulse-waitin-popup" style={{ borderColor: device.theme.border_color }}>
          <img src={CalibrationIcon} alt="icon" />
          <span>
            {device.strings['calibrationwarning']}
          </span>
          <div className="pulse-popup-waiting-bar-outline">
            <div className="pulse-popup-waiting-bar" />
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }


}

export default PulseWaitingPopup