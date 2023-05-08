import React from 'react'
import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from "react-router-dom"
import { HashRouter } from "react-router-dom"
import { store } from './redux/store'
import { Provider } from 'react-redux'

import App from './App'

import '../src/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <BrowserRouter> */}
    <HashRouter>
      <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </Provider>
  // </React.StrictMode>,
)
