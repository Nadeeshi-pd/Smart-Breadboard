import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CircuitIcon from '../../components/CircuitIcon';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      router.replace('/experiments');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <CircuitIcon />
        <Text style={styles.tagline}>GREAT CIRCUITS GROW FROM SMALL CONNECTIONS</Text>
      </View>
      
      <View style={styles.formSection}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 80,
  },
  tagline: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 1,
  },
  formSection: {
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#333',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  arrowText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
