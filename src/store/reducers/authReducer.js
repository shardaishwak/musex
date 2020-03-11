import {AUTH_LOADING, AUTH_STATUS, GET_AUTH_INFO, REMOVE_AUTH_INFO} from "../constants/authConstants";

const initialState = {
    auth: null,
    auth_info: null,
    loading: false
};

const auth_status = (state, {payload}) => {
    return {
        ...state,
        auth: payload
    }
};
const get_auth_info = (state, {payload}) => {
    return {
        ...state,
        auth_info: payload
    }
}
const remove_auth_info = (state, {payload}) => {
    return {
        ...state,
        auth_info: null
    }
}
const auth_loading = (state, {payload}) => {
    return {
        ...state,
        loading: payload
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_STATUS:
            return auth_status(state, action);
        case GET_AUTH_INFO:
            return get_auth_info(state, action)
        case REMOVE_AUTH_INFO:
            return remove_auth_info(state, action)
        case AUTH_LOADING:
            return auth_loading(state, action)

        default: return state;
    }
};
