import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../constants/theme";

interface Diary {
    id: string;
    title: string;
    body: string;
    date: string;
}

export default function DiaryScreen() {
    const { diary: diaryId } = useLocalSearchParams();
    const [diary, setDiary] = useState<Diary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDiary();
    }, [diaryId]);

    const loadDiary = async () => {
        try {
            const stored = await AsyncStorage.getItem('diaries');
            if (stored) {
                const diaries: Diary[] = JSON.parse(stored);
                const foundDiary = diaries.find(d => d.id === diaryId);
                setDiary(foundDiary || null);
            }
        } catch (error) {
            console.error('Error loading diary:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    if (!diary) {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.errorText}>Diary not found</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <AntDesign name="left" size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Diary Entry</Text>
                    <View style={styles.placeholder} />
                </View>
                
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.diaryContainer}>
                        <Text style={styles.title}>{diary.title}</Text>
                        <Text style={styles.date}>{formatDate(diary.date)}</Text>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.body}>{diary.body}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: theme.common.safeContainer,
    container: theme.common.container,
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
    },
    backButton: {
        padding: theme.spacing.xs,
    },
    headerTitle: {
        fontSize: theme.typography.sizes.large,
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.text.primary,
    },
    placeholder: {
        width: 34, 
    },
    content: {
        flex: 1,
    },
    diaryContainer: {
        padding: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography.sizes.xxlarge,
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
    date: {
        fontSize: theme.typography.sizes.small,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.xl,
        fontStyle: "italic",
    },
    bodyContainer: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.medium,
        padding: theme.spacing.lg,
        minHeight: 200,
    },
    body: {
        fontSize: theme.typography.sizes.small,
        lineHeight: 24,
        color: theme.colors.text.primary,
    },
    loadingContainer: theme.common.centerContent,
    loadingText: {
        fontSize: theme.typography.sizes.medium,
        color: theme.colors.text.secondary,
    },
    errorText: {
        fontSize: theme.typography.sizes.medium,
        color: theme.colors.text.secondary,
    },
});
