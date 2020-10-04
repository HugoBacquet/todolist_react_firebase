import { GET_TODOS, TODOS_LOADING_START, TODOS_LOADING_STOP, ADD_TOKEN } from '../types';

let initialState = {
    todos: [],
    loading: false,
    selectedTodo: null,
    token: null
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case TODOS_LOADING_START:
            return {
                ...state,
                loading: true
            }
        case TODOS_LOADING_STOP:
            return {
                ...state,
                loading: false
            }
        case GET_TODOS:
            return {
                ...state,
                loading: false,
                todos: payload
            }
        case ADD_TOKEN:
            return {
                ...state,
                token: payload
            }
        default:
            return state
    }
}