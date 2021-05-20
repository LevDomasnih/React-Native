import React from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";

const AppLoader = () => {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AppLoader