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
      popupCursorIndex: 3 * 100,
      fileList: FILES,
      popup: false

    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempCursorIndex = this.state.cursorIndex
    let tempPopupCursorIndex = this.state.popupCursorIndex
    switch (socketData.payload) {
      case 'left':
        if (this.state.popup === false) {
          if (tempCursorIndex > 0)
            tempCursorIndex = tempCursorIndex - 1
        } else {
          tempPopupCursorIndex--
        }

        break
      case 'right':
        if (this.state.popup === false) {
          if (tempCursorIndex < this.state.fileList.length - 1)
            tempCursorIndex = tempCursorIndex + 1
        } else {
          tempPopupCursorIndex++
        }

        break
      case 'up':
        if (this.state.popup === false) {
          if (!(tempCursorIndex < 4 && tempCursorIndex >= 0))
            tempCursorIndex = tempCursorIndex - 4
        } else {

        }

        break
      case 'down':
        if (this.state.popup === false) {
          if ((tempCursorIndex + 4) < this.state.fileList.length)
            tempCursorIndex = tempCursorIndex + 4
        } else {

        }

        break
      case 'ok':
        if (!this.state.popup) {
          tempPopupCursorIndex = 300
          this.setState({
            popup: true,
          })
        }
        break
      case 'back':
        if (this.state.popup)
          this.setState({ popup: false })
        else {
          //back to mainmenu
          this.props.navigateTo("menuScreen")
        }
        return
      default:
        break
    }

    this.setState({
      cursorIndex: tempCursorIndex,
      popupCursorIndex: tempPopupCursorIndex
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
          <div className={`button ${this.state.popupCursorIndex % 3 === 0 ? "p-selected" : null}`}>Open</div>
          <div className={`button ${this.state.popupCursorIndex % 3 === 1 ? "p-selected" : null}`}>Cancel</div>
          <div className={`button ${this.state.popupCursorIndex % 3 === 2 ? "p-selected" : null}`}>Delete File</div>
        </div>
      </div >
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