import {GET_SONGS} from "../constants/songsConstants";

const initialState = {
    songs: [],
    loading: false,
}
const get_songs = (state, {payload}) => {
    return {
        ...state,
        songs: payload
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_SONGS:
            return get_songs(state, action)

        default: return state;

    }
}