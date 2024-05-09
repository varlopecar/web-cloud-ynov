import '../../../firebaseConfig'
import React, { useEffect, useState } from 'react'
import { getAuth, User } from 'firebase/auth';
import { Pressable, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';

const auth = getAuth();

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        console.log('Profile page')
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [])

    const logOut = async () => {
        try {
            await auth.signOut();
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false, title: "Home" }} />

            {
                user ? (
                    <View>
                        <Text>Welcome {user.email}</Text>

                        <Pressable onPress={logOut}>
                            <Text>Sign Out</Text>
                        </Pressable>

                        <Text>UID: {user.uid}</Text>

                        <Text>Update your profile</Text>

                    </View>
                ) : (
                    <View>
                        <Text>You are not signed in</Text>
                        <Link href={'/sign-in'}>Sign in</Link>
                    </View>
                )
            }
        </>

    )
}