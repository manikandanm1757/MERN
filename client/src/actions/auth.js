import axios from 'axios';

import { setAlert } from './alert';
import {
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setToken';

export const loadUser = () => {
    return async (dispatch) => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get('/api/auth');
            if (res) {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                });
            }
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    }
}

export const login = (email, password) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email, password });
        try {
            const res = await axios.post('/api/auth', body, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.token
            });
            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;
            errors.forEach((error) => {
                dispatch(setAlert(error.msg, 'danger'));
            });
            dispatch({
                type: LOGIN_FAIL
            });
        }
    }
}
export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_PROFILE
        });
        dispatch({
            type: LOGOUT
        });
    }
}
export const register = (name, email, password) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ name, email, password });
        try {
            const res = await axios.post('/api/users', body, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.token
            });
            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                return errors.forEach(error => {
                    dispatch(setAlert(error.msg, 'danger'));
                });
            }
            dispatch({
                type: REGISTER_ERROR
            })
        }
    }
}
