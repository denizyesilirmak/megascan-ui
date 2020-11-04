import React from 'react'
import './Suprise.css'
import * as THREE from "three";

class Suprise extends React.Component {
  constructor(props) {
    super(props)
    this.canvasHolder = React.createRef()
  }

  componentDidMount() {
    const width = 800;
    const height = 480;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(width, height);
    this.canvasHolder.current.appendChild(this.renderer.domElement);
    this.addElement()
    this.initializeCamera();
    this.animate()
  }

  addElement = () => {
    const vertices = []
    for (let i = 0; i < 40000; i++) {

      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200000);

      vertices.push(x, y, z);

    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0xffff00, size: 2 });
    const points = new THREE.Points(geometry, material);
    this.scene.add(points);

  }

  initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 100400
  }

  animate = () => {
    this.camera.position.z -= 6
    this.camera.rotation.y += 0.02
    this.camera.rotation.x += 0.01
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div className="suprise">
        <div className="suprise-text">
          bunu yazan tosun okuyana kosun
        </div>
        <div className="canvas-container-suprise" ref={this.canvasHolder}>  </div>
      </div>
    )
  }
}

export default Suprise

