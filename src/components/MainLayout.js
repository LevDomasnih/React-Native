import React, {useContext} from "react";
import Navbar from "./Navbar";
import { StyleSheet, View} from "react-native";
import TodoScreen from "../screens/TodoScreen";
import MainScreen from "../screens/MainScreen";
import theme from "../theme";
import ScreenContext from "../context/screen/screenContext";

const MainLayout = () => {
    const {todoId} = useContext(ScreenContext)

    return (
        <>
            <Navbar title="Todo App"/>
            <View style={styles.container}>
                { todoId ? <TodoScreen /> : <MainScreen /> }
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