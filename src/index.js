import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase'
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux'
import {compose, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import Reducer from './store/reducers'
//  firebase
var firebaseConfig = {
    apiKey: "AIzaSyBfwJ73FCYE6b7WZeKpnf5Oykg01IEekuI",
    authDomain: "testomaphy.firebaseapp.com",
    databaseURL: "https://testomaphy.firebaseio.com",
    projectId: "testomaphy",
    storageBucket: "testomaphy.appspot.com",
    messagingSenderId: "582160165495",
    appId: "1:582160165495:web:97922a184208a97d407472"
};
firebase.initializeApp(firebaseConfig);

//  redux
const composeEnhancer = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(Reducer, composeEnhancer(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
