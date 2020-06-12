import React, { Component } from 'react'
import './ScanViewer.css'

import gridIcon from '../../Assets/MenuIcons/icon-grid.png'
import saveIcon from '../../Assets/MenuIcons/icon-save-solid.png'
import searchIcon from '../../Assets/MenuIcons/icon-search.png'
import uploadIcon from '../../Assets/MenuIcons/icon-upload.png'
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
    }
    this.widthLimit = 0
    this.heightLimit = 0
  }


  componentDidMount() {
    SocketHelper.attach(this.handleKeyDown)
    console.log(this.props.fileToOpen)
    fetch('http://localhost:3030/readfile/' + this.props.fileToOpen)
    // fetch('http://192.168.1.114:3030/readfile/' + "057")

      .then(res => res.json())
      .then(data => {
        this.normalizedData = data.data.map(element => {
          return element.reduce((acc, val) => acc.concat(val), []);
        })
        this.widthLimit = (this.normalizedData[0].length / 4 - 1)
        this.heightLimit = (this.normalizedData.length - 2)
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
        if (this.state.selectedButtonIndex < 4 && this.state.analyseMode === false) {
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
        break;
      case "back":
        if(this.state.analyseMode === true){
          this.setState({analyseMode: false})
        }else{
          this.props.navigateTo("menuScreen")
        }
        break;
      default:
        break;
    }
  }

  getColorInfo = (red, green, blue, average, width, height) => {
    this.setState({
      red: Math.trunc(red * 100),
      green: Math.trunc(green * 100),
      blue: Math.trunc(blue * 100),
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
                <Plot data={this.normalizedData} getColorInfo={this.getColorInfo} grid={this.state.grid} selectedBoxPosition={{ width: this.state.width, height: this.state.height }} />
                :
                null
            }
          </div>
          <div className="sv-buttons">
            <div className={`sv-button ${this.state.selectedButtonIndex === 0 ? "selected" : null}`} style={{ backgroundImage: `url(${gridIcon})`, opacity: this.state.analyseMode? 0.3 : 1 }}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 1 ? "selected" : null}`} style={{ backgroundImage: `url(${searchIcon})`}}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 2 ? "selected" : null}`} style={{ backgroundImage: `url(${filterIcon})`, opacity: this.state.analyseMode? 0.3 : 1 }}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 3 ? "selected" : null}`} style={{ backgroundImage: `url(${saveIcon})`, opacity: this.state.analyseMode? 0.3 : 1 }}></div>
            <div className={`sv-button ${this.state.selectedButtonIndex === 4 ? "selected" : null}`} style={{ backgroundImage: `url(${uploadIcon})`, opacity: this.state.analyseMode? 0.3 : 1 }}></div>
          </div>
        </div>
        <div className="sv-bottom">

          <div className="sv-bottom-panel" style={{background: this.context.theme.button_bg_selected}}>
            <div className="title">Average</div>
            <div className="value">{this.state.average}</div>
          </div>

          {
            this.state.analyseMode ?
              <div className="sv-bottom-panel animation" style={{background: this.context.theme.button_bg_selected}}>
                <div className="title">Depth</div>
                <div className="value">0</div>
              </div>
              :
              null
          }


          <div className="sv-bottom-panel" style={{background: this.context.theme.button_bg_selected}}>
              <span>{this.state.red}%</span>
            <div className="line-graph-container">
              <div className="line-value" style={{ width: this.state.red + "%", background: "red" }}>

              </div>
            </div>
          </div>

          <div className="sv-bottom-panel" style={{background: this.context.theme.button_bg_selected}}>
              <span>{this.state.green}%</span>
            <div className="line-graph-container">
              <div className="line-value" style={{ width: this.state.green + "%", background: "green" }}>

              </div>
            </div>
          </div>

          <div className="sv-bottom-panel" style={{background: this.context.theme.button_bg_selected}}>
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