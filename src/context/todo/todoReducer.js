import {
    ADD_TODO,
    CLEAR_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO
} from "../types";

const todoReducer = (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    {
                        id: action.id,
                        title: action.title
                    },
                    ...state.todos,
                ]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.id) {
                        todo.title = action.title
                    }
                    return todo
                })
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(({id}) => id !== action.id)
            }
        case SHOW_LOADER:
            return {
                ...state,
                loading: true
            }
        case HIDE_LOADER:
            return {
                ...state,
                loading: false
            }
        case SHOW_ERROR:
            return {
                ...state,
                error: action.error
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case FETCH_TODOS:
            return {
                ...state,
                todos: action.todos.reverse()
            }
        default:
            return state
    }
}

export default todoReducer