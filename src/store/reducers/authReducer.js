import {
  AUTH_LOADING,
  AUTH_STATUS,
  CLEAR_AUTH_ERROR,
  GET_AUTH_ERROR,
  GET_AUTH_INFO,
  REMOVE_AUTH_INFO,
} from "../constants/authConstants";

const initialState = {
  auth: null,
  auth_info: null,
  loading: false,
  error: null,
};

const auth_status = (state, { payload }) => {
  return {
    ...state,
    auth: payload,
  };
};
const get_auth_info = (state, { payload }) => {
  return {
    ...state,
    auth_info: payload,
  };
};
const remove_auth_info = (state, { payload }) => {
  return {
    ...state,
    auth_info: null,
  };
};
const auth_loading = (state, { payload }) => {
  return {
    ...state,
    loading: payload,
  };
};
const get_auth_error = (state, { payload, loading }) => {
  return {
    ...state,
    error: payload,
    loading,
  };
};
const clear_auth_error = (state, { payload }) => {
  return {
    ...state,
    error: null,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_STATUS:
      return auth_status(state, action);
    case GET_AUTH_INFO:
      return get_auth_info(state, action);
    case REMOVE_AUTH_INFO:
      return remove_auth_info(state, action);
    case AUTH_LOADING:
      return auth_loading(state, action);
    case GET_AUTH_ERROR:
      return get_auth_error(state, action);
    case CLEAR_AUTH_ERROR:
      return clear_auth_error(state, action);

    default:
      return state;
  }
};
