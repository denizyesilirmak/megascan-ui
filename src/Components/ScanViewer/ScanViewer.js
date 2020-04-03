import React, { Component } from 'react'
import './ScanViewer.css'

import gridIcon from '../../Assets/MenuIcons/icon-grid.png'
import saveIcon from '../../Assets/MenuIcons/icon-save-solid.png'
import searchIcon from '../../Assets/MenuIcons/icon-search.png'
import uploadIcon from '../../Assets/MenuIcons/icon-upload.png'
import filterIcon from '../../Assets/MenuIcons/icon-filter.png'

import Plot from './2DPlot'

class ScanViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false
    }
  }
  componentDidMount() {
    console.log(this.props.fileToOpen)
    fetch('http://192.168.1.114:3030/readfile/' + this.props.fileToOpen)
      .then(res => res.json())
      .then(data => {
        this.normalizedData = data.data.map(element => {
          return element.reduce((acc, val) => acc.concat(val), []);
        })
        setTimeout(() => {
          this.setState({
            fetch: true
          })
        }, 1000);

      })
  }
  render() {
    return (
      <div className="scan-viewer-component component">
        <div className="sv-top">
          <div className="sv-scan-container">
            {
              this.state.fetch ?
              <Plot data={this.normalizedData} />
              :
              null
            }
          </div>
          <div className="sv-buttons">
            <div className="sv-button" style={{ backgroundImage: `url(${gridIcon})` }}></div>
            <div className="sv-button" style={{ backgroundImage: `url(${searchIcon})` }}></div>
            <div className="sv-button" style={{ backgroundImage: `url(${filterIcon})` }}></div>
            <div className="sv-button" style={{ backgroundImage: `url(${saveIcon})` }}></div>
            <div className="sv-button" style={{ backgroundImage: `url(${uploadIcon})` }}></div>
          </div>
        </div>
        <div className="sv-bottom">

        </div>
      </div>
    )
  }
}
export default ScanViewer