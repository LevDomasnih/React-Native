import React, {useContext, useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import theme from './../theme'
import AppCard from "../components/ui/AppCard";
import EditModal from "../components/EditModal";
import AppTextBold from "../components/ui/AppTextBold";
import AppButton from "../components/ui/AppButton";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import ScreenContext from "../context/screen/screenContext";
import TodoContext from "../context/todo/todoContext";

const TodoScreen = () => {
    const {todoId, changeScreen} = useContext(ScreenContext)
    const {todos, removeTodo, updateTodo} = useContext(TodoContext)
    const [modal, setModal] = useState(false)

    const todo = todos.find(({id}) => id === todoId)

    const saveHandler = async (title) => {
        await updateTodo(todo.id, title)
        setModal(false)
    }

    return (
        <>
            <EditModal
                value={todo.title}
                visible={modal}
                setModal={setModal}
                onSave={saveHandler}
            />

            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name='edit' size={20} color="#fff"/>
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton
                        onPress={() => changeScreen(null)}
                        color={theme.GREY_COLOR}
                    >
                        <AntDesign name='back' size={20}/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={theme.DANGER_COLOR}
                        onPress={() => removeTodo(todo.id)}
                    >
                        <FontAwesome name='remove' size={20}/>
                    </AppButton>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        width: Dimensions.get('window').width > 400 ? 150 : 100,
    },
    card: {
        marginBottom: 20
    },
    title: {
        fontSize: 26
    }
})

export default TodoScreen
