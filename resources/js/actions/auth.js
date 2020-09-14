import { setAlert } from './alert';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL
} from './types';
import { csrf_token } from '../constants';

export const loadUser = () => async dispatch => {
    try {
        if(localStorage.token) {
            const res = await window.axios.get(`/api/user?api_token=${localStorage.token}`);

            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        }
    } catch(err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({name, email, password});
    try {
        const res = await window.axios.post('/api/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch(err) {
        const errorMsg = err.response.data.message;
        dispatch({
            type: REGISTER_FAIL,
        });
        dispatch(setAlert(errorMsg, 'danger', 10000));
    }
}

// Login User
export const login = ({email, password}) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({email, password});
    try {
        const res = await window.axios.post('/api/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    } catch(err) {
        const errorMsg = err.response.data.message;
        dispatch({
            type: LOGIN_FAIL,
        });
        dispatch(setAlert(errorMsg, 'danger', 10000));
    }
}
