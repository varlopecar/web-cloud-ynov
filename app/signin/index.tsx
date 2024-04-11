import React, { useState } from 'react'
import { signup } from '../../firebase/auth_signup_password';
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles';
import { signInWithGithub } from '../../firebase/auth_github';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

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
    )
}

export default SignIn