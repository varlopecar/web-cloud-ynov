import { useState } from 'react';
import { signup } from './firebase/auth_signup_password';
import { signin } from './firebase/auth_phone_signin';
import { signInWithGithub } from './firebase/auth_github';
import { authPhoneVerifyCode } from './firebase/auth_phone_verify_code';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');

  const handleSignIn = async () => {
    const isValid = await validateForm();
    if (isValid) {
      checkAuth();
    }
  }

  const checkAuth = async () => {
    try {
      const response = await signup(email, password);
      setMessage('User created');
      console.log(response);
    } catch (error: any) {
      const errorMessage = error.message;
      setMessage(errorMessage);
    }
  }

  const handleSignInWithPhone = async () => {
    try {
      const response = await signin(phoneNumber);
      console.log(response);
    } catch (error: any) {
      const errorMessage = error.message;
      setMessage(errorMessage);
    }
  }

  const verifyCode = async (code: string) => {
    try {
      const response = await authPhoneVerifyCode(code);
      console.log(response);
    } catch (error: any) {
      const errorMessage = error.message;
      setMessage(errorMessage);
    }
  }

  const validateForm = async () => {
    let isValid = true;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email) {
      setMessage('Email is required');
      isValid = false;
    }

    if (!password) {
      setMessage('Password is required');
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      setMessage('Email is invalid');
      isValid = false;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      isValid = false;
    }

    if (password.length > 20) {
      setMessage('Password must be less than 20 characters');
      isValid = false;
    }

    if (email.length > 50) {
      setMessage('Email must be less than 50 characters');
      isValid = false;
    }

    return isValid;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={styles.textCenter}
        >Sign Up</Text>
        <Text
          style={styles.textCenter}
        >Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <Text
          style={styles.textCenter}
        >Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={handleSignIn}
          style={styles.button}
        >
          <Text>Sign Up</Text>
        </Pressable>
        {
          message ? <Text>{message}</Text> : null
        }

        <Pressable
          onPress={signInWithGithub}
          style={styles.button}
        >
          <Text>Sign In with Github</Text>
        </Pressable>
      </View>
      <View>
        <Text
          style={styles.textCenter}
        >Sign In with Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Pressable
          onPress={handleSignInWithPhone}
          style={styles.button}
        >
          <Text>Sign In with Phone</Text>
        </Pressable>
        <div id='recaptcha-container'></div>
        <Text>Code</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCode}
          value={code}
        ></TextInput>
        <Pressable
          onPress={() => verifyCode(code)}
          style={styles.button}
        >
          <Text>Check Code !</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
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
  textCenter: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  }
});
