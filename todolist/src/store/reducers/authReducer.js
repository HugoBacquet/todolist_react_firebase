import { SIGN_UP, SIGN_IN, AUTH_LOADING_START, AUTH_LOADING_STOP } from '../types';

let initialState = {
    user: null,
    loading: false
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case AUTH_LOADING_START:
            return {
                ...state,
                loading: true
            }
        case AUTH_LOADING_STOP:
            return {
                ...state,
                loading: false
            }
        case SIGN_UP:
        case SIGN_IN:
            return {
                ...state,
                loading: false,
                user: payload
            }
        default:
            return state
    }
}