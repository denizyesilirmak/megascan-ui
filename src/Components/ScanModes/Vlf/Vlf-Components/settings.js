import React from 'react'

import LeftArrowIcon from '../../../../Assets/MenuIcons/left-arrow2.png'
import RightArrowIcon from '../../../../Assets/MenuIcons/right-arrow2.png'
import ToneIcon from '../../../../Assets/MenuIcons/icon-tone.png'

const VLFSettings = (props) => {
  const map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }


  return (
    <>
      <div className="vlf-mode-panel-title">
        Settings
            </div>
      <div className={`vlf-setting ${props.cursor === 0 && props.focus ? 'selected' : ''} ${props.cursor === 0 && props.settingsSelected ? 'active' : ''}`}>
        <div className="vlf-setting-title">
          Treshold
              </div>
        <div className="vlf-setting-bar">
          <svg width="160" height="52">
            <rect x="10" y="15" width="110" height="23" rx="5" fill="none" stroke="#ffffff" strokeWidth="2" />
            <rect x="13" y="18" width={map(props.treshold, 0, 10, 5, 104)} height="17" rx="5" fill="lime" />
            <text fill="#ffffff" x="140" y="26" alignmentBaseline="middle" textAnchor="middle">{props.treshold}</text>
          </svg>
        </div>
      </div>

      <div className={`vlf-setting ${props.cursor === 1 && props.focus ? 'selected' : ''} ${props.cursor === 1 && props.settingsSelected ? 'active' : ''}`}>
        <div className="vlf-setting-title">
          Sensitivity
              </div>
        <div className="vlf-setting-bar">
          <svg width="160" height="52">
            <rect x="10" y="15" width="110" height="23" rx="5" fill="none" stroke="#ffffff" strokeWidth="2" />
            <rect x="13" y="18" width={map(props.sensitivity, 0, 10, 5, 104)} height="17" rx="5" fill="lime" />
            <text fill="#ffffff" x="140" y="26" alignmentBaseline="middle" textAnchor="middle">{props.sensitivity}</text>
          </svg>
        </div>
      </div>

      <div className={`vlf-setting ${props.cursor === 2 && props.focus ? 'selected' : ''} ${props.cursor === 2 && props.settingsSelected ? 'active' : ''}`}>
        <div className="vlf-setting-title">
          Discrimination
              </div>
        <div className="vlf-setting-bar">
          <svg width="160" height="52">
            <image href={LeftArrowIcon} x="0" y="10" width="30" height="30" />
            <image href={RightArrowIcon} x="130" y="10" width="30" height="30" />
            <text fill="#ffffff" x="80" y="26" alignmentBaseline="middle" fontSize="16" fontWeight="bold" textAnchor="middle">{props.discrimination}</text>
          </svg>
        </div>
      </div>

      <div className={`vlf-setting ${props.cursor === 3 && props.focus ? 'selected' : ''} ${props.cursor === 3 && props.settingsSelected ? 'active' : ''}`}>
        <div className="vlf-setting-title">
          Tone
              </div>
        <div className="vlf-setting-bar">
          <svg width="160" height="52">
            <image href={ToneIcon} x="15" y="10" width="25" height="25" />

            <image href={LeftArrowIcon} x="60" y="10" width="30" height="30" />
            <image href={RightArrowIcon} x="120" y="10" width="30" height="30" />

            <text fill="#ffffff" x="104" y="26" alignmentBaseline="middle" fontSize="20" textAnchor="middle">{props.tone}</text>
          </svg>
        </div>
      </div>
    </>
  )
}

export default VLFSettings