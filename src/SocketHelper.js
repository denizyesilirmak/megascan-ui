import io from 'socket.io-client'
import dbStorage from './DatabaseHelper'

const SOCKET_SERVER_ADDRESS = 'ws://localhost:9090'
const VOID = () => { }

class SocketHelper {

  constructor() {
    if (!SocketHelper.instance) {
      // Init
      this._keypressInterceptor = null
      this._currentMessageHandler = VOID
      this._messageHandlerStack = []
      this._socket = null
      this._socket = io(SOCKET_SERVER_ADDRESS)
      this._setMessageHandler(this._getLastMessageHandler())

      SocketHelper.instance = this
    }

    this._socket.on('connect', () => {
      if (this._socket.connected) {
        console.clear()
        console.log(`%csocket connected ${this._socket.id}`, "color: white; background-color: green")
        this._sendInitialSettings()
      }
    })

    this._socket.on('message', this._messageHandler)

    this._socket.on('disconnect', () => {
      console.log("%cSocket disconnected", "color:red");
    })

    return SocketHelper.instance
  }

  _getLastMessageHandler = () => {
    if (this._messageHandlerStack.length > 0) {
      return this._messageHandlerStack.pop()
    } else {
      return VOID
    }
  }

  _setMessageHandler = (fn) => {
    // this._socket.removeAllListeners('message')
    this._currentMessageHandler = fn
  }

  _messageHandler = (data) => {
    if (this._keypressInterceptor) {
      if (data.type === 'button') {
        this._keypressInterceptor(data)
      }
    }
    this._currentMessageHandler(data)
  }

  send = (msg) => {
    this._socket.send(msg)
  }

  attach = (fn) => {
    this._messageHandlerStack.push(this._currentMessageHandler)
    this._setMessageHandler(fn)
  }

  attachSpecial = (event, fn) => {
    this._socket.on(event, msg => {
      // console.log('special', msg)
      fn(msg)
    })
  }

  detachSpecial = (event) => {
    this._socket.removeAllListeners(event)
  }

  detach = () => {
    // console.log("detacted")
    const last = this._getLastMessageHandler()
    if (last !== VOID) {
      this._setMessageHandler(last)
    }
  }

  addKeypressInterceptor = (fn) => {
    this._keypressInterceptor = fn
  }

  _sendInitialSettings = async () => {
    const brightnessLevel = await dbStorage.getItem('brightness')
    this.send(JSON.stringify({
      type: 'settings',
      mode: 'brightness',
      payload: 'br.' + brightnessLevel
    }))
  }

}

const socketHelperInstance = new SocketHelper()
// Object.freeze(socketHelperInstance) // Extra measure

export default socketHelperInstance



// socketHelper.