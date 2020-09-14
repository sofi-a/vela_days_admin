import { setAlert } from './alert';
import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_FAIL,
} from './types';

export const fetchCategories = () => async dispatch => {
    try {
        const res = window.axios.get('/api/categories');

        dispatch({
            type: FETCH_CATEGORIES,
            payload: res.data,
        });
    } catch(err) {
        const errMsg = err.response.message;
        dispatch({
            type: FETCH_CATEGORIES_FAIL,
        });
        dispatch(setAlert(errMsg, 'danger'));
    }
}