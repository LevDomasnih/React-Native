import React, {useContext, useEffect, useState} from "react";
import {Dimensions, FlatList, Image, StyleSheet, View} from "react-native";
import Todo from "../components/Todo";
import AddTodo from "../components/AddTodo";
import theme from "../theme";
import TodoContext from "../context/todo/todoContext";
import ScreenContext from "../context/screen/screenContext";

const MainScreen = () => {
    const {addTodo, todos, removeTodo} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)
    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get("window").width - theme.PADDING_HORIZONTAL * 2
    )

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get("window").width - theme.PADDING_HORIZONTAL * 2
            setDeviceWidth(width)
        }

        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })


    return (
        <>
            <AddTodo onSubmit={addTodo} todos={todos}/>

            {todos.length ?
                <View style={{width: deviceWidth}}>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={todos}
                        renderItem={({item}) => (
                            <Todo
                                todo={item}
                                onRemove={removeTodo}
                                onOpen={changeScreen}
                            />
                        )}
                    />
                </View>
                :
                <View style={styles.imgWrap}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/no-items.png')}
                    />
                </View>
            }
        </>
    )
}

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

