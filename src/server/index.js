import React from "react";
import * as firebase from 'firebase'

//  AUTH
const Signup = async (email, password) => {
    const returns = {
        account: null,
        doc: null
    };
    const firestore = firebase.firestore();
    await firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => returns.account = user.user)
        .catch(err => console.error(err.message));
    await firestore
        .collection("users")
        .doc(returns.account.uid)
        .set({
        createdAt: new Date()
    })
        .then(doc => returns.doc = doc)
        .catch(err => console.error(err.message));

    return returns;
};

const Login = async (email, password) => {
    const firestore = firebase.firestore();
    const returns = {
        account: null,
        doc: null
    };
    await firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => returns.account = user.user)
        .catch(err => console.error(err.message));
    await firestore
        .collection("users")
        .doc(returns.account.uid).get()
        .then(doc => doc.exists ? returns.doc = doc.data() : null)
        .catch(err => console.error(err.message));

    return returns;

};

const GetStatus = async () => {
    await firebase.auth().onAuthStateChanged(user => user ? user : false)
};

const GetUser = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) return currentUser;
    else return false;
};

export {
    Signup,
    Login,
    GetStatus,
    GetUser
}