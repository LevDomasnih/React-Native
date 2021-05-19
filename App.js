import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import * as Font from 'expo-font'

import Navbar from "./src/components/Navbar";
import MainScreen from "./src/screens/MainScreen";
import TodoScreen from "./src/screens/TodoScreen";
import AppLoading from "expo-app-loading";

const loadApplication = async () => {
    await Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false)
    const [todoId, setTodoId] = useState(null)
    const [todos, setTodos] = useState([])

    useEffect(() => {
        setTodos([
            {id: "1", title: '1111'},
            // {id: "2", title: '2222'},
            // {id: "3", title: '3333'},
            // {id: "4", title: '44444'},
            // {id: "5", title: '55555'},
            // {id: "6", title: '66666'},
            // {id: "7", title: '7777'},
            // {id: "8", title: '88888'},
            // {id: "9", title: '9999'},
            // {id: "10", title: '100000'},
        ])
    }, [])



    if (!isReady) {
        return <AppLoading
            startAsync={loadApplication}
            onError={err => console.log(err)}
            onFinish={() => setIsReady(true)}
        />
    }

    const addTodo = (title) => {
        const newTodo = {
            id: Date.now().toString(),
            title
        }

        setTodos((prev) => [...prev, newTodo])
    }

    const removeTodo = (removeId) => {
        const todo = todos.find(t => t.id === removeId)
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
                    onPress: () => {
                        setTodoId(null)
                        setTodos(todos.filter(({id}) => id !== removeId))
                    }
                }
            ],
            {cancelable: false}
        )
    }

    const updateTodo = (id, title) => {
        setTodos(prev => {
            return prev.map(todo => {
                if (todo.id === id) {
                    todo.title = title
                }
                return todo
            })
        })
    }

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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
});
