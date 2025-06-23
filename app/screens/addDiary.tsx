import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../components/button";
import { theme } from "../constants/theme";

interface Diary {
    id: string;
    title: string;
    body: string;
    date: string;
}

export default function AddDiaryScreen() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [saving, setSaving] = useState(false);

    const saveDiary = async () => {
        if (!title.trim() || !body.trim()) {
            Alert.alert("Error", "Please fill in both title and content");
            return;
        }

        setSaving(true);
        try {
            const newDiary: Diary = {
                id: Date.now().toString(),
                title: title.trim(),
                body: body.trim(),
                date: new Date().toISOString(),
            };

            const stored = await AsyncStorage.getItem('diaries');
            const existingDiaries: Diary[] = stored ? JSON.parse(stored) : [];

            const updatedDiaries = [newDiary, ...existingDiaries];

            await AsyncStorage.setItem('diaries', JSON.stringify(updatedDiaries));

            router.back();
        } catch (error) {
            Alert.alert("Error", "Failed to save diary. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Add New Diary</Text>
                    </View>
                    
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Title</Text>
                            <TextInput
                                style={styles.titleInput}
                                placeholder="Enter diary title..."
                                placeholderTextColor={theme.colors.text.placeholder}
                                value={title}
                                onChangeText={setTitle}
                                autoFocus
                                editable={!saving}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Content</Text>
                            <TextInput
                                style={styles.bodyInput}
                                placeholder="Write your diary entry here..."
                                placeholderTextColor={theme.colors.text.placeholder}
                                value={body}
                                onChangeText={setBody}
                                multiline
                                textAlignVertical="top"
                                editable={!saving}
                            />
                        </View>
                    </View>
                </ScrollView>
                
                <View style={styles.buttonContainer}>
                    <Button 
                        title={saving ? "Saving..." : "Save Diary"} 
                        onPress={saveDiary}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: theme.common.safeContainer,
    container: theme.common.container,
    scrollView: {
        flex: 1,
    },
    header: theme.common.header,
    headerTitle: theme.common.headerTitle,
    form: {
        padding: theme.spacing.xl,
        flex: 1,
    },
    inputGroup: {
        marginBottom: theme.spacing.xxl,
    },
    label: {
        fontSize: theme.typography.sizes.medium,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    titleInput: {
        ...theme.common.input,
        fontWeight: theme.typography.weights.medium,
    },
    bodyInput: {
        ...theme.common.input,
        height: 200,
        lineHeight: 22,
    },
    buttonContainer: {
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.light,
    },
}); 