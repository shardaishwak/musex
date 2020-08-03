import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as firebase from "firebase";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducer from "./store/reducers";
import { firebaseConfig } from "./config/db_credentials";
//  firebase

firebase.initializeApp(firebaseConfig);

//  redux
const composeEnhancer =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(Reducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
