import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import ButtonSound from './Assets/sounds/next.mp3'
const Websocket = require('websocket').w3cwebsocket

const SOCKET_ADDRESS = 'ws://192.168.1.131:8080'

class Socket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ws: new Websocket(SOCKET_ADDRESS),
      shouldReconnect: true,
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  componentDidMount() {
    this._isMounted = true
    try {

      this.initSocket()
    } catch{
      console.error("Uyarı: SerialBridge kapalı olabilir? Ulaşamıyorum.")
    }
  }

  componentWillUnmount() {
    this.setState({
      shouldReconnect: false
    })
    clearTimeout(this.timeout)
    let socket = this.state.ws
    socket.close()
    this._isMounted = false
  }

  initSocket = () => {
    let socket = this.state.ws

    socket.onmessage = (ev) => {
      const messageData = JSON.parse(ev.data)
      if (this.props.debug) { console.log(messageData) }
      if (messageData.type === 'scan_') {
        this.props.onScanData(messageData)
      } else if (messageData.type === 'button') {
        this.props.onMessage(messageData)
      } else if (messageData.type === 'accessory_error') {
        try {
          this.props.accessoryError(messageData)
        } catch (error) {
          
        }
      }

    }

    socket.onclose = () => {
      if (this.state.shouldReconnect && this._isMounted) {
        this.timeout = setTimeout(() => {
          this.setState({
            ws: new Websocket(SOCKET_ADDRESS)
          })
          this.initSocket()
        }, 1000)
      }
    }
  }

  requestScan = async (line, cb) => {
    // console.log('Scan requested: ', line)
    const socket = this.state.ws
    try {

      socket.send(line)
    } catch{
      console.error("Uyarı: SerialBridge kapalı olabilir? Ulaşamıyorum.")
    }

    let req = new Promise((resolve, reject) => {
      socket.addEventListener('message', (ev) => {
        resolve(JSON.parse(ev.data))
      }, { once: true })
    })

    let res = await req
    // res.type = 'sensor' // TEST
    return res
  }

  requestBattery() {
    const socket = this.state.ws
    socket.send('P')
    // console.log("battery")
  }

  requestTitre() {
    const socket = this.state.ws
    socket.send('vib')
  }

  requestTurnOff() {
    const socket = this.state.ws
    socket.send('T')
  }

  requestReboot() {
    const socket = this.state.ws
    socket.send('Y')
  }



  render() {
    return <div style={{ display: 'none' }} > >
    {/* <audio ref="audio" volume="0.1" src={ButtonSound} /> */}
    </div>
  }

}

Socket.propTypes = {
  onMessage: PropTypes.func
}

export default Socket