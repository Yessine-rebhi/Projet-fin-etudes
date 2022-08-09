import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/reducers'
import '../src/assests/boxicons-2.0.7/css/boxicons.min.css'
import '../src/assests/css/grid.css'
import '../src/assests/css/theme.css'
import '../src/assests/css/index.css'

import Layout from "components/AppAdminDashboard/layout/Layout";

const store = createStore(
  rootReducer
)

Modal.setAppElement("#root");

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
