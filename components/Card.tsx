import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const CardComponent = ({ post } : any) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{post.title}</Text>
            <Text numberOfLines={2} style={styles.content}>{post.text}</Text>
            <Pressable style={styles.button}>
                <Link href={`/home/post/${post.id}`} style={styles.linkText}>
                    View
                </Link>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        width: '90%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        width: 100,
    },
    linkText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default CardComponent;
