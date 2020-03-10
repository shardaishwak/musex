import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase'
import * as serviceWorker from './serviceWorker';

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

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
