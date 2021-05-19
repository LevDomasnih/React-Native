import React, {useReducer} from "react";
import TodoContext from "./todoContext";
import todoReducer from "./todoReducer";
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../types";

const TodoState = ({children}) => {
    const initialState = {
        todos: [{id: "1", title: 'First TODO'}]
    }
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = (title) => dispatch({type: ADD_TODO, title})

    const removeTodo = (id) => dispatch({type: REMOVE_TODO, id})

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            addTodo,
            removeTodo,
            updateTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoState