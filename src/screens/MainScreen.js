import React from "react";
import {FlatList, Image, StyleSheet, View} from "react-native";
import Todo from "../components/Todo";
import AddTodo from "../components/AddTodo";

const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => (
    <>
        <AddTodo onSubmit={addTodo} todos={todos}/>

        {todos.length ?
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => (
                    <Todo
                        todo={item}
                        onRemove={removeTodo}
                        onOpen={openTodo}
                    />
                )}
            /> :
            <View style={styles.imgWrap}>
                <Image
                    style={styles.image}
                    source={require('../../assets/no-items.png')}
                />
            </View>
        }
    </>
)

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: 300
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    }
})

export default MainScreen

