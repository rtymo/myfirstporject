import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { theme } from "../constants/theme";

export const ListItem = ({title, subtitle, onPress, style}: {title: string, subtitle: string, onPress: () => void, style?: StyleProp<ViewStyle>}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <View style={{flex: 1}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <AntDesign name="right" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.dark,
        alignItems: "center",
        backgroundColor: theme.colors.white,
    },
    title: {
        fontSize: theme.typography.sizes.large,
        fontWeight: theme.typography.weights.bold,
    },
    subtitle: {
        fontSize: theme.typography.sizes.small,
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.xs,
        marginBottom: theme.spacing.md,
    },
});

export default ListItem;