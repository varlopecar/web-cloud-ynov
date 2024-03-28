import { useState, useEffect } from 'react';
import { signup } from './auth_signup_password';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkAuth = async () => {
    const user = await signup(email, password);
    console.log(user);
  }

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        style={styles.button}
        title="Sign In"
        onPress={() => checkAuth()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    padding: 10,
    margin: 10,
  },
  button: {
    width: 200,
    padding: 10,
    margin: 10,
  }
});
