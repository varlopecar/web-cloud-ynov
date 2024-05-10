import { app } from '../../../firebaseConfig';
import React, { useEffect, useState } from 'react'
import { getAuth, User, updateProfile } from 'firebase/auth';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { updateUserPhotoUrl } from '../../../firebase/auth_update_photo_url';
import { uploadToFirebase } from '../../../firebase/auth_upload_firebase';

const auth = getAuth(app);

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [displayName, setDisplayName] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const router = useRouter();

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
            setUser(null);
            router.replace('/sign-in')
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);

            const { uri } = result.assets[0];
            const fileName = uri.split("/").pop();
            const uploadResp = await uploadToFirebase(uri, fileName);
            let res = await updateUserPhotoUrl(uploadResp);
            if (res) {
                console.log(res);
                setUser({ ...user, photoURL: uploadResp } as any);
            } else {
                console.log('Error updating photo')
            };
        }
    };

    const updateUserName = (displayName: string) => {
        verifyDisplayName(displayName);

        updateProfile(auth.currentUser as any, {
            displayName: displayName
        }).then(() => {
            console.log('Display name updated')
            setUser({ ...user, displayName: displayName } as any)
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const verifyDisplayName = (displayName: string) => {
        if (!displayName) {
            console.log('Please enter a display name');
            return;
        }

        if (displayName.length < 3) {
            console.log('Display name must be at least 3 characters');
            return;
        }

        if (displayName.length > 20) {
            console.log('Display name must be less than 20 characters');
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false, title: "Profile" }} />
            {user ? (
                <>
                    <View style={styles.header}>
                        <Text style={styles.title}>Profile</Text>
                        <Pressable onPress={logOut} style={styles.button}>
                            <Text style={styles.buttonText}>Log Out</Text>
                        </Pressable>
                    </View>
                    <Image source={{ uri: user.photoURL || undefined }} style={styles.profileImage} />
                    <Text style={styles.subtitle}>Welcome, {user.displayName || user.email}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Update Display Name"
                            value={displayName}
                            onChangeText={setDisplayName}
                            style={styles.input}
                        />
                        <Pressable onPress={() => updateUserName(displayName)} style={styles.inputButton}>
                            <Text style={styles.buttonText}>Update Name</Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={pickImage} style={styles.button}>
                        <Text style={styles.buttonText}>Change Profile Picture</Text>
                    </Pressable>
                    <Text style={styles.subtitle}>Email: {user.email}</Text>
                    {user.phoneNumber && <Text style={styles.subtitle}>Phone: {user.phoneNumber}</Text>}
                </>
            ) : (
                <Text style={styles.title}>Please sign in</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
    },
    input: {
        width: '80%',
        padding: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        padding: 14,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    inputButton: {
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
        width: '40%',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        backgroundColor: '#eee',
    }
});