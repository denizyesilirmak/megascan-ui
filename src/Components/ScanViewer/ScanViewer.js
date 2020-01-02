import React, { Component } from 'react'
import './ScanViewer.css'

import gridIcon from '../../Assets/MenuIcons/icon-grid.png'
import saveIcon from '../../Assets/MenuIcons/icon-save-solid.png'
import searchIcon from '../../Assets/MenuIcons/icon-search.png'
import uploadIcon from '../../Assets/MenuIcons/icon-upload.png'
import filterIcon from '../../Assets/MenuIcons/icon-filter.png'

class ScanViewer extends Component {
  render() {
    return (
      <div className="scan-viewer-component component">
        <div className="sv-top">
          <div className="sv-scan-container">

          </div>
          <div className="sv-buttons">
            <div className="sv-button" style={{backgroundImage: `url(${gridIcon})`}}></div>
            <div className="sv-button" style={{backgroundImage: `url(${searchIcon})`}}></div>
            <div className="sv-button" style={{backgroundImage: `url(${filterIcon})`}}></div>
            <div className="sv-button" style={{backgroundImage: `url(${saveIcon})`}}></div>
            <div className="sv-button" style={{backgroundImage: `url(${uploadIcon})`}}></div>
          </div>
        </div>
        <div className="sv-bottom">

        </div>
      </div>
    )
  }
}
export default ScanViewer