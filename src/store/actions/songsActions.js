import * as firebase from "firebase";
import {
    ADD_SONG, CANCEL_SONG,
    CLEAR_SONGS,
    CLEAR_STATUS_SONG, DELETE_SONG, ERROR_SONG,
    GET_SONGS,
    PROGRESS_SONG,
    STATUS_SONG,
    UPLOADING_SONG
} from "../constants/songsConstants";
import Unsplash from "unsplash-js";

const unsplash = new Unsplash({
    accessKey: "WRKuTbvzfVmllgZmlH6lVD4tH6kyowy_kU39ndpjnG8"
})

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
        .catch(err => dispatch({type: ERROR_SONG, payload: err}))
}
export const ClearSongs = () => (dispatch, getState) => {
    dispatch({type: CLEAR_SONGS})
}
export const DeleteSong =  (id) => async    (dispatch, getState) => {
    const firestore = firebase.firestore()
    const storageRef = firebase.storage().ref()
    const uid = getState().auth.auth_info.uid;

    const last_songs = getState().songs.songs
    const index = last_songs.findIndex(song => song.id === id)

    const filename = last_songs[index].title;

    last_songs.splice(index, 1)

    dispatch({type: DELETE_SONG, payload: last_songs})

    const song_ref = storageRef.child("music/" + filename)

    await song_ref.delete().then(async () => {
        await firestore.collection("users").doc(uid).update({songs: last_songs}).catch(err => dispatch({type: ERROR_SONG, payload: err}))
    }).catch(err => dispatch({type: ERROR_SONG, payload: err}))

}
export const AddSong = (file) => async (dispatch, getState) => {
    dispatch({type: CLEAR_STATUS_SONG})
    dispatch({type: UPLOADING_SONG, payload: true})
    const firestore = firebase.firestore()
    const uid = getState().auth.auth_info.uid;
    const storageRef = firebase.storage().ref();
    const filetype = "." + file.type.split("/")[1];
    const filename = file.name.slice(0, -filetype.length).split("-")[1] || file.name;
    const fileartist = file.name.slice(0, -filetype.length).split("-")[0] || file.name;
    const metatdata = {contentType: filetype};

    let image_url;
    await unsplash.photos.getRandomPhoto().then(res => res.json()).then(json => image_url = json.urls.small)

    const uploadTask = storageRef.child("music/" + filename).put(file, metatdata);

    uploadTask
        .on('state_changed', (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
            console.log(progress)
            dispatch({type: PROGRESS_SONG, payload: progress})

            if (getState().songs.cancel) {
                dispatch({type: STATUS_SONG, payload: "cancel"})
                dispatch({type: CLEAR_STATUS_SONG})
                dispatch({type: UPLOADING_SONG, payload: false})
                uploadTask.cancel();
            }
            if (snapshot.state === "running") dispatch({type: STATUS_SONG, payload: "running"})


        }, (err) => {
            console.log(err)
        }, () => {
            uploadTask.snapshot.ref
                .getDownloadURL()
                .then(downloadURL => {
                    firestore
                        .collection("users")
                        .doc(uid)
                        .get()
                        .then(doc => {
                            const lastSongs = doc.data().songs;
                            const at_song = {
                                title: filename,
                                full_name: file.name,
                                type: file.type,
                                artist: fileartist,
                                url: downloadURL,
                                img: image_url,
                                id: new Date().valueOf()
                            };
                            //  Set ne song to the list, move all to app.js

                            dispatch({type: ADD_SONG, payload: at_song})
                            console.log(at_song);
                            if (lastSongs) {
                                const newSongs = [...lastSongs, at_song];
                                firestore
                                    .collection("users")
                                    .doc(uid)
                                    .update({songs: newSongs})
                                    .then(() => {
                                        dispatch({type: UPLOADING_SONG, payload: false})
                                        dispatch({type: STATUS_SONG, payload: "completed"})
                                        dispatch({type: CLEAR_STATUS_SONG})
                                        /*this.setState({uploading: false, status: "completed", songs: [...this.state.songs, at_song]});

                                        setTimeout(() => this.setState({add_new: !this.state.add_new, process: 0, error: null,cancel: false}), 1000)*/
                                        console.log("completed")
                                    })
                                    .catch(err => dispatch({type: ERROR_SONG, payload: err}))
                            } else {
                                firestore
                                    .collection("users")
                                    .doc(uid)
                                    .update({songs: [at_song]})
                                    .then(() => {
                                        dispatch({type: UPLOADING_SONG, payload: false})
                                        dispatch({type: STATUS_SONG, payload: "completed"})
                                        dispatch({type: CLEAR_STATUS_SONG})
                                        /*this.setState({uploading: false, status: "completed", songs: [at_song]});
                                        setTimeout(() => this.setState({add_new: !this.state.add_new, process: 0, error: null,cancel: false}), 700)*/
                                        console.log("completed")
                                    })
                                    .catch(err => dispatch({type: ERROR_SONG, payload: err}))
                            }
                        })
                })
        })

}
export const CancelUploadSong = () => (dispatch, getState) => dispatch({type: CANCEL_SONG, payload: true})