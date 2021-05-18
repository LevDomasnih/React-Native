import React from "react";
import {Button, StyleSheet, TextInput, View} from "react-native";

const AddTodo = (props) => {
    return (
        <View style={styles.block}>
            <TextInput style={styles.input} />
            <Button title="Add" />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: "#3949ab"
    }
})

export default AddTodo