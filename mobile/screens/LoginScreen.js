import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) return;

    try {
      const res = await axios.post("http://10.0.2.2:3001/api/auth/login", {
        email,
        password
      });
      console.log(res.data);
      Alert.alert("Login successfully!");
      // navigation.navigate('Verify', { uid: res.data.data.uid });
      navigation.navigate('Home'); // Navigate to Home screen on successful login
    } catch (error) {
      console.error(error.message);
      Alert.alert("Something went wrong. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <View style={styles.logoBox}>
        <Image
          source={require('../assets/Logo.png')}
          alt='Logo'
          style={{ width: 50, height: 50 }}
        />
        <Text style={styles.appTitle}>HCMUT ACADEMIC FORUM</Text>
      </View>

      <View style={styles.card}>
        <Icon name="account" size={50} color="#40C4FF" style={{ marginBottom: 10 }} />
        <Text style={styles.title}>LOG IN</Text>

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, (!email || !password) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!email || !password}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        {/* OR */}
        <Text style={styles.orText}>OR</Text>

        {/* Social Login Icons */}
        <View style={styles.iconRow}>
          <Icon name="google" size={30} color="#DB4437" />
          <Icon name="facebook" size={30} color="#4267B2" />
          <Icon name="apple" size={30} color="#000000" />
        </View>

        {/* Register */}
        <Text style={styles.registerText}>
          New user? <Text style={styles.linkText}>Register now</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#40C4FF',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  linkText: {
    color: '#40C4FF',
    textAlign: 'right',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#40C4FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#b2ebf2',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 12,
    color: '#777',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    color: '#333',
  },
});
