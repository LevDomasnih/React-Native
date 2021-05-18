import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import Todo from "../components/Todo";
import AddTodo from "../components/AddTodo";

const MainScreen = ({addTodo, todos, removeTodo}) => {
    return (
        <View>
            <AddTodo onSubmit={addTodo} todos={todos}/>

            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} />}
            />
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({})