import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Navbar from "./src/components/Navbar";
import AddTodo from "./src/components/AddTodo";
import Todo from "./src/components/Todo";
import MainScreen from "./src/screens/MainScreen";
import TodoScreen from "./src/screens/TodoScreen";

export default function App() {
    const [todoId, setTodoId] = useState(null)
    const [todos, setTodos] = useState([])

    useEffect(() => {
        setTodos([
            { id: 1, title: '1' },
            { id: 2, title: '2' },
            { id: 3, title: '3' },
            { id: 4, title: '4' },
            { id: 5, title: '5' },
            { id: 6, title: '6' },
            { id: 7, title: '7' },
            { id: 8, title: '8' },
            { id: 9, title: '9' },
            { id: 10, title: '10' },
        ])
    }, [])



    const addTodo = (title) => {
        const newTodo = {
            id: Date.now().toString(),
            title
        }

        setTodos((prev) => [ ...prev, newTodo ] )
    }

    const removeTodo = (removeId) => {
        setTodos(todos.filter(({id}) => id !== removeId))
    }

    return (
        <>
            <Navbar title="Todo App"/>
            <View style={styles.container}>
                {todoId ?
                    <TodoScreen /> :
                    <MainScreen addTodo={addTodo} todos={todos} removeTodo={removeTodo} />
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
});
