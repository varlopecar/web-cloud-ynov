import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPostData } from '../../../firebase/get_post_data';
import { User, getAuth } from 'firebase/auth';
import CardComponent from '../../../components/Card';
import { createPost } from '../../../firebase/add_post_data';

const auth = getAuth();

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (!user) {
        router.replace('/sign-in');
      }
      setUser(user);
    });

    const fetchPosts = async () => {
      try {
        const data = await getPostData();
        setPosts(data);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    };

    fetchPosts();
    return () => unsubscribe();
  }, []);

  const handleAddPost = async () => {
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }
    await createPost(title, content, user?.uid);
    setTitle('');
    setContent('');
    
    const data = await getPostData();
    setPosts(data);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: "Main Page" }} />
      <StatusBar style="auto" />
      {user ? (
        <View style={styles.inputContainer}>
          <Text style={styles.welcomeText}>Welcome {user.email}</Text>
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
          <Pressable onPress={handleAddPost} style={styles.button}>
            <Text style={styles.buttonText}>Add Post</Text>
          </Pressable>
        </View>
      ) : (
        <Text>Please sign in to add posts</Text>
      )}
      <ScrollView>
        {posts.map((post: any) => (
          <CardComponent key={post.id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
      padding: 10,
  },
  inputContainer: {
      backgroundColor: '#ffffff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
      marginBottom: 20,
  },
  input: {
      backgroundColor: '#fff',
      marginBottom: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 5,
      borderColor: '#ccc',
      borderWidth: 1,
      fontSize: 16,
      color: '#333',
  },
  button: {
      backgroundColor: '#007bff',
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
  },
  buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  welcomeText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
  }
});