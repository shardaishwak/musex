import * as firebase from "firebase";
import {GET_SONGS} from "../constants/songsConstants";

export const GetSongs = () => async (dispatch, getState) => {
    const firestore = firebase.firestore()
    const collection = "users"
    const uid = getState().auth.auth_info.uid;

    await firestore
        .collection(collection)
        .doc(uid)
        .get()
        .then(doc => {
            if (doc.exists) dispatch({type: GET_SONGS, payload: doc.data().songs})
        })
        .catch(err => console.log(err.code, err.message))
}