import React from "react";
import {Text, View, StyleSheet} from "react-native";

const Navbar = (props) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3949ab",
    },
    text: {
        color: "white"
    }
})

export default Navbar