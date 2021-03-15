import React from 'react'

const Modes = (props) => {
  return (
    <>
      <div className="vlf-mode-panel-title">
        Scan Modes
      </div>

      <div className={`vlf-mode ${props.cursor === 0 && props.focus ? 'selected' : ''}`}>
        <div className="vlf-mode-title">General</div>
        <div className="vlf-mode-toggle" style={{ background: props.activeMode === 0 ? 'lime' : '#000' }}></div>
      </div>

      <div className={`vlf-mode ${props.cursor === 1 && props.focus ? 'selected' : ''}`}>
        <div className="vlf-mode-title">Stable</div>
        <div className="vlf-mode-toggle" style={{ background: props.activeMode === 1 ? 'lime' : '#000' }}></div>
      </div>

      <div className={`vlf-mode ${props.cursor === 2 && props.focus ? 'selected' : ''}`}>
        <div className="vlf-mode-title">High Sens.</div>
        <div className="vlf-mode-toggle" style={{ background: props.activeMode === 2 ? 'lime' : '#000' }}></div>
      </div>

      <div className={`vlf-mode ${props.cursor === 3 && props.focus ? 'selected' : ''}`}>
        <div className="vlf-mode-title">Ferrous</div>
        <div className="vlf-mode-toggle" style={{ background: props.activeMode === 3 ? 'lime' : '#000' }}></div>
      </div>

      <div className={`vlf-mode ${props.cursor === 4 && props.focus ? 'selected' : ''}`}>
        <div className="vlf-mode-title">Non Fe.</div>
        <div className="vlf-mode-toggle" style={{ background: props.activeMode === 4 ? 'lime' : '#000' }}></div>
      </div>

      <div className={`vlf-mode ${props.cursor === 5 && props.focus ? 'selected' : ''}`}>
        <div className="vlf-mode-title">Custom</div>
        <div className="vlf-mode-toggle" style={{ background: props.activeMode === 5 ? 'lime' : '#000' }}></div>
      </div>

    </>
  )
}

export default Modes