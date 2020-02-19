import React, { Component } from 'react'
import './ScanScreen.css'

import * as THREE from "three";

class ScanScreen extends Component {
  componentDidMount() {
    const width = 563;
    const height = this.refs.canvasHolder.clientHeight;
    console.log(width, height);
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -10, 10);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.refs.canvasHolder.appendChild(this.renderer.domElement);
    this.initializeCamera();

    const geometry = new THREE.PlaneBufferGeometry(1, 1, 40, 20);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00FF00, wireframe: true });
    this.cube = new THREE.Mesh(geometry, this.material);
    console.log(geometry)
    this.scene.add(this.cube);
    this.animate();
  }

  animate = () => {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    // this.cube.rotation.y += 0.02
  }

  initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    // this.camera.updateProjectionMatrix();
  }

  render() {
    return (
      <div className="scan-screen component">
        <div className="scan-screen-details"></div>
        <div className="canvas-container" ref="canvasHolder">  </div>
      </div>
    )
  }
}
export default ScanScreen