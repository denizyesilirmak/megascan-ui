import React from 'react'
import './Pulse3.css'
import Indicator from './PulseItems/Indicator'

import SocketHelper from '../../../SocketHelper'

class Pulse3 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      raw_value: 0,
      value: 0,
      average: 0,
      dataHistory: [0, 0, 0, 0, 200, 0, 0, 0, 0]
    }
  }

  componentDidMount() {
    SocketHelper.attach(this.handleSocket)
    SocketHelper.send('H.1')
  }

  componentWillUnmount() {
    SocketHelper.send('H.0')
    SocketHelper.detach()

  }

  handleSocket = (socketData) => {
    if (socketData.type === 'button') {
      console.log('button')
    }
    else if (socketData.type === 'pulse') {
      const raw = Math.abs(parseInt(socketData.payload) - 1108)
      this.history(raw)
    }
  }

  history = (value) => {
    const temp = this.state.dataHistory
    temp.push(value)
    temp.shift()
    this.setState({
      dataHistory: temp
    })
  }

  render() {
    return (
      <div className="component pulse-3">
        <div className="left">

        </div>
        <div className="middle">
          <Indicator
            dataHistory={this.state.dataHistory}
          />
        </div>

        <div className="right">

        </div>
      </div>
    )
  }
}

export default Pulse3