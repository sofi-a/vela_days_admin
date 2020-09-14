import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_FAIL,
} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch(type) {
		case FETCH_CATEGORIES:
			return [...state, payload];
		case FETCH_CATEGORIES_FAIL:
		default:
			return state;
	}
}
