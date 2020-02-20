import React, { Component } from 'react'
import './ScanScreen.css'

import * as THREE from "three";

class ScanScreen extends Component {
  constructor(props) {
    super(props)
    this.y = 20
    this.x = 10 * 4
  }

  componentDidMount() {
    const createMatrix = (x, y) => Array(y).fill().map(() => Array(x).fill([0, 0, 0, 0]))
    this.matrix = createMatrix(10, 20)
    this.currentPoint = {
      x: null,
      y: null
    }

    this.width = this.matrix[0].length
    this.height = this.matrix.length




    const width = 563;
    const height = this.refs.canvasHolder.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-0.51, 0.52, 0.52, -0.52, -10, 10);
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(width, height);
    this.refs.canvasHolder.appendChild(this.renderer.domElement);
    this.initializeCamera();

    this.geometry = new THREE.PlaneGeometry(1, 1, this.x, this.y);
    this.material = new THREE.MeshBasicMaterial({ wireframe: false, vertexColors: THREE.VertexColors });

    // this.geometry.faces[0].color = new THREE.Color("red")
    // this.geometry.faces[1].color = new THREE.Color("red")

    console.log(this.matrix)
    // for (let i = 0; i < this.matrix.length; i++) {
    //   for (let j = 0; j < this.matrix[i].length; j++) {
    //     for (let k = 0; k < this.matrix[i][j].length; k++) {
    //       this.colorSquare((j * 4) + k, i)
    //     }
    //   }
    // }

    // this.colorSquare(0,0,1)

    setInterval(() => {
      this.zigzag("left")
      this.matrix[this.currentPoint.y][this.currentPoint.x] = [Math.trunc(Math.random() * 255), Math.trunc(Math.random() * 255), Math.trunc(Math.random() * 255), Math.trunc(Math.random() * 255)]

      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          for (let k = 0; k < this.matrix[i][j].length; k++) {
            this.colorSquare((j * 4) + k, i, this.matrix[i][j][k])
            // this.geometry.verticesNeedUpdate = true;
            // this.geometry.elementsNeedUpdate = true;
            // this.geometry.morphTargetsNeedUpdate = true;
            // this.geometry.uvsNeedUpdate = true;
            // this.geometry.normalsNeedUpdate = true;
            // this.geometry.colorsNeedUpdate = true;
            // this.geometry.tangentsNeedUpdate = true;
          }
        }
      }


    }, 10);




    this.graphMesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.graphMesh);
    // this.initGrid()
    this.animate();
  }

  colorSquare = (x, y, c) => {
    let index = ((y) * 2 * this.x) + (x) * 2;
      this.geometry.faces[index].color = new THREE.Color(c)
      this.geometry.faces[index + 1].color = new THREE.Color(c)


  }

  animate = () => {
    this.geometry.verticesNeedUpdate = true;
    this.geometry.elementsNeedUpdate = true;
    this.geometry.morphTargetsNeedUpdate = true;
    this.geometry.uvsNeedUpdate = true;
    this.geometry.normalsNeedUpdate = true;
    this.geometry.colorsNeedUpdate = true;
    this.geometry.tangentsNeedUpdate = true;
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  initGrid = () => {
    const grid_geometry = new THREE.PlaneBufferGeometry(1, 1, this.x / 4, this.y);
    const grid_material = new THREE.MeshBasicMaterial({ wireframe: true });
    const grid_mesh = new THREE.Mesh(grid_geometry, grid_material);
    grid_mesh.position.z = 1
    this.scene.add(grid_mesh);
  }

  initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    // this.camera.updateProjectionMatrix();
  }

  print = (matrix) => matrix.map(row => row.join('\t')).join('\n')

  parallel = (startPos) => {
    // First run
    if (this.currentPoint.x === null) {
      let startPoint = { x: null, y: null }

      if (startPos === 'left') {
        startPoint = {
          x: 0,
          y: this.height - 1
        }
      } else if (startPos === 'right') {
        startPoint = {
          x: this.width - 1,
          y: this.height - 1
        }
      }
      this.currentPoint = startPoint
    } else {
      // Point change
      if (startPos === 'left') {
        // Sinirdaysa bir sey yapma
        if (this.currentPoint.x === this.width - 1 && this.currentPoint.y === 0) return this.currentPoint
        // Y'yi sifira kadar kucult
        // Y sifir ise X'i arttir, Y'yi resetle
        if (this.currentPoint.y > 0) {
          this.currentPoint.y--
        } else if (this.currentPoint.y === 0) {
          this.currentPoint.x++
          this.currentPoint.y = this.height - 1
        }
      } else if (startPos === 'right') {
        // Sinirdaysa bir sey yapma
        if (this.currentPoint.x === 0 && this.currentPoint.y === 0) return this.currentPoint
        // Y'yi sifira kadar kucult
        // Y sifir ise X'i azalt, Y'yi resetle
        if (this.currentPoint.y > 0) {
          this.currentPoint.y--
        } else if (this.currentPoint.y === 0) {
          this.currentPoint.x--
          this.currentPoint.y = this.height - 1
        }
      }
    }
  }

  zigzag = (startPos) => {
    // First run
    if (this.currentPoint.x === null) {
      let startPoint = { x: null, y: null }

      if (startPos === 'left') {
        startPoint = {
          x: 0,
          y: this.height - 1
        }
      } else if (startPos === 'right') {
        startPoint = {
          x: this.width - 1,
          y: this.height - 1
        }
      }
      this.currentPoint = startPoint
    } else {
      // Point change
      if (startPos === 'left') {
        // - cift yukari
        // - tek asagi
        const dir = (this.currentPoint.x % 2 === 0) ? 'up' : 'down'

        // Sinirdaysa bir sey yapma
        if (this.currentPoint.y === 0 && this.currentPoint.x === this.width - 1 && dir === 'up') return this.currentPoint
        if (this.currentPoint.y === this.height - 1 && this.currentPoint.x === this.width - 1 && dir === 'down') return this.currentPoint

        // Yon degisiyorsa X'i arttir
        if ((this.currentPoint.y === 0 && dir === 'up') || (this.currentPoint.y === this.height - 1 && dir === 'down')) {
          // Sadece X degisiyor
          this.currentPoint.x++
        } else {
          // Sadece Y degisiyor
          if (dir === 'up') {
            this.currentPoint.y--
          } else {
            this.currentPoint.y++
          }
        }
      } else if (startPos === 'right') {
        let dir
        // this.Width cift ise:
        // - tek yukari
        // - cift asagi
        if (this.width % 2 === 0) {
          dir = (this.currentPoint.x % 2 === 0) ? 'down' : 'up'
        } else {
          // this.Width tek ise:
          // - cift yukari
          // - tek asagi
          dir = (this.currentPoint.x % 2 === 0) ? 'up' : 'down'
        }

        // Sinirdaysa bir sey yapma
        if (this.currentPoint.y === 0 && this.currentPoint.x === 0 && dir === 'up') return this.currentPoint
        if (this.currentPoint.y === this.height - 1 && this.currentPoint.x === 0 && dir === 'down') return this.currentPoint

        // Yon degisiyorsa X'i arttir
        if ((this.currentPoint.y === 0 && dir === 'up') || (this.currentPoint.y === this.height - 1 && dir === 'down')) {
          // Sadece X degisiyor
          this.currentPoint.x--
        } else {
          // Sadece Y degisiyor
          if (dir === 'up') {
            this.currentPoint.y--
          } else {
            this.currentPoint.y++
          }
        }
      }
    }
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