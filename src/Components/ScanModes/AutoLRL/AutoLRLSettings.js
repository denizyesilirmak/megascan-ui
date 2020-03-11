import React, { Component } from 'react'
import './AutoLRL.css'

import LeftArrow from '../../../Assets/MenuIcons/left-arrow3.png'
import RightArrow from '../../../Assets/MenuIcons/right-arrow3.png'

import UpArrow from '../../../Assets/MenuIcons/up-arrow.png'
import DownArrow from '../../../Assets/MenuIcons/down-arrow.png'

import DistanceIcon from '../../../Assets/MenuIcons/icon-distance.png'
import DepthIcon from '../../../Assets/MenuIcons/icon-depth.png'



class AutoLRLSettings extends Component {


  map = (x, in_min, in_max, out_min, out_max) => {
    return Math.trunc((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
  }



  render() {
    return (
      <div className="auto-lrl-settings-component">
        <div className="top">
          <div className="auto-lrl-settings-part">
            <div className="value">
              <img alt="arrow" src={UpArrow} />
              <span><span>{this.props.distance}</span><span> M</span></span>
              <img alt="arrow" src={DownArrow} />
            </div>
            {/* <img alt="icon" src={DistanceIcon} /> */}
            <svg width="179.99999999999997" height="80" xmlns="http://www.w3.org/2000/svg"> <g>
              <rect id="canvas_background" height="82" width="182" y="-1" x="-1" />
              <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" />
              </g>
            </g>
              <g>
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) >= 0 ? "#d9bd1e" : "#333"} id="svg_6" d="m7.90014,28.81695c0,0 13.82419,9.57576 0.6,22.79996" stroke-width="5" fill="none" />
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) > 1 ? "#d9bd1e" : "#333"} id="svg_7" d="m19.70012,25.21267c0,0 18.19492,12.60329 0.7897,30.00852" stroke-width="5" fill="none" />
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) > 2 ? "#d9bd1e" : "#333"} id="svg_8" d="m32.5001,22.68968c0,0 21.25443,14.72255 0.92248,35.0545" stroke-width="5" fill="none" />
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) > 3 ? "#d9bd1e" : "#333"} id="svg_9" d="m46.90007,20.5854c0,0 22.12859,16.49011 0.96043,39.26306" stroke-width="5" fill="none" />
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) > 4 ? "#d9bd1e" : "#333"} id="svg_10" d="m61.50005,17.87114c0,0 25.18809,18.77003 1.09321,44.69159" stroke-width="5" fill="none" />
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) > 5 ? "#d9bd1e" : "#333"} id="svg_11" d="m77.90002,14.76912c0,0 28.68468,21.37567 1.24498,50.89563" stroke-width="5" fill="none" />
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) > 6 ? "#d9bd1e" : "#333"} id="svg_12" d="m95.1,12.05485c0,0 31.74418,23.6556 1.37776,56.32416" stroke-width="5" fill="none" />
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) > 7 ? "#d9bd1e" : "#333"} id="svg_13" d="m112.69996,9.72834c0,0 34.36662,25.60983 1.49158,60.97719" stroke-width="5" fill="none" />
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) > 8 ? "#d9bd1e" : "#333"} id="svg_14" d="m132.09993,7.40182c0,0 36.98906,27.56406 1.6054,65.63022" stroke-width="5" fill="none" />
                <path stroke={this.map(this.props.distance, this.props.limits.MINDISTANCE, this.props.limits.MAXDISTANCE, 0, 10) > 9 ? "#d9bd1e" : "#333"} id="svg_2" d="m151.8999,4.68756c0,0 40.04857,29.84399 1.73819,71.05875" stroke-width="5" fill="none" />
              </g>
            </svg>
            <div className={`navigator-button ${this.props.mode ? "selected" : ""}`}>Distance</div>
          </div>

          <div className="auto-lrl-settings-part">
            <div className="value">
              <img alt="arrow" src={UpArrow} />
              <span><span>{this.props.depth}</span><span> M</span></span>
              <img alt="arrow" src={DownArrow} />
            </div>
            {/* <img alt="icon" src={DepthIcon} /> */}
            <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect id="canvas_background" height="82" width="82" y="-1" x="-1" />
                <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                  <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" />
                </g>
              </g>
              <g>
                <path  stroke={this.map(this.props.depth, this.props.limits.MINDEPTH, this.props.limits.MAXDEPTH, 0, 5) >= 0 ? "#d9bd1e" : "#333"} transform="rotate(90 40.00000762939453,7.871353149414067) " id="svg_15" d="m36.8371,-3.52863c0,0 13.82419,9.57576 0.6,22.79996" stroke-width="4" fill="none" />
                <path  stroke={this.map(this.props.depth, this.props.limits.MINDEPTH, this.props.limits.MAXDEPTH, 0, 5) >= 1 ? "#d9bd1e" : "#333"} transform="rotate(90 40.00000000000001,17.87132072448731) " id="svg_16" d="m35.23217,0.68671c0,0 20.83892,14.43473 0.90445,34.36922" stroke-width="4" fill="none" />
                <path  stroke={this.map(this.props.depth, this.props.limits.MINDEPTH, this.props.limits.MAXDEPTH, 0, 5) >= 2 ? "#d9bd1e" : "#333"} transform="rotate(90 40.00000000000001,27.377464294433597) " id="svg_17" d="m33.38032,3.51827c0,0 28.93285,20.04126 1.25575,47.71838" stroke-width="4" fill="none" />
                <path  stroke={this.map(this.props.depth, this.props.limits.MINDEPTH, this.props.limits.MAXDEPTH, 0, 5) >= 3 ? "#d9bd1e" : "#333"} transform="rotate(90 40,38.3650817875938) " id="svg_18" d="m31.77539,8.72126c0,0 35.94759,24.90024 1.5602,59.28765" stroke-width="4" fill="none" />
                <path  stroke={this.map(this.props.depth, this.props.limits.MINDEPTH, this.props.limits.MAXDEPTH, 0, 5) >= 4 ? "#d9bd1e" : "#333"} transform="rotate(90 40,49.84651947021485) " id="svg_19" d="m30.41737,15.80183c0,0 41.88314,28.59688 1.81782,68.08938" stroke-width="4" fill="none" />
                <path  stroke={this.map(this.props.depth, this.props.limits.MINDEPTH, this.props.limits.MAXDEPTH, 0, 5) >= 5 ? "#d9bd1e" : "#333"} transform="rotate(90 40.00000000000001,62.56252670288086) " id="svg_6" d="m30.047,26.6891c0,0 43.50192,30.13298 1.88808,71.74685" stroke-width="4" fill="none" />
              </g>
            </svg>
            <div className={`navigator-button ${!this.props.mode ? "selected" : ""}`}>Depth</div>
          </div>
        </div>
        <div className="bottom">

        </div>
      </div>
    )
  }
}

export default AutoLRLSettings