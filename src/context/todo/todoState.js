import React, {useContext, useReducer} from "react";
import TodoContext from "./todoContext";
import todoReducer from "./todoReducer";
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
import ScreenContext from "../screen/screenContext";
import {Alert} from "react-native";
import Http from "../../http";

const TodoState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }

    const {changeScreen} = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async (title) => {
        clearError()
        try {
            const data = await Http.post(
                `https://react-native-c1a7d-default-rtdb.firebaseio.com/todos.json`,
                {title}
            )
            dispatch({type: ADD_TODO, title, id: data.name})
        } catch (e) {
            showError("Ops... what was wrong :(")
        }

    }

    const removeTodo = (id) => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            "DELETE ELEMENT",
            `You sure to delete ${todo.title}?`,
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        clearError()
                        try {
                            changeScreen(null)
                            await Http.delete(`https://react-native-c1a7d-default-rtdb.firebaseio.com/todos/${id}.json`)
                            dispatch({type: REMOVE_TODO, id})
                        } catch (e) {
                            showError("Ops... what was wrong :(")
                        }

                    }
                }
            ],
            {cancelable: false}
        )
    }

    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            const data = await Http.get(`https://react-native-c1a7d-default-rtdb.firebaseio.com/todos.json`)
            const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
            dispatch({type: FETCH_TODOS, todos})
        } catch (e) {
            showError("Ops... what was wrong :(")
        } finally {
            hideLoader()
        }

    }

    const updateTodo = async (id, title) => {
        clearError()
        try {
            await Http.patch(`https://react-native-c1a7d-default-rtdb.firebaseio.com/todos/${id}.json`, {id, title})
            dispatch({type: UPDATE_TODO, id, title})
        } catch (e) {
            showError("Ops... what was wrong :(")
        }

    }

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const hideLoader = () => dispatch({type: HIDE_LOADER})

    const showError = (error) => dispatch({type: SHOW_ERROR, error})

    const clearError = () => dispatch({type: CLEAR_ERROR})

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            fetchTodos,
            addTodo,
            removeTodo,
            updateTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoState