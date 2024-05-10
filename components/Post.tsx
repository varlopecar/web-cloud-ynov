import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostComponent = ({ post }: any) => {
    if (!post) {
        return <Text style={styles.loading}>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: true, title: post.title }} />
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.content}>{post.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    content: {
        fontSize: 16,
        color: '#666',
    },
    loading: {
        fontSize: 16,
        color: '#aaa',
        alignSelf: 'center',
        marginTop: 20,
    }
});

export default PostComponent;
