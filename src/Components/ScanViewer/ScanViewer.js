import React, { Component } from 'react'
import './ScanViewer.css'

import gridIcon from '../../Assets/MenuIcons/icon-grid.png'
// import saveIcon from '../../Assets/MenuIcons/icon-save-solid.png'
import searchIcon from '../../Assets/MenuIcons/icon-search.png'
// import uploadIcon from '../../Assets/MenuIcons/icon-upload.png'
import filterIcon from '../../Assets/MenuIcons/icon-filter.png'
import SocketHelper from '../../SocketHelper'

import Plot from './2DPlotNew'
import { DeviceContext } from '../../Contexts/DeviceContext'

class ScanViewer extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
      selectedButtonIndex: 0,
      red: 0,
      green: 0,
      blue: 0,
      average: 0,
      grid: false,
      analyseMode: false,
      width: 0,
      height: 0,
      filter: false,
      depth: 0,
      min: 0,
      max: 0,
      dataPopup: false,
      newAverage: 0
    }
    this.widthLimit = 0
    this.heightLimit = 0
  }


  componentDidMount() {
    SocketHelper.attach(this.handleKeyDown)
    //console.log(this.props.fileToOpen)
    fetch('http://localhost:9090/readfile/' + this.props.fileToOpen)
      // fetch('http://192.168.1.114:9090/readfile/' + "057")

      .then(res => res.json())
      .then(data => {
        this.normalizedData = data.data.map(element => {
          return element.reduce((acc, val) => acc.concat(val), []);
        })
        this.widthLimit = (this.normalizedData[0].length / 4 - 1)
        this.heightLimit = (this.normalizedData.length - 2)
        let timeout = setTimeout(() => {
          this.setState({
            fetch: true
          })
          clearTimeout(timeout)
        }, 400);
      })

  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== "button") {
      return
    }

    switch (socketData.payload) {
      case "start":
        if (this.state.analyseMode === true) {
          this.setState({
            dataPopup: !this.state.dataPopup
          })

        }
        break;
      case "left":
        if (this.state.analyseMode === true) {
          //move selected data box
          if (this.state.width > 0) {
            this.setState({ width: this.state.width - 1 })
          }

        }
        break;
      case "right":
        if (this.state.analyseMode === true) {
          //move selected data box
          if (this.state.width < this.widthLimit) {
            this.setState({ width: this.state.width + 1 })
          }
        }
        break;
      case "up":
        if (this.state.selectedButtonIndex > 0 && this.state.analyseMode === false) {
          this.setState({
            selectedButtonIndex: this.state.selectedButtonIndex - 1
          })
        }
        if (this.state.analyseMode === true) {
          //move selected data box
          if (this.state.height > 0) {
            this.setState({ height: this.state.height - 1 })
          }

        }
        break;
      case "down":
        if (this.state.selectedButtonIndex < 2 && this.state.analyseMode === false) {
          this.setState({
            selectedButtonIndex: this.state.selectedButtonIndex + 1
          })
        }
        if (this.state.analyseMode === true) {
          //move selected data box
          if (this.state.height < this.heightLimit) {
            this.setState({ height: this.state.height + 1 })
          }
        }
        break;
      case "ok":
        if (this.state.selectedButtonIndex === 0) {
          this.setState({
            grid: !this.state.grid
          })
        }
        else if (this.state.selectedButtonIndex === 1) {
          this.setState({
            analyseMode: !this.state.analyseMode
          })
        }
        else if (this.state.selectedButtonIndex === 2) {
          this.setState({
            filter: !this.state.filter
          })
        }
        break;
      case "back":
        if (this.state.analyseMode === true) {
          this.setState({ analyseMode: false })
        } else {
          this.props.navigateTo("fileListScreen")
        }
        break;
      default:
        break;
    }
    if (this.state.analyseMode) {
      const sensorsAvarage = (this.normalizedData[this.state.height][this.state.width * 4 + 0] + this.normalizedData[this.state.height][this.state.width * 4 + 1] + this.normalizedData[this.state.height][this.state.width * 4 + 2] + this.normalizedData[this.state.height][this.state.width * 4 + 3]) / 4
      this.setState({
        depth: this.calculateDepth(sensorsAvarage, this.state.max, this.state.min, this.state.average),
        newAverage: parseInt(sensorsAvarage)

      })
    }
    // console.log(this.normalizedData[this.state.height][this.state.width * 4 + 1])
  }

  getColorInfo = (red, green, blue, average, min, max) => {
    //console.log(min, max)
    this.setState({
      red: Math.trunc(red * 100),
      green: Math.trunc(green * 100),
      blue: Math.trunc(blue * 100),
      min,
      max
    })
  }

  calculateDepth = (point, max, min, average) => {
    if (isNaN(Math.abs(parseInt(point) - Math.floor(average)) / (max - min) * 3.5)) {
      return 0
    } else {
      return Math.abs(parseInt(point) - Math.floor(average)) / (max - min) * 3.5
    }
  }


  render() {
    return (
      <div className="scan-viewer-component component">

        {
          this.state.analyseMode && this.state.dataPopup ?
            <div className="scan-viewer-data-popup">
              <div className="svdp sen">
                {this.normalizedData[this.state.height][this.state.width * 4 + 0]}
              </div>
              <div className="svdp sen">
                {this.normalizedData[this.state.height][this.state.width * 4 + 1]}
              </div>
              <div className="svdp sen">
                {this.normalizedData[this.state.height][this.state.width * 4 + 2]}
              </div>
              <div className="svdp sen">
                {this.normalizedData[this.state.height][this.state.width * 4 + 3]}
              </div>
            </div> : null
        }



        <div className="sv-top">
          <div className="sv-scan-container">
            {
              this.state.fetch ?
                <Plot data={this.normalizedData} filter={this.state.filter} getColorInfo={this.getColorInfo} grid={this.state.grid} selectedBoxPosition={{ width: this.state.width, height: this.state.height }} />
                :
                null
            }
          </div>
          <div className="sv-buttons">
            <div className={`sv-button ${this.state.selectedButtonIndex === 0 ? "selected" : null}`} style={{ backgroundImage: `url(${gridIcon})`, opacity: this.state.analyseMode ? 0.3 : 1, borderColor: this.state.selectedButtonIndex === 0 ? this.context.theme.border_color : null }}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 1 ? "selected" : null}`} style={{ backgroundImage: `url(${searchIcon})`, borderColor: this.state.selectedButtonIndex === 1 ? this.context.theme.border_color : null }}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 2 ? "selected" : null}`} style={{ backgroundImage: `url(${filterIcon})`, opacity: this.state.analyseMode ? 0.3 : 1, borderColor: this.state.selectedButtonIndex === 2 ? this.context.theme.border_color : null }}></div>
            {/* <div className={`sv-button ${this.state.selectedButtonIndex === 3 ? "selected" : null}`} style={{ backgroundImage: `url(${saveIcon})`, opacity: this.state.analyseMode? 0.3 : 1 }}></div> */}
            {/* <div className={`sv-button ${this.state.selectedButtonIndex === 4 ? "selected" : null}`} style={{ backgroundImage: `url(${uploadIcon})`, opacity: this.state.analyseMode? 0.3 : 1 }}></div> */}
          </div>
        </div>
        <div className="sv-bottom">

          {
            this.state.analyseMode ?
              <>
                <div className="sv-bottom-panel" style={{ background: this.context.theme.button_bg_selected }}>
                  <div className="title">{this.context.strings["average"]}</div>
                  <div className="value">{this.state.newAverage}</div>
                </div>

                <div className="sv-bottom-panel animation" style={{ background: this.context.theme.button_bg_selected }}>
                  <div className="title">{this.context.strings["depth"]}</div>
                  <div className="value">{this.state.depth.toFixed(1)}</div>
                </div>
              </>
              :
              null
          }


          <div className="sv-bottom-panel" style={{ background: this.context.theme.button_bg_selected }}>
            <span>{this.state.red}%</span>
            <div className="line-graph-container">
              <div className="line-value" style={{ width: this.state.red + "%", background: "red" }}>

              </div>
            </div>
          </div>

          <div className="sv-bottom-panel" style={{ background: this.context.theme.button_bg_selected }}>
            <span>{this.state.green}%</span>
            <div className="line-graph-container">
              <div className="line-value" style={{ width: this.state.green + "%", background: "green" }}>

              </div>
            </div>
          </div>

          <div className="sv-bottom-panel" style={{ background: this.context.theme.button_bg_selected }}>
            <span>{this.state.blue}%</span>
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