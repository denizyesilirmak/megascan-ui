import React, { Component } from 'react'
import './ScanViewer.css'

import gridIcon from '../../Assets/MenuIcons/icon-grid.png'
import saveIcon from '../../Assets/MenuIcons/icon-save-solid.png'
import searchIcon from '../../Assets/MenuIcons/icon-search.png'
import uploadIcon from '../../Assets/MenuIcons/icon-upload.png'
import filterIcon from '../../Assets/MenuIcons/icon-filter.png'
import SocketHelper from '../../SocketHelper'

import Plot from './2DPlotNew'

class ScanViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
      selectedButtonIndex: 0,
      red: 0,
      green: 0,
      blue: 0,
      average: 0
    }
  }


  componentDidMount() {
    SocketHelper.attach(this.handleKeyDown)
    console.log(this.props.fileToOpen)
    fetch('http://192.168.1.114:3030/readfile/' + this.props.fileToOpen)
    // fetch('http://192.168.1.114:3030/readfile/' + "057")

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

  handleKeyDown = (socketData) => {
    if (socketData.type !== "button") {
      return
    }

    switch (socketData.payload) {
      case "left":

        break;
      case "right":

        break;
      case "up":
        if (this.state.selectedButtonIndex > 0) {
          this.setState({
            selectedButtonIndex: this.state.selectedButtonIndex - 1
          })
        }
        break;
      case "down":
        if (this.state.selectedButtonIndex < 4) {
          this.setState({
            selectedButtonIndex: this.state.selectedButtonIndex + 1
          })
        }
        break;
      case "ok":

        break;
      case "back":
        this.props.navigateTo("menuScreen")
        break;
      default:
        break;
    }
  }

  getColorInfo = (red, green, blue, average) => {
    this.setState({ 
      red: Math.trunc(red*100),
      green: Math.trunc(green*100),
      blue: Math.trunc(blue*100),
      average
    })
  }


  render() {
    return (
      <div className="scan-viewer-component component">
        <div className="sv-top">
          <div className="sv-scan-container">
            {
              this.state.fetch ?
                <Plot data={this.normalizedData} getColorInfo={this.getColorInfo} />
                :
                null
            }
          </div>
          <div className="sv-buttons">
            <div className={`sv-button ${this.state.selectedButtonIndex === 0 ? "selected" : null}`} style={{ backgroundImage: `url(${gridIcon})` }}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 1 ? "selected" : null}`} style={{ backgroundImage: `url(${searchIcon})` }}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 2 ? "selected" : null}`} style={{ backgroundImage: `url(${filterIcon})` }}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 3 ? "selected" : null}`} style={{ backgroundImage: `url(${saveIcon})` }}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 4 ? "selected" : null}`} style={{ backgroundImage: `url(${uploadIcon})` }}></div>
          </div>
        </div>
        <div className="sv-bottom">

          <div className="sv-bottom-panel">
            <div className="title">Average</div>
            <div className="value">{this.state.average}</div>
          </div>


          <div className="sv-bottom-panel">
            <div className="title">Depth</div>
            <div className="value">123</div>
          </div>

          <div className="sv-bottom-panel">
            <div className="line-graph-container">
              <div className="line-value" style={{ width: this.state.red + "%", background: "red" }}>

              </div>
            </div>
          </div>

          <div className="sv-bottom-panel">
            <div className="line-graph-container">
              <div className="line-value" style={{ width: this.state.green + "%", background: "green" }}>

              </div>
            </div>
          </div>

          <div className="sv-bottom-panel">
            <div className="line-graph-container">
              <div className="line-value" style={{ width: this.state.blue + "%", background: "blue" }}>

              </div>
            </div>
          </div>



        </div>
      </div>
    )
  }
}


export default ScanViewer