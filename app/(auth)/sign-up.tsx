import React, { useState } from 'react';
import { Image, Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase } from '../../firebase/auth_upload_firebase';
import { updateUserPhotoUrl } from '../../firebase/auth_update_photo_url';

const auth = getAuth();
const storage = getStorage();

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name, photoURL: null });
      if (image) {
        await updateUserPhotoUrl(image);
      }
      setMessage('User registered successfully');
      router.replace('/(tabs)/home');
    } catch (error: any) {
      setMessage('Error signing up: ' + error.message);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri as any);

      const { uri } = result.assets[0];
      const fileName = uri.split("/").pop();
      const uploadResp = await uploadToFirebase(uri, fileName);
      let res = await updateUserPhotoUrl(uploadResp);
      if (res) {
        console.log(res);
      } else {
        console.log('Error updating photo')
      };
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Pressable onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Pick Profile Image</Text>
      </Pressable>
      <Pressable onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      {message ? <Text>{message}</Text> : null}
      <Text>Already have an account?</Text>
      <Pressable onPress={() => router.replace('/sign-in')}>
        <Text style={styles.link}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    color: '#007bff',
    marginTop: 15,
  }
});

export default SignUp;
