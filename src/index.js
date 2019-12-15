import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { WarpGate } from 'warp-client'

// const initialStore = {
//   tema: 'dark'
// }

ReactDOM.render(<WarpGate /* initialStore={initialStore} */ logger devTools serverAddress='http://localhost:3131'><App /></WarpGate>, document.getElementById('root'))

serviceWorker.unregister()
