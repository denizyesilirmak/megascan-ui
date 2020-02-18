import React, { Component } from 'react'
import './ScanScreen.css'

import * as THREE from "three";

class ScanScreen extends Component {
  componentDidMount() {
    const width = this.refs.canvasHolder.clientWidth;
    const height = this.refs.canvasHolder.clientHeight;
    this.scene = new THREE.Scene();
    var aspect = width / (height)
    let viewsize = 10;
    // this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera = new THREE.OrthographicCamera(viewsize * aspect / - 2, viewsize * aspect / 2, viewsize / 2, viewsize / - 2, -100, 100);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.refs.canvasHolder.appendChild(this.renderer.domElement);
    this.initializeCamera();

  }

  initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.zoom = 1.3;
    this.camera.updateProjectionMatrix();
  }

  render() {
    return (
      <div className="scan-screen component">
        <div className="canvas-container" ref="canvasHolder">  </div>
      </div>
    )
  }
}
export default ScanScreen