import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles';
import { authPhoneVerifyCode } from '../../firebase/auth_phone_verify_code';
import { signin } from '../../firebase/auth_phone_signin';

const SingUp = () => {
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');

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

  return (
    <View style={styles.container}>
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
      {
        message ? <Text>{message}</Text> : null
      }
    </View>
  )
}

export default SingUp