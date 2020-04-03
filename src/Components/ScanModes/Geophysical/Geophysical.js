import React, { Component } from 'react'
import './Geophysical.css'
import socketHelper from '../../../SocketHelper'

class Geophysical extends Component {
  constructor(props) {
    super(props)


  }

  componentDidMount() {
    socketHelper.attach(this.handleKeyDown)
  }

  handleKeyDown = (socketData) => {
    if (socketData.type !== 'button') { return }
    switch (socketData.payload) {
      case 'left':
        break
      case 'right':
        break
      case 'back':
        this.props.navigateTo("menuScreen")
        return
      default:
        break
    }

  }

  render() {
    return (
      <div className="component geophysical">

      </div>
    )
  }
}
export default Geophysical