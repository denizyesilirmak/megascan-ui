import React, { Component } from 'react'
import './FileList.css'
import FileIcon from '../../Assets/MenuIcons/icon-file.png'
import socketHelper from '../../SocketHelper'

class FileList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursorIndex: 4 * 200
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
        tempCursorIndex = tempCursorIndex - 1
        break
      case 'right':
        tempCursorIndex = tempCursorIndex + 1
        break
      case 'up':
        tempCursorIndex = tempCursorIndex - 4
        break
      case 'down':
        tempCursorIndex = tempCursorIndex + 4
        break
      case 'back':

        return
      default:
        break
    }

    this.setState({
      cursorIndex: tempCursorIndex
    })
  }

  render() {
    return (
      <div className="file-list component">
        <div className="files">

          <div className={`file ${this.state.cursorIndex % 4 === 0 ? 'selected' : null}`}>
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

          <div className="file">
            <img src={FileIcon} alt="file" />
            <span>001</span>
          </div>

        </div>
      </div>
    )
  }
}

export default FileList