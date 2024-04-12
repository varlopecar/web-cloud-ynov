import '../../firebaseConfig'
import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';

const auth = getAuth();

const Profile = () => {
    const [user, setUser] = useState<any | null>(null)

    useEffect(() => {
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
            {
                user ? (
                    <View>
                        <Text>Welcome {user.email}</Text>

                        <Pressable onPress={logOut}>
                            <Text>Sign Out</Text>
                        </Pressable>

                        <Text>UID: {user.uid}</Text>
                    </View>
                ) : (
                    <View>
                        <Text>You are not signed in</Text>
                        <Link href={'/signin'}>Sign in</Link>
                    </View>
                )
            }
        </>

    )
}

export default Profile