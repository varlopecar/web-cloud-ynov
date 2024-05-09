import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import { getAuth, User } from 'firebase/auth';
import { Link } from 'expo-router';
import { createPost } from '../../firebase/add_post_data';
import { styles } from '../../styles';

const AddPostPage = () => {
    const [user, setUser] = useState<User | null>(null)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // Check if the user is authenticated
        const auth = getAuth();

        auth.onAuthStateChanged((user: User | null) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        });
    }, []);

    const handleAddPost = async () => {
        // Add the post to Firebase
        await createPost(title, content, user?.uid);
        setTitle('');
        setContent('');
    };

    return (
        <View>
            {
                user ? (
                    <View style={styles.container}>
                        <Text>Welcome {user.email}</Text>

                        <TextInput
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="Content"
                            value={content}
                            onChangeText={setContent}
                            style={styles.input}
                        />

                        <Pressable
                            onPress={handleAddPost}
                            style={styles.button}
                        >
                            <Text style={styles.textCenter}>Add Post</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text>You are not signed in</Text>
                        <Link href={'/signin'} style={styles.link}>Sign in</Link>
                    </View>
                )
            }
        </View>
    );
};

export default AddPostPage;