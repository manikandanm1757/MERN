import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: true,
    token: localStorage.getItem('token'),
    user: null
};
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                loading: false,
                user: payload,
                isAuthenticated: true
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload);
            return {
                ...state,
                isAuthenticated: true,
                token: payload,
                loading: false
            };
        case REGISTER_ERROR:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                loading: false,
                user: null
            };
        default:
            return state;
    }
}