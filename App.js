import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Navbar from "./src/Navbar";
import AddTodo from "./src/AddTodo";
import Todo from "./src/Todo";

export default function App() {
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
                <AddTodo onSubmit={addTodo} todos={todos}/>

                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={todos}
                    renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} />}
                />
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
