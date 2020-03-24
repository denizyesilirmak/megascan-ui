import React, { Component } from 'react'
import './FileList.css'
import FileIcon from '../../Assets/MenuIcons/icon-file.png'
import socketHelper from '../../SocketHelper'

var FILES = [
  '001',
  '002',
  '003',
  '004',
  '005',
  '006',
  '007',
  '008',
  '009',
  '010',
  '011',
  '012',
  '013',
  '014',
  '015',
  '016'
]



class FileList extends Component {
  constructor(props) {
    super(props)

    for (let index = 0; index < 100; index++) {
      FILES.push(String(index))

    }

    this.state = {
      cursorIndex: 0,
      fileList: FILES,
      popup: true

    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempCursorIndex = this.state.cursorIndex
    switch (socketData.payload) {
      case 'left':
        if (tempCursorIndex > 0)
          tempCursorIndex = tempCursorIndex - 1
        break
      case 'right':
        if (tempCursorIndex < this.state.fileList.length - 1)
          tempCursorIndex = tempCursorIndex + 1
        break
      case 'up':
        if (!(tempCursorIndex < 4 && tempCursorIndex >= 0))
          tempCursorIndex = tempCursorIndex - 4
        break
      case 'down':
        if ((tempCursorIndex + 4) < this.state.fileList.length)
          tempCursorIndex = tempCursorIndex + 4
        break
      case 'ok':
        this.setState({
          popup: true
        })
        break
      case 'back':
        this.setState({
          popup: false
        })
        return
      default:
        break
    }

    this.setState({
      cursorIndex: tempCursorIndex
    })
  }

  renderPopup = () => {
    return (
      <div className="file-list-popup">
        <div className="question">
          Selected File:
        </div>
        <div className="selected-file-name">
          {
            this.state.fileList[this.state.cursorIndex]
          }
        </div>
        <div className="buttons">
          <div className="button p-selected">Open</div>
          <div className="button">Cancel</div>
          <div className="button">Delete File</div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="file-list component">
        {
          this.state.popup ? this.renderPopup() : null
        }

        <div className="files" style={{ transform: `translateY(${Math.trunc(this.state.cursorIndex / 12) * -317}px)` }}>
          {
            this.state.fileList.map((e, i) => {
              return (
                <div key={i} className={`file ${this.state.cursorIndex === i ? 'selected' : null}`}>
                  <img src={FileIcon} alt="file" />
                  <span>{e}</span>
                </div>
              )
            })
          }

        </div>
      </div >
    )
  }
}

export default FileList