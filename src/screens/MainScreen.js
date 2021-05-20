import React, {useCallback, useContext, useEffect, useState} from "react";
import {Dimensions, FlatList, Image, StyleSheet, View} from "react-native";
import Todo from "../components/Todo";
import AddTodo from "../components/AddTodo";
import theme from "../theme";
import TodoContext from "../context/todo/todoContext";
import ScreenContext from "../context/screen/screenContext";
import AppLoader from "../components/ui/AppLoader";
import AppText from "../components/ui/AppText";
import AppButton from "../components/ui/AppButton";

const MainScreen = () => {
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)
    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get("window").width - theme.PADDING_HORIZONTAL * 2
    )

    const loadTodos = useCallback(async () => await fetchTodos(),[fetchTodos])

    useEffect(() => {
        loadTodos()
    }, [])

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

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>
                    {error}
                </AppText>
                <AppButton style={{marginTop: 20}} onPress={loadTodos} children="Retry" color={theme.MAIN_COLOR} />
            </View>
        )
    }

    return (
        <>
            <AddTodo onSubmit={addTodo} todos={todos}/>

            {todos.length ?
                <View style={{width: deviceWidth, flex: 1}}>
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
    },
    error: {
        fontSize: 20,
        color: theme.DANGER_COLOR
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default MainScreen

