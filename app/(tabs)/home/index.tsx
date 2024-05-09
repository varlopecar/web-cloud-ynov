import { StatusBar } from 'expo-status-bar';
import { styles } from '../../../styles';
import { Pressable, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPostData } from '../../../firebase/get_post_data';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostData();
        setPosts(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: "Home" }} />
      {/* <Link href="/addPost" style={styles.link}>Add Post</Link> */}

      {
        posts.map((post: any) => (
          <View key={post.id}>
            <Text>{post.title}</Text>
            <Text>{post.content}</Text>

            <Pressable style={styles.button}>
              <Link href={`/post/${post.id}`}>
                View
              </Link>
            </Pressable>
          </View>
        ))
      }

      <StatusBar style="auto" />
    </View>
  );
}
