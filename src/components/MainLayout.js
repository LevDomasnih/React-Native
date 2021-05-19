import React, {useContext, useState} from "react";
import Navbar from "./Navbar";
import {Alert, StyleSheet, View} from "react-native";
import TodoScreen from "../screens/TodoScreen";
import MainScreen from "../screens/MainScreen";
import theme from "../theme";
import TodoContext from "../context/todo/todoContext";

const MainLayout = () => {
    const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext)
    const [todoId, setTodoId] = useState(null)
    // const [todos, setTodos] = useState([])

    // const addTodo = (title) => {
    //     const newTodo = {
    //         id: Date.now().toString(),
    //         title
    //     }
    //
    //     setTodos((prev) => [...prev, newTodo])
    // }

    // const removeTodo = (removeId) => {
    //     const todo = todos.find(t => t.id === removeId)
    //     Alert.alert(
    //         "DELETE ELEMENT",
    //         `You sure to delete ${todo.title}?`,
    //         [
    //             {
    //                 text: "Cancel",
    //                 style: 'cancel'
    //             },
    //             {
    //                 text: "Delete",
    //                 onPress: () => {
    //                     setTodoId(null)
    //                     setTodos(todos.filter(({id}) => id !== removeId))
    //                 }
    //             }
    //         ],
    //         {cancelable: false}
    //     )
    // }

    // const updateTodo = (id, title) => {
    //     setTodos(prev => {
    //         return prev.map(todo => {
    //             if (todo.id === id) {
    //                 todo.title = title
    //             }
    //             return todo
    //         })
    //     })
    // }

    return (
        <>
            <Navbar title="Todo App"/>
            <View style={styles.container}>
                {todoId ?
                    <TodoScreen
                        goBack={() => setTodoId(null)}
                        todo={todos.find(({id}) => id === todoId)}
                        removeTodo={removeTodo}
                        onSave={updateTodo}
                    /> :
                    <MainScreen
                        addTodo={addTodo}
                        todos={todos}
                        removeTodo={removeTodo}
                        openTodo={setTodoId}
                    />
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: theme.PADDING_HORIZONTAL,
        paddingVertical: 20,
    }
});

export default MainLayout