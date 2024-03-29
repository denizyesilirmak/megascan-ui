import React, { Component } from 'react'
import './ScanScreen.css'
import * as THREE from "three"
import GridTexture from '../../Assets/grid.svg'
import socketHelper from '../../SocketHelper'
import { DeviceContext } from '../../Contexts/DeviceContext'

const COLORS = {
  jet: [
    { pct: 0, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 64, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 127, color: { r: 0x00, g: 0xff, b: 0x00 } },
    { pct: 192, color: { r: 0x00, g: 0xff, b: 0x00 } },
    { pct: 256, color: { r: 0x00, g: 0xff, b: 0x00 } }
  ]
}

const TUNNELSCAN = false
const IntervalSpeed = 1000

class ScanScreen extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)
    //console.log(this.props.scanProps)
    this.y = this.props.scanProps.steps // max 20
    this.x = this.props.scanProps.lines * 4 // max 10
    this.direction = this.props.scanProps.startPoint
    this.pattern = this.props.scanProps.path
    this.total = 0
    this.counter = 0
    this.average = 127
    this.max = 0
    this.min = 255
    this.over = false

    this.state = {
      currentPoint: {
        x: null,
        y: null
      },
      value: 0,
      newLinePopup: false,
      finishScanPopup: false,
      finishPopupButtonIndex: true,
      pausePopup: false,
      pausePopupButtonIndex: true
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

    const width = 563
    const height = this.refs.canvasHolder.clientHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-0.51, 0.52, 0.52, -0.52, -10, 10)
    this.renderer = new THREE.WebGLRenderer({ antialias: false })
    this.renderer.setSize(width, height)
    this.refs.canvasHolder.appendChild(this.renderer.domElement)
    this.initializeCamera()

    this.geometry = new THREE.PlaneGeometry(1, 1, this.x, this.y)
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, vertexColors: THREE.VertexColors })

    // console.log(this.matrix)
    setTimeout(() => {
      this.dataInterval = setInterval(() => {
        if (!this.state.pausePopup) {
          this.requestSensorData()
        }
      }, IntervalSpeed)
    }, 2000)


    this.graphMesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.graphMesh)
    this.initGrid()
    this.animate()
  }

  componentWillUnmount() {
    this.clearMemory()
  }

  // requestSensorData = () => {
  //   if (!this.state.newLinePopup && !this.state.finishScanPopup) {
  //     socketHelper.send('W')
  //   }
  // }

  clearMemory = () => {
    this.over = true
    //console.log("scan screen unmount")
    this.scene.dispose()
    this.renderer.dispose()
    this.geometry.dispose()
    this.animate = null
  }

  requestSensorData = () => {
    if (true && !this.state.finishScanPopup && !this.state.newLinePopup && this.props.scanProps.mode === "auto") {
      socketHelper.send('W')
    }
  }

  handleKeyDown = (socketData) => {
    if (socketData.type === 'button') {
      switch (socketData.payload) {
        case 'left':
          if (this.state.finishScanPopup) {
            this.setState({
              finishPopupButtonIndex: !this.state.finishPopupButtonIndex
            })
          }
          else if (this.state.pausePopup) {
            this.setState({
              pausePopupButtonIndex: !this.state.pausePopupButtonIndex
            })
          }
          break
        case 'right':
          if (this.state.finishScanPopup) {
            this.setState({
              finishPopupButtonIndex: !this.state.finishPopupButtonIndex
            })
          }
          else if (this.state.pausePopup) {
            this.setState({
              pausePopupButtonIndex: !this.state.pausePopupButtonIndex
            })
          }
          break
        case 'ok':
          if (this.state.newLinePopup === true && this.state.finishScanPopup === false) {
            this.setState({
              newLinePopup: false
            })
          }
          else if (this.state.finishScanPopup) {
            if (this.state.finishPopupButtonIndex === true) {
              //console.log("pressed ok")
              this.saveScan()
            } else {
              //console.log("pressed cancel")
              this.props.navigateTo("deviceGroundScanPropertiesScreen")
            }
          }
          else if (this.state.pausePopup) {
            if (this.state.pausePopupButtonIndex) {
              //console.log("resume")
              this.setState({ pausePopup: false })
            } else {
              this.matrix.forEach((a, i) => {
                a.forEach((b, j) => {
                  b.forEach((c, t) => {
                    if (c === null)
                      this.matrix[i][j][t] = this.average
                  })
                })
              })

              // console.log("stop - current matrix", this.matrix, 'average', this.average)
              this.saveScan()
            }
          }
          break

        case 'start':
          if (this.props.scanProps.mode === "manual" && this.state.finishScanPopup === false) {
            socketHelper.send('W')
          }
          if (this.counter + 1 === this.width * this.height && this.state.finishScanPopup === false && this.props.scanProps.mode === "manual") {
            this.setState({
              finishScanPopup: true
            })
          }
          if (this.state.newLinePopup === true && this.state.finishScanPopup === false) {
            this.setState({
              newLinePopup: false
            })
          }
          break
        case 'back':
          if (!this.state.finishScanPopup)
            this.setState({ pausePopup: !this.state.pausePopup })

          // clearInterval(this.dataInterval)
          // setTimeout(() => {
          //   socketHelper.detach()
          //   this.props.navigateTo("menuScreen")
          // }, 500);
          return
        default:
          break
      }
    } else if (socketData.type === 'multipleSensor') {
      let localSensorArray = [parseInt(socketData.payload[0]), parseInt(socketData.payload[1]), parseInt(socketData.payload[2]), parseInt(socketData.payload[3])]
      //console.log(localSensorArray)
      let localMin = Math.min.apply(null, localSensorArray)
      let localMax = Math.max.apply(null, localSensorArray)
      this.min = localMin < this.min ? localMin : this.min
      this.max = localMax > this.max ? localMax : this.max
      // console.log("max: ", this.max, "min: ", this.min, "avg: ", this.average)

      if (this.pattern === "zigzag") {
        this.zigzag(this.direction)
      }
      else if (this.pattern === "parallel") {
        this.parallel(this.direction)
      }
      this.matrix[this.currentPoint.y][this.currentPoint.x] = [
        localSensorArray[0],
        localSensorArray[1],
        localSensorArray[2],
        localSensorArray[3]]

      this.setState({
        value: ((localSensorArray[0] + localSensorArray[1] + localSensorArray[2] + localSensorArray[3]) / 4).toFixed(1)
      })

      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          for (let k = 0; k < this.matrix[i][j].length; k++) {
            if (this.matrix[i][j][k] === null) {
              this.colorSquare((j * 4) + k, i, null)
            } else {
              this.colorSquare((j * 4) + k, i, (this.matrix[i][j][k] - this.average))
            }
          }
        }
      }

      this.counter++

      this.total += (parseInt(socketData.payload[0]) + parseInt(socketData.payload[1]) + parseInt(socketData.payload[2]) + parseInt(socketData.payload[3])) / 4
      this.average = Math.trunc(this.total / this.counter)
      // console.log(this.average)

      if (this.counter - 1 === (this.x / 4) * this.y) {
        //tarama bitti
        clearInterval(this.dataInterval)
        // console.log(JSON.stringify(this.matrix))
        this.setState({
          finishScanPopup: true
        })
        this.clearMemory()
      }
    }
  }

  saveScan = () => {
    fetch('http://localhost:9090/savescan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "tunnelscan": true, "data": this.matrix })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        this.props.navigateTo('scanViewerScreen', data.fileName)
      })
  }


  colorSquare = (x, y, c) => {
    let index = ((y) * 2 * this.x) + (x) * 2
    if (c === null) {
      this.geometry.faces[index].color = new THREE.Color("black")
      this.geometry.faces[index + 1].color = new THREE.Color("black")
      return
    }

    if (TUNNELSCAN === false) {
      if (this.max - this.min >= 6) {
        if (c >= 0) {
          this.geometry.faces[index].color = new THREE.Color(this.getColor(Math.trunc(this.map((c), 0, Math.trunc(this.max - this.average), 127, 255))))
          this.geometry.faces[index + 1].color = new THREE.Color(this.getColor(Math.trunc(this.map((c), 0, Math.trunc(this.max - this.average), 127, 255))))
        } else {
          this.geometry.faces[index].color = new THREE.Color(this.getColor(Math.trunc(this.map((this.average - this.min + c), 0, Math.trunc(this.average - this.min), 0, 127))))
          this.geometry.faces[index + 1].color = new THREE.Color(this.getColor(Math.trunc(this.map((Math.trunc(this.average - this.min) + c), 0, Math.trunc(this.average - this.min), 0, 127))))
        }
      }
      else {
        if (c > 0) {
          this.geometry.faces[index].color = new THREE.Color(this.getColor(Math.trunc(this.map((127 + c), 127, Math.trunc(this.max - this.average), 127, 140))))
          this.geometry.faces[index + 1].color = new THREE.Color(this.getColor(Math.trunc(this.map((127 + c), 127, Math.trunc(this.max - this.average), 127, 140))))
        } else {
          this.geometry.faces[index].color = new THREE.Color(this.getColor(Math.trunc(this.map((Math.trunc(this.average - this.min) + c), 0, Math.trunc(this.average - this.min), 0, 127))))
          this.geometry.faces[index + 1].color = new THREE.Color(this.getColor(Math.trunc(this.map((Math.trunc(this.average - this.min) + c), 0, Math.trunc(this.average - this.min), 0, 127))))
        }
      }
    } else {
      if (this.max - this.min >= 6) {
        if (c >= 0) {
          this.geometry.faces[index].color = new THREE.Color(this.getColor(127))
          this.geometry.faces[index + 1].color = new THREE.Color(this.getColor(127))
        } else {
          this.geometry.faces[index].color = new THREE.Color(this.getColor(Math.trunc(this.map((1 * c), 0, this.min, 0, 127))))
          this.geometry.faces[index + 1].color = new THREE.Color(this.getColor(Math.trunc(this.map((1 * c), 0, this.min, 0, 127))))
        }
      }
      else {
        if (c > 0) {
          this.geometry.faces[index].color = new THREE.Color(this.getColor(127))
          this.geometry.faces[index + 1].color = new THREE.Color(this.getColor(127))
        } else {
          this.geometry.faces[index].color = new THREE.Color(this.getColor(Math.trunc(this.map((-1 * c), 0, this.min, 100, 127))))
          this.geometry.faces[index + 1].color = new THREE.Color(this.getColor(Math.trunc(this.map((-1 * c), 0, this.min, 100, 127))))
        }
      }
    }
  }


  map = (x, in_min, in_max, out_min, out_max) => {
    let m = (Math.abs(x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)

    if (isNaN(m)) {
      return 127
    } else {
      return m
    }
  }


  getColor = (pct) => {
    for (var i = 1; i < COLORS.jet.length - 1; i++) {
      if (pct < COLORS.jet[i].pct) {
        break
      }
    }
    const lower = COLORS.jet[i - 1]
    const upper = COLORS.jet[i]
    const range = upper.pct - lower.pct
    const rangePct = (pct - lower.pct) / range
    const pctLower = 1 - rangePct
    const pctUpper = rangePct
    const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    }
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')'
  }

  animate = () => {
    if (this.over) {
      return
    }
    this.geometry.elementsNeedUpdate = true
    this.frameId = window.requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
  }

  initGrid = () => {
    const grid_geometry = new THREE.PlaneBufferGeometry(1, 1, this.x / 4, this.y)
    var floorTexture = new THREE.TextureLoader().load(GridTexture)
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
    floorTexture.repeat.set(this.x / 4, this.y)
    var grid_material = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide, transparent: true, wireframe: true })
    const grid_mesh = new THREE.Mesh(grid_geometry, grid_material)
    grid_mesh.position.z = 1
    this.scene.add(grid_mesh)
  }

  initializeCamera() {
    this.camera.position.x = 0
    this.camera.position.y = 0
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
          if (this.currentPoint.y === 0 && this.counter + 1 !== this.width * this.height && this.props.scanProps.mode === "auto") {
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
          if (this.currentPoint.y === 0 && this.counter + 1 !== this.width * this.height && this.props.scanProps.mode === "auto") {
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

    this.setState({
      currentPoint: this.currentPoint
    })
  }

  zigzag = (startPos) => {
    // First run
    console.log(this.counter, this.width * this.height)
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
            if (this.currentPoint.y === 0 && this.counter + 1 !== this.width * this.height && this.props.scanProps.mode === "auto") {
              this.setState({
                newLinePopup: true
              })
            }
          } else {
            this.currentPoint.y++
            if (this.currentPoint.y === this.y - 1 && this.counter + 1 !== this.width * this.height && this.props.scanProps.mode === "auto") {
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
            if (this.currentPoint.y === 0 && this.counter + 1 !== this.width * this.height && this.props.scanProps.mode === "auto") {
              this.setState({
                newLinePopup: true
              })
            }
          } else {
            this.currentPoint.y++
            if (this.currentPoint.y === this.y - 1 && this.counter + 1 !== this.width * this.height && this.props.scanProps.mode === "auto") {
              this.setState({
                newLinePopup: true
              })
            }
          }
        }
      }
    }

    let tmpcurrentPoint = {
      x: (startPos === "left") ? this.currentPoint.x : this.x / 4 - this.currentPoint.x - 1,
      y: this.currentPoint.y
    }

    this.setState({
      currentPoint: tmpcurrentPoint
    })
  }

  renderNewLinePopup = () => {
    return (
      <div className="new-line-popup-container">
        <div className="new-line-popup" style={{ borderColor: this.context.theme.border_color }}>
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
            Scan is completed. Do you want to save?
          </div>
          <div className="scan-screen-buttons">
            <div className={`scan-screen-button ${this.state.finishPopupButtonIndex === true ? "selected" : ""}`}>
              Save
            </div>
            <div className={`scan-screen-button ${this.state.finishPopupButtonIndex === false ? "selected" : ""}`}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPausePopup = () => {
    return (
      <div className="new-line-popup-container">
        <div className="new-line-popup">
          <div className="new-line-warning">
            Scan is paused. Do you want to cancel it?
            <br />
            Press BACK button to resume.
        </div>
          <div className="scan-screen-buttons">
            <div className={`scan-screen-button ${this.state.pausePopupButtonIndex === true ? "selected" : ""}`}>
              Resume
          </div>
            <div className={`scan-screen-button ${this.state.pausePopupButtonIndex === false ? "selected" : ""}`}>
              Stop
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

        {
          this.state.pausePopup ? this.renderPausePopup() : ''
        }


        <div className="scan-screen-details">
          <div className="detail-bar" style={{ borderColor: this.context.theme.border_color }}>
            <div className="bar-name">
              Current X
            </div>
            <div className="bar-value">
              {this.state.currentPoint.x + 1}
            </div>
          </div>

          <div className="detail-bar" style={{ borderColor: this.context.theme.border_color }}>
            <div className="bar-name">
              Current Y
            </div>
            <div className="bar-value">
              {this.state.currentPoint.y + 1}
            </div>
          </div>

          <div className="detail-bar" style={{ borderColor: this.context.theme.border_color }} >
            <div className="bar-name">
              Value
            </div>
            <div className="bar-value">
              {this.state.value}
            </div>
          </div>

          {/* <div className="detail-bar">
            <div className="bar-name">
              Value
            </div>
            <div className="bar-value">
              235
              </div>
          </div> */}

        </div>


        <div className="canvas-container" ref="canvasHolder">  </div>
      </div>
    )
  }
}
export default ScanScreen