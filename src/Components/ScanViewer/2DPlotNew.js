import React, { Component, useEffect } from 'react'
import * as THREE from "three";
import './2DPlotNew.css';
import SandClock from './signs.svg'
const Interpolation = require('./Interpolation.js');

const COLORS = {
  jet: [
    { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 63, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 127, color: { r: 0x00, g: 0xad, b: 0x00 } },
    { pct: 192, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 255, color: { r: 0xff, g: 0x00, b: 0x00 } }
  ]
}

class Plot extends Component {
  constructor(plot) {
    super(plot)

    this.state = {
      waiting: false
    }
    // // console.log(this.props.data)
    // this.data = [
    //   [212, 210, 203, 202, 207, 206, 206, 215, 209, 210],
    //   [210, 204, 209, 212, 214, 211, 214, 212, 210, 215],
    //   [209, 212, 210, 251, 148, 255, 226, 210, 213, 210],
    //   [214, 212, 220, 255, 243, 255, 208, 216, 215, 211],
    //   [213, 207, 211, 229, 243, 232, 189, 219, 214, 217],
    //   [211, 199, 201, 197, 205, 164, 185, 213, 216, 210],
    //   [212, 214, 195, 193, 218, 205, 198, 210, 209, 212],
    //   [211, 203, 211, 205, 194, 188, 200, 213, 208, 214],
    //   [209, 203, 203, 210, 209, 207, 215, 205, 208, 216],
    //   [207, 207, 211, 205, 206, 209, 212, 210, 215, 214],
    //   [214, 211, 215, 210, 207, 210, 212, 216, 215, 213]
    // ]

    this.data = this.props.data
    this.total = 0
    this.average = 0
    this.max = 0
    this.min = 255
    let count = 0

    this.graphMesh = null

    for (let i of this.data) {
      for (let a of i) {
        this.total += a
        count++
        if (a < this.min) {
          this.min = a
        }
        if (a > this.max) {
          this.max = a
        }
      }
    }

    this.average = Math.trunc(this.total / count)
    console.log(`total:${this.total} average:${this.average} max: ${this.max} min: ${this.min}`)

    this.normalizedArr = this.data.map((e, i) => {
      return e.map((a, i) => {
        let tmp = a - this.average
        if (tmp >= 0) {
          return Math.trunc(this.map(tmp, 0, this.max - this.average, 0, 127)) + 127
        }
        else {
          return Math.trunc(this.map(tmp, 0, this.min - this.average, 0, -127)) + 127
        }
      })
    })

    let red = 0
    let green = 0
    let blue = 0
    this.normalizedArr.forEach((e) => {
      e.forEach(a => {
        if (a >= 192) {
          red++
        }
        else if (a < 192 && a > 64) {
          green++
        }
        else if (a <= 64) {
          blue++
        }
      })
    })
    console.log(count)
    console.log(red, green, blue)
    this.props.getColorInfo(red / count, green / count, blue / count, this.average)

  }

  map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  componentDidMount() {
    const width = this.refs.canvasHolder.clientWidth;
    const height = this.refs.canvasHolder.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-0.50, 0.50, 0.50, -0.50, -10, 10);
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(width, height);
    this.refs.canvasHolder.appendChild(this.renderer.domElement);
    this.initializeCamera();
    this.drawPlot()
    this.initGrid()
    this.drawSelectedData()
    this.renderPlot()

