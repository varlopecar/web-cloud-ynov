import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { signinwithmail } from '../../firebase/auth_sigin_email';
import { signInWithGithub } from '../../firebase/auth_github';
import { authPhoneVerifyCode } from '../../firebase/auth_phone_verify_code';
import { SiGithub } from '@icons-pack/react-simple-icons'
import { loginWithPhoneNumber } from '../../firebase/auth_phone_signin';

const auth = getAuth();

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                router.replace('/(tabs)/home');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleSignIn = async () => {
        try {
            signinwithmail(email, password);
            router.push('/(tabs)/home');
        } catch (error: any) {
            setMessage('Failed to sign in: ' + error.message);
        }
    };

    const handleSignInWithPhone = async () => {
        try {
            const response = await loginWithPhoneNumber(phoneNumber)
            console.log(response);
        } catch (error: any) {
            const errorMessage = error.message;
            setMessage(errorMessage);
        }
    }

    const verifyCode = async () => {
        try {
            const response = await authPhoneVerifyCode(code);
            console.log(response);
        } catch (error: any) {
            const errorMessage = error.message;
            setMessage(errorMessage);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <Pressable onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
            <Text>Or</Text>
            <Pressable onPress={() => signInWithGithub()} style={styles.button}>
                <Text style={styles.buttonText}>Sign In with Github</Text>
                <SiGithub size={20} color="#fff" />
            </Pressable>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Pressable onPress={handleSignInWithPhone} style={styles.button}>
                <Text style={styles.buttonText}>Sign In with Phone</Text>
            </Pressable>
            <TextInput
                style={styles.input}
                placeholder="Verification Code"
                value={code}
                onChangeText={setCode}
            />
            <Pressable onPress={verifyCode} style={styles.button}>
                <Text style={styles.buttonText}>Verify Code</Text>
            </Pressable>
            <Text style={styles.message}>{message}</Text>
            <Text>You don't have an account?</Text>
            <Pressable onPress={() => router.replace('/sign-up')}>
                <Text style={styles.link}>Sign Up</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    input: {
        height: 40,
        width: 250,
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
        width: 250,
        alignItems: 'center',
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
    message: {
        color: 'red',
        margin: 10,
    },
    link: {
        color: '#007bff',
        marginTop: 20,
    }
});

export default SignIn;
