import {
    ADD_SONG, CANCEL_SONG,
    CLEAR_SONGS, CLEAR_STATUS_SONG, DELETE_SONG,
    ERROR_SONG,
    GET_SONGS,
    PROGRESS_SONG,
    STATUS_SONG,
    UPLOADING_SONG
} from "../constants/songsConstants";

const initialState = {
    songs: [],
    loading: false,
    error: null,
    progress: 0,
    status: null,
    uploading: false,
    cancel: false
}
const get_songs = (state, {payload}) => {
    return {
        ...state,
        songs: payload
    }
}
const clear_songs = (state, action) => {
    return {
        ...state,
        songs: []
    }
}
const add_song = (state, {payload}) => {
    return {
        ...state,
        songs: [...state.songs, payload]
    }
}
const delete_song = (state, {payload}) => {
    return {
        ...state,
        songs: payload
    }
}
const error_song = (state, {payload}) => {
    return {
        ...state,
        error: payload
    }
}
const progress_song = (state, {payload}) => {
    return {
        ...state,
        progress: payload
    }
}
const status_song = (state, {payload}) => {
    return {
        ...state,
        status: payload
    }
}
const uploading_song = (state, {payload}) => {
    return {
        ...state,
        uploading: payload
    }
}
const cancel_song = (state, {payload}) => {
    return {
        ...state,
        cancel: payload
    }
}
const clear_status = (state, {payload}) => {
    return {
        ...state,
        error: null,
        progress: 0,
        cancel: false
    }
}
export default (state = initialState, action) => {
    switch(action.type) {
        case GET_SONGS:
            return get_songs(state, action)
        case CLEAR_SONGS:
            return clear_songs(state, action)
        case ADD_SONG:
            return add_song(state, action)
        case ERROR_SONG:
            return error_song(state, action)
        case PROGRESS_SONG:
            return progress_song(state, action)
        case STATUS_SONG:
            return status_song(state, action)
        case UPLOADING_SONG:
            return uploading_song(state, action)
        case CANCEL_SONG:
            return cancel_song(state, action)
        case CLEAR_STATUS_SONG:
            return clear_status(state, action)
        case DELETE_SONG:
            return delete_song(state, action)

        default: return state;

    }
}