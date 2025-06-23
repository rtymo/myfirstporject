import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/button";
import { ListItem } from "../components/listitem";
import { theme } from "../constants/theme";

interface Diary {
    id: string;
    title: string;
    body: string;
    date: string;
}

export const Home = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDiaries();
    }, []);

    const loadDiaries = async () => {
        try {
            setLoading(true);
            const stored = await AsyncStorage.getItem('diaries');
            if (stored) {
                setDiaries(JSON.parse(stored));
            } else {
                setDiaries([]);
            }
        } catch (error) {
            console.error('Error loading diaries:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadDiaries();
        }, [])
    );

    const handleDiaryPress = (diary: Diary) => {
        router.push({
            pathname: "/screens/diary",
            params: { diary: diary.id }
        });
    };

    const handleAddDiary = () => {
        router.push({
            pathname: "/screens/addDiary",
            params: { mode: "create" }
        });
    };

    const renderDiary = ({ item }: { item: Diary }) => (
        <ListItem 
            title={item.title} 
            subtitle={item.body} 
            onPress={() => handleDiaryPress(item)}
        />
    );

    if (loading) {
        return (
            <View style={styles.home}>
                <View style={styles.content}>
                    <Text style={styles.placeholder}>Loading...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.home}>
            {diaries.length === 0 ? (
                <View style={styles.content}>
                    <Text style={styles.placeholder}>No Diaries yet</Text>
                </View>
            ) : (
                <View style={styles.body}>
                    <FlatList
                        data={diaries}
                        keyExtractor={(item) => item.id}
                        renderItem={renderDiary}
                        showsVerticalScrollIndicator={false}
                        style={styles.list}
                    />
                </View>
            )}
            <Button title="Add a new diary" onPress={handleAddDiary} />
        </View>
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        justifyContent: "flex-end",
    },
    content: theme.common.centerContent,
    placeholder: {
        fontSize: theme.typography.sizes.xlarge,
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.text.light,
    },
    body: {
        flex: 1,
        justifyContent: "flex-start",
    },
    list: {
        flex: 1,
    },
});

export default Home;