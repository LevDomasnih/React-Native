import React from "react";
import {Platform, StyleSheet, View} from "react-native";
import AppTextBold from "./ui/AppTextBold";
import theme from "../theme";

const Navbar = (props) => (
    <View style={{...styles.navbar, ...Platform.select({
            ios: styles.navbarIos,
            android: styles.navbarAndroid
        })}}>
        <AppTextBold style={styles.text}>{props.title}</AppTextBold>
    </View>
)

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    navbarAndroid: {
      backgroundColor: theme.MAIN_COLOR
    },
    navbarIos: {
      borderBottomColor: theme.MAIN_COLOR,
      borderBottomWidth: 1
    },
    text: {
        fontSize: 35,
        color: Platform.OS === 'ios' ? theme.MAIN_COLOR : "white"
    }
})

export default Navbar