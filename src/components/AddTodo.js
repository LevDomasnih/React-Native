import React, {useState} from "react";
import {Alert, Button, Keyboard, StyleSheet, TextInput, View} from "react-native";
import theme from "../theme";
import {AntDesign} from "@expo/vector-icons";

const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim())  {
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Warning!!! Empty string')
        }

    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder="Please enter todo..."
                autoCorrect={false}
                autoCapitalize="none"
            />
            <AntDesign.Button name="pluscircleo" onPress={pressHandler}>
                ADD
            </AntDesign.Button>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: theme.MAIN_COLOR
    }
})

export default AddTodo