import * as firebase from "firebase";
import {
    AUTH_LOADING,
    AUTH_STATUS, CLEAR_AUTH_ERROR,
    GET_AUTH_ERROR,
    GET_AUTH_INFO,
    LOGIN,
    LOGOUT,
    REMOVE_AUTH_INFO
} from "../constants/authConstants";
import {ClearSongs, GetSongs} from "./songsActions";

export const AuthStatus = () => async (dispatch, getState) => {
    dispatch(AuthLoading(true))
    await firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            dispatch({type: AUTH_STATUS, payload: true})
            dispatch({type: GET_AUTH_INFO, payload: user})
            await dispatch(GetSongs())
            dispatch(AuthLoading(false))
        } else {
            dispatch({type: AUTH_STATUS, payload: false})
            dispatch(AuthLoading(false))
        }
    })
}
export const Login  = (email, password) => async (dispatch, getState) => {
    dispatch(AuthLoading(true))
    await firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => dispatch({type: LOGIN}))
        .catch(err => dispatch(GetAuthError(err.message)))
}
export const Signup  = (email, password) => async (dispatch, getState) => {
    dispatch(AuthLoading(true))
    const firestore = firebase.firestore()
    await firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async user => {
            await firestore.collection("users").doc(user.user.uid).set({
                createdAt: new Date().valueOf(),
                songs: []
            })
        })
        .catch(err => dispatch(GetAuthError(err.message)))
};
export const Logout  = () => async (dispatch, getState) => {
    dispatch(AuthLoading(true))
    await firebase.auth()
        .signOut()
        .then(() => {
            dispatch({type: LOGOUT})
            dispatch(RemoveAuthInfo());
            dispatch(ClearSongs())

        })
        .catch(err => dispatch(GetAuthError(err.message)))
}
export const GetAuthInfo = (info) => async (dispatch, getState) => {
    dispatch({type: GET_AUTH_INFO, payload: info})
}
export const RemoveAuthInfo = () => async (dispatch, getState) => {
    dispatch({type: REMOVE_AUTH_INFO})
}
export const AuthLoading = (loading) => async (dispatch, getState) => {
    dispatch({type: AUTH_LOADING, payload: loading})
}
export const GetAuthError = (error) => async (dispatch, getState) => {
    dispatch({type: GET_AUTH_ERROR, payload: error})
}
export const ClearAuthError = () => async (dispatch, getState) => {
    dispatch({type: CLEAR_AUTH_ERROR})
}
