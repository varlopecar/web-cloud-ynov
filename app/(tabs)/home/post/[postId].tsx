// Imports
import React, { useState, useEffect } from 'react';
import { getAuth, User } from "firebase/auth";
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useLocalSearchParams, Stack } from "expo-router";
import { getOnePostData } from "../../../../firebase/get_one_post_data";
import PostComponent from "../../../../components/Post";
import { getCommentsForPost } from '../../../../firebase/get_comment_data';
import { createComment } from '../../../../firebase/add_comment_data';
import CommentComponent from '../../../../components/Comment';
import CommentSectionInput from '../../../../components/CommentSection';

const auth = getAuth();

export default function Post() {
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const { postId } = useLocalSearchParams();

    useEffect(() => {
        const fetchPost = async () => {
            const res = await getOnePostData(postId);
            setPost(res);
            const commentsRes = await getCommentsForPost(postId);
            setComments(commentsRes);
            console.log(commentsRes);
        };

        fetchPost();
        auth.onAuthStateChanged(setUser);
    }, [postId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        if (user) {
            await createComment(newComment, user.uid, postId);
            setComments([...comments, { text: newComment, createdBy: user.email, date: new Date() }]);
            setNewComment('');
            const commentsRes = await getCommentsForPost(postId);
            setComments(commentsRes);
        } else {
            console.log("User must be logged in to comment");
        }
    };

    if (!post) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ flex: 1, margin: 10 }}>
            <PostComponent post={post} />
            {comments.map((comment, index) => (
                <CommentComponent key={index} text={comment.text} createdBy={comment.createdBy} date={comment.date} />
            ))}
            {user && (
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Write a comment..."
                        value={newComment}
                        onChangeText={setNewComment}
                        onSubmitEditing={handleAddComment}

                    />
                    <Pressable onPress={handleAddComment} style={{ padding: 10, backgroundColor: '#007bff', borderRadius: 5 }}>
                        <Text>Post</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    }
});
