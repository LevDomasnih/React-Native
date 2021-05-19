import React from "react";
import {StyleSheet, View} from "react-native";
import AppTextBold from "./ui/AppTextBold";

const Navbar = (props) => (
    <View style={styles.navbar}>
        <AppTextBold style={styles.text}>{props.title}</AppTextBold>
    </View>
)

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3949ab",
    },
    text: {
        fontSize: 35,
        color: "white"
    }
})

export default Navbar