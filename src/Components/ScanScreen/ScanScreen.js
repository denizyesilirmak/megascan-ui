import React, { Component } from 'react'
import './ScanScreen.css'
import * as THREE from "three";
import GridTexture from '../../Assets/grid.svg'
import socketHelper from '../../SocketHelper'

const COLORS = {
  jet: [
    { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 67, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 127, color: { r: 0x00, g: 0xad, b: 0x00 } },
    { pct: 192, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 255, color: { r: 0xff, g: 0x00, b: 0x00 } }
  ]
}

class ScanScreen extends Component {
  constructor(props) {
    super(props)
    this.y = 5
    this.x = 5 * 4
    this.counter = 0

    this.state = {
      currentPoint: {
        x: null,
        y: null
      },
      newLinePopup: false,
      finishScanPopup: false
    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    const createMatrix = (x, y) => Array(y).fill().map(() => Array(x).fill([null, null, null, null]))
    this.matrix = createMatrix(this.x / 4, this.y)
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

    // console.log(this.matrix)

    this.dataInterval = setInterval(() => {
      this.requestSensorData()

    }, 200);

    this.graphMesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.graphMesh);
    this.initGrid()
    this.animate();
  }

  requestSensorData = () => {
    if (!this.state.newLinePopup && !this.state.finishScanPopup) {
      socketHelper.send('W')
    }
  }


  handleKeyDown = (socketData) => {
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'left':
          break
        case 'right':
          break
        case 'ok':
          if (this.state.newLinePopup === true && this.state.finishScanPopup === false) {
            this.setState({
              newLinePopup: false
            })
          }
          break
        case 'back':
          clearInterval(this.dataInterval)
          setTimeout(() => {
            socketHelper.detach()
            this.props.navigateTo("menuScreen")
          }, 500);
          return
        default:
          break
      }
    } else if (socketData.type === 'multipleSensor') {

      this.zigzag("left")
      this.matrix[this.currentPoint.y][this.currentPoint.x] = [
        parseInt(socketData.payload[0]) - parseInt((Math.random() * 20)),
        parseInt(socketData.payload[0]) - parseInt((Math.random() * 20)),
        parseInt(socketData.payload[0]) - parseInt((Math.random() * 20)),
        parseInt(socketData.payload[0]) - parseInt((Math.random() * 20))]

      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          for (let k = 0; k < this.matrix[i][j].length; k++) {
            this.colorSquare((j * 4) + k, i, this.matrix[i][j][k])
          }
        }
      }

      this.counter++
      if (this.counter === (this.x / 4) * this.y) {
        console.log(this.matrix)
        this.setState({
          finishScanPopup: true
        })
      }

    }

  }


  colorSquare = (x, y, c) => {
    let index = ((y) * 2 * this.x) + (x) * 2;
    if (c === null) {
      this.geometry.faces[index].color = new THREE.Color(0)
      this.geometry.faces[index + 1].color = new THREE.Color(0)
    } else {
      this.geometry.faces[index].color = new THREE.Color(this.getColor(c))
      this.geometry.faces[index + 1].color = new THREE.Color(this.getColor(c))
    }
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

  animate = () => {
    this.geometry.elementsNeedUpdate = true;
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  initGrid = () => {
    const grid_geometry = new THREE.PlaneBufferGeometry(1, 1, this.x / 4, this.y);
    var floorTexture = new THREE.TextureLoader().load(GridTexture);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(this.x / 4, this.y);
    var grid_material = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide, transparent: true, wireframe: true });
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
          if (this.currentPoint.y === 0) {
            this.setState({
              newLinePopup: true
            })
          }
        } else if (this.currentPoint.y === 0) {
          this.currentPoint.x++

          this.currentPoint.y = this.height - 1
        }
      } else if (startPos === 'right') {
        // Sinirdaysa bir sey yapma
        if (this.currentPoint.x === 0 && this.currentPoint.y === 0) {
          return this.currentPoint
        }
        // Y'yi sifira kadar kucult
        // Y sifir ise X'i azalt, Y'yi resetle
        if (this.currentPoint.y > 0) {
          this.currentPoint.y--
          if (this.currentPoint.y === 0) {
            this.setState({
              newLinePopup: true
            })
          }
        }
        else if (this.currentPoint.y === 0) {
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
            if (this.currentPoint.y === 0) {
              this.setState({
                newLinePopup: true
              })
            }
          } else {
            this.currentPoint.y++
            if (this.currentPoint.y === this.y - 1) {
              this.setState({
                newLinePopup: true
              })
            }
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
        if (this.currentPoint.y === 0 && this.currentPoint.x === 0 && dir === 'up') {
          return this.currentPoint
        }
        if (this.currentPoint.y === this.height - 1 && this.currentPoint.x === 0 && dir === 'down') {
          return this.currentPoint
        }

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



  renderNewLinePopup = () => {
    return (
      <div className="new-line-popup-container">
        <div className="new-line-popup">
          <div className="new-line-warning">
            Current line is completed. Please press 'START' button for the next line.
          </div>
        </div>
      </div>
    )
  }

  renderFinishPopup = () => {
    return (
      <div className="new-line-popup-container">
        <div className="new-line-popup">
          <div className="new-line-warning">
            Scan is completed. Do you want to view scan result?
          </div>
          <div className="scan-screen-buttons">
            <div className="scan-screen-button selected">
              Okey
            </div>
            <div className="scan-screen-button">
              Cancel
            </div>
          </div>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div className="scan-screen component">
        {
          this.state.newLinePopup ? this.renderNewLinePopup() : ''
        }

        {
          this.state.finishScanPopup ? this.renderFinishPopup() : ''
        }


        <div className="scan-screen-details">
          <div className="detail-bar">
            <div className="bar-name">
              Current X
            </div>
            <div className="bar-value">
              {this.state.currentPoint.x + 1}
            </div>
          </div>

          <div className="detail-bar">
            <div className="bar-name">
              Current Y
            </div>
            <div className="bar-value">
              {this.state.currentPoint.y + 1}
            </div>
          </div>

          <div className="detail-bar">
            <div className="bar-name">
              Value
            </div>
            <div className="bar-value">
              235
              </div>
          </div>

          <div className="detail-bar">
            <div className="bar-name">
              Value
            </div>
            <div className="bar-value">
              235
              </div>
          </div>

        </div>


        <div className="canvas-container" ref="canvasHolder">  </div>
      </div>
    )
  }
}
export default ScanScreen