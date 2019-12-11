import "@babel/polyfill"
import React, { StrictMode } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "../../../core/services/state/store"
import App from "./components/App"
import "../styles/index.scss"

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  document.querySelector("#root")
)
