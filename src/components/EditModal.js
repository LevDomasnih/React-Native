import React, {useState} from "react";
import {Alert, Button, Modal, StyleSheet, TextInput, View} from "react-native";
import theme from "../theme";
import AppButton from "./ui/AppButton";

const EditModal = ({visible, setModal, value, onSave}) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if(title.trim().length < 3) {
            Alert.alert('Error!', `Minimal length title - 3 char. But now - ${title.trim().length}`)
        } else {
            onSave(title)
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
        >
            <View style={styles.wrap}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new value"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={64}
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.buttons}>
                    <AppButton onPress={saveHandler}>
                        Save
                    </AppButton>
                    <AppButton onPress={() => setModal(false)} color={theme.DANGER_COLOR}>
                        Cancel
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    input: {
        padding: 10,
        borderBottomColor: theme.MAIN_COLOR,
        borderBottomWidth: 2,
        width: "80%"
    },
    buttons: {
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    }
})

export default EditModal