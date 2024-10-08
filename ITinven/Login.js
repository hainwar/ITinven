// Login.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === '111' && password === '123') {
      navigation.navigate('Home'); // Navigate to Home on successful login
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to IT Inventori</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
        <Icon name="person-add" size={20} color="#fff" />
        <Text style={styles.registerLink}> Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0070B8',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#001F3F',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  registerLink: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
});

export default Login;
