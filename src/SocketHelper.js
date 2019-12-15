import io from 'socket.io-client'

const SOCKET_SERVER_ADDRESS = 'ws://192.168.0.31:8080'
const VOID = () => {}

class SocketHelper {

  constructor() {
    if (!SocketHelper.instance) {
      // Init
      this._currentMessageHandler = VOID
      this._messageHandlerStack = []
      this._socket = null
      this._socket = io(SOCKET_SERVER_ADDRESS)
      this._setMessageHandler(this._getLastMessageHandler())

      SocketHelper.instance = this
    }
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
    this._socket.removeAllListeners('message')
    this._socket.on('message', fn)
    this._currentMessageHandler = fn
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
      fn(msg)
    })
  }

  detachSpecial = (event) => {
    this._socket.removeAllListeners(event)
  }

  detach = () => {
    const last = this._getLastMessageHandler()
    if (last !== VOID) {
      this._setMessageHandler(last)
    }
  }

}

const socketHelperInstance = new SocketHelper()
// Object.freeze(socketHelperInstance) // Extra measure

export default socketHelperInstance