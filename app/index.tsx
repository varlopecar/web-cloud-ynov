import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {

  return (
    <View style={styles.container}>
      <Link href="/signin" style={styles.link}>Sign in</Link>
      <Link href="/signup" style={styles.link}>Sign up</Link>

      <StatusBar style="auto" />
    </View>

  );
}
