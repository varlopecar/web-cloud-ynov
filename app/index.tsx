import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { Pressable, View } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPostData } from '../firebase/get_post_data';

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostData();
      setPosts(data);
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Link href="/addPost" style={styles.link}>Add Post</Link>

      {
        posts.map((post: any) => (
          <View key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>

            <Pressable style={styles.button}>
              <Link href={`/post/${post.id}`}>View</Link>
            </Pressable>
          </View>
        ))
      }

      <StatusBar style="auto" />
    </View>
  );
}