    // setTimeout(() => {
    //   this.filterGreens()
    // }, 1500);
  }

  drawPlot = () => {
    this.setState({ waiting: true })
    const interpolatedMatrix = (Interpolation(this.normalizedArr, 2))
    this.plotGeometry = new THREE.PlaneGeometry(1, 1, interpolatedMatrix[0].length - 1, interpolatedMatrix.length - 1);
    let sutun = 0
    let satir = 0
    for (let i = 0; i < this.plotGeometry.faces.length; i += 2) {
      satir = Math.trunc(i / ((interpolatedMatrix[0].length - 1) * 2))
      sutun = Math.trunc((i % ((interpolatedMatrix[0].length - 1) * 2)) / 2)
      // i. face
      let face = this.plotGeometry.faces[i]
      face.color = new THREE.Color(this.getColor(interpolatedMatrix[satir][sutun]))
      // i+1 face
      face = this.plotGeometry.faces[i + 1]
      face.color = new THREE.Color(this.getColor(interpolatedMatrix[satir][sutun]))
    }
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, vertexColors: THREE.VertexColors });
    this.graphMesh = new THREE.Mesh(this.plotGeometry, this.material);
    this.scene.add(this.graphMesh);
    this.setState({ waiting: false })
  }

  getColor = (pct) => {
    for (var i = 1; i < COLORS.jet.length - 1; i++) {
      if (pct < COLORS.jet[i].pct) {
        break;
      }
    }
    const lower = COLORS.jet[i - 1];
    const upper = COLORS.jet[i];
    const range = upper.pct - lower.pct;
    const rangePct = (pct - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  }

  renderPlot = () => {
    this.renderer.render(this.scene, this.camera);
  }

  initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    // this.camera.updateProjectionMatrix();
  }

  drawSelectedData = () => {
    console.log("selected")
    var material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 3,
    });

    var points = [];
    points.push(new THREE.Vector3(0, 0, 1));
    points.push(new THREE.Vector3((1 / (this.data[0].length) * 4), 0, 1));
    points.push(new THREE.Vector3((1 / (this.data[0].length) * 4), -(1 / (this.data.length - 1)), 1));
    points.push(new THREE.Vector3(0, -(1 / (this.data.length - 1)), 1));


    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.selectedBox = new THREE.LineLoop(geometry, material);
    this.selectedBox.position.x = - 0.5
    this.selectedBox.position.y = 0.5
    this.scene.add(this.selectedBox);
  }

  initGrid = () => {
    console.log("init grid")
    var material = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 1,
      opacity: 0.4,
      transparent: true
    });

    var points = [];
    for (let i = 0; i < this.data.length; i++) {
      points.push(new THREE.Vector3(-0.5, 0.5 - i * (1 / (this.data.length - 1)), 0));
      points.push(new THREE.Vector3(.5, 0.5 - i * (1 / (this.data.length - 1)), 0));
    }

    for (let i = 0; i < this.data[0].length / 4; i++) {
      points.push(new THREE.Vector3(-0.5 + i * (1 / (this.data[0].length) * 4), 0.5, 0));
      points.push(new THREE.Vector3(-0.5 + i * (1 / (this.data[0].length) * 4), -0.5, 0));
    }

    this.gridGeometry = new THREE.BufferGeometry().setFromPoints(points);
    this.gridMesh = new THREE.LineSegments(this.gridGeometry, material);
    this.scene.add(this.gridMesh);
  }

  filterGreens = () => {
    this.setState({ waiting: true })
    this.plotGeometry.elementsNeedUpdate = true;
    this.plotGeometry.faces.forEach((e, i) => {
      if (e.color.g > 0.4 && e.color.r < 0.6 && e.color.b < 0.6) {
        this.plotGeometry.faces[i].color = new THREE.Color(0x000000)
      }
      // if (e.color.g > 0.67)
    })
    console.log("bitti")
    this.renderPlot();
    this.setState({ waiting: false })
  }

  showHideGrid = (gridStatus) => {
    this.gridMesh.visible = gridStatus;
    this.renderPlot();
  }

  moveSelectedBox = (x, y) => {
    this.selectedBox.position.x = - 0.5 + x * ((1 / (this.data[0].length) * 4))
    this.selectedBox.position.y = 0.5 - y * (1 / (this.data.length - 1))

    this.renderPlot()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.grid !== this.props.grid) {
      console.log("grid change")
      this.showHideGrid(this.props.grid)
    }
    if ((prevProps.selectedBoxPosition.width !== this.props.selectedBoxPosition.width) || (prevProps.selectedBoxPosition.height !== this.props.selectedBoxPosition.height)) {
      console.log("move")
      this.moveSelectedBox(this.props.selectedBoxPosition.width, this.props.selectedBoxPosition.height)
    }

    let c = 0
    const rerender = setInterval(() => {
      this.renderer.render(this.scene, this.camera);
      c++;
      if (c === 15)
        clearInterval(rerender )
    }, 5);
  }

  render() {
    return (
      <div className="plot">
        {
          this.state.waiting ?
            <div className="plot-preloader">
              <img src={SandClock}></img>
            </div>
            :
            null
        }

        <div className="canvas-container-sv" ref="canvasHolder">  </div>
      </div>
    )
  }
}
export default Plot