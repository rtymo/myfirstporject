import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";

export const Button = ({title, onPress}: {title: string, onPress: () => void}) => {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 5,
        borderTopWidth: 1,

    },  
    text: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Button;