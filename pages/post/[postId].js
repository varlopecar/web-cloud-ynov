import "../../firebaseConfig"
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from "expo-router";
import { getOnePostData } from "../../firebase/get_one_post_data";

export default function Post() {
    const [post, setPost] = useState(null);

    const { postId } = useLocalSearchParams();

    useEffect(() => {
        const fetchPost = async () => {
            let res = await getOnePostData(postId);
            setPost(res);
        }

        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
        </div>
    );
}