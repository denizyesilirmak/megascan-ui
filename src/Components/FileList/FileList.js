import React, { Component } from 'react'
import './FileList.css'
import FileIcon from '../../Assets/MenuIcons/icon-file.png'
import DeleteFileIcon from '../../Assets/MenuIcons/deleteFile.png'
import socketHelper from '../../SocketHelper'
import { DeviceContext } from '../../Contexts/DeviceContext'
import NoFileIcon from '../../Assets/MenuIcons/empty-folder.png'

class FileList extends Component {
  static contextType = DeviceContext
  constructor(props) {
    super(props)

    this.state = {
      cursorIndex: 0,
      popupCursorIndex: 3 * 100,
      deletePopupCursorIndex: 2 * 100,
      fileList: [],
      popup: false,
      deletePopup: false

    }
  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
    this.getFileList()
  }

  componentWillUnmount() {
    socketHelper.detach(this.handleKeyDown)
  }

  getFileList = () => {
    fetch('http://localhost:9090/filelist')
      .then(res => res.json())
      .then(data => {
        if (data.success)
          this.setState({
            fileList: data.filelist.reverse()
          })
      })
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    let tempCursorIndex = this.state.cursorIndex
    let tempPopupCursorIndex = this.state.popupCursorIndex
    let tempDeletePopupCursorIndex = this.state.deletePopupCursorIndex
    switch (socketData.payload) {
      case 'left':
        if (this.state.popup === false && this.state.deletePopup === false) {
          if (tempCursorIndex > 0)
            tempCursorIndex = tempCursorIndex - 1
        } else if (this.state.popup) {
          tempPopupCursorIndex--
        }
        else if (this.state.deletePopup) {
          tempDeletePopupCursorIndex--
        }
        this.context.buttonInterrupt()
        break
      case 'right':
        if (this.state.popup === false && this.state.deletePopup === false) {
          if (tempCursorIndex < this.state.fileList.length - 1)
            tempCursorIndex = tempCursorIndex + 1
        } else if (this.state.popup) {
          tempPopupCursorIndex++
        }
        else if (this.state.deletePopup) {
          tempDeletePopupCursorIndex++
        }
        this.context.buttonInterrupt()
        break
      case 'up':
        if (this.state.popup === false && this.state.deletePopup === false) {
          if (!(tempCursorIndex < 4 && tempCursorIndex >= 0))
            tempCursorIndex = tempCursorIndex - 4
        } else if (this.state.popup) {

        }
        else if (this.state.deletePopup) {

        }
        this.context.buttonInterrupt()
        break
      case 'down':
        if (this.state.popup === false && this.state.deletePopup === false) {
          if ((tempCursorIndex + 4) < this.state.fileList.length)
            tempCursorIndex = tempCursorIndex + 4
        } else if (this.state.popup) {

        }
        else if (this.state.deletePopup) {

        }
        this.context.buttonInterrupt()
        break
      case 'ok':
        if (!this.state.popup && !this.state.deletePopup && this.state.fileList.length > 0) {
          tempPopupCursorIndex = 300
          this.setState({
            popup: true,
          })
        } else if (this.state.popup) {
          if (this.state.popupCursorIndex % 3 === 0) {
            this.props.navigateTo("scanViewerScreen", this.state.fileList[this.state.cursorIndex])
          }
          else if (this.state.popupCursorIndex % 3 === 1) {
            this.setState({ popup: false })
          }
          else if (this.state.popupCursorIndex % 3 === 2) {
            console.log("delete file: " + this.state.fileList[this.state.cursorIndex])
            this.setState({
              popup: false,
              deletePopup: true
            })
          }
        } else if (this.state.deletePopup) {
          if (this.state.deletePopupCursorIndex % 2 === 0) {
            console.log("delete file now")

            this.deleteFile(this.state.fileList[this.state.cursorIndex])
            this.setState({ deletePopup: false, popup: false, deletePopupCursorIndex: 2 * 100, popupCursorIndex: 3 * 100 })
          }
          else if (this.state.deletePopupCursorIndex % 2 === 1) {
            console.log("back from delete popup")
            this.setState({ deletePopup: false, popup: true })
          }

        }
        this.context.buttonInterrupt()
        return
      case 'back':
        if (this.state.popup)
          this.setState({ popup: false })
        else if (this.state.deletePopup)
          this.setState({ deletePopup: false, popup: true })
        else {
          //back to mainmenu
          this.props.navigateTo("menuScreen")
        }
        this.context.buttonInterrupt()
        return
      case 'turnoff':
        this.props.navigateTo('turnOff')
        return
      default:
        break
    }

    this.setState({
      cursorIndex: tempCursorIndex,
      popupCursorIndex: tempPopupCursorIndex,
      deletePopupCursorIndex: tempDeletePopupCursorIndex
    })
  }

  renderPopup = () => {
    return (
      <div className="file-list-popup" style={{ borderColor: this.context.theme.background3 }}>

        <div className="question">
          Selected File:
        </div>
        <div className="selected-file-name">
          {
            this.state.fileList[this.state.cursorIndex]
          }
        </div>
        <div className="buttons">
          <div className={`button`}
            style={{ background: this.state.popupCursorIndex % 3 === 0 ? this.context.theme.button_bg_selected : null }}
          >Open</div>
          <div className={`button`}
            style={{ background: this.state.popupCursorIndex % 3 === 1 ? this.context.theme.button_bg_selected : null }}
          >Cancel</div>
          <div className={`button`}
            style={{ background: this.state.popupCursorIndex % 3 === 2 ? "#ff4900" : null }}
          >Delete</div>
        </div>
      </div >
    )
  }

  renderDeletePopup = () => {
    return (
      <div className="file-list-popup" style={{ borderColor: this.context.theme.background3, height: 260 }}>
        <div className="question">
          <img style={{ marginTop: 10, width: 60 }} src={DeleteFileIcon} alt="delete"></img>
        </div>
        <div className="selected-file-name" style={{ textAlign: "center" }}>
          <span style={{ fontSize: 18 }}>File will be deleted: </span> <br />
          {
            this.state.fileList[this.state.cursorIndex]
          }
        </div>
        <div className="buttons" style={{ justifyContent: "center" }}>
          <div className={`button`}
            style={{ background: this.state.deletePopupCursorIndex % 2 === 0 ? "#ff4900" : null }}
          >Delete</div>
          <div className={`button`}
            style={{ background: this.state.deletePopupCursorIndex % 2 === 1 ? this.context.theme.button_bg_selected : null }}
          >Cancel</div>
        </div>
      </div >
    )
  }

  deleteFile = (filename) => {
    console.log("deleting: ", filename)
    fetch(`http://localhost:9090/deletefile/${filename}`)
      .then(() => {
        console.log('deleted: ', filename)
        this.getFileList()
      })
  }

  noFilePopup = () => {
    return (
      <div className="no-file">
        <img className="no-file-icon" src={NoFileIcon} alt="ef"/>
        No scan files
      </div>
    )
  }

  render() {
    return (
      <div className="file-list component">
        {
          this.state.popup ? this.renderPopup() : null
        }

        {
          this.state.deletePopup ? this.renderDeletePopup() : null
        }

        {
          this.state.fileList.length < 1 ? this.noFilePopup() : null

        }

        <div className="files" style={{ transform: `translateY(${Math.trunc(this.state.cursorIndex / 12) * -317}px)` }}>
          {
            this.state.fileList.map((e, i) => {
              return (
                <div key={i} className='file' style={{ background: this.state.cursorIndex === i ? this.context.theme.button_bg_selected : null }}>
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