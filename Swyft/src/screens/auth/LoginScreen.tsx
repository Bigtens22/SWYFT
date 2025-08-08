import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import COLORS from '../../constants/colors';
import GlassmorphicContainer from '../../components/GlassmorphicContainer';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
        Alert.alert('Invalid Input', 'Please enter both email and password.');
        return;
    }
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged will handle navigation
    } catch (error: any) {
        Alert.alert('Login Error', error.message);
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>SWYFT</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>

        <GlassmorphicContainer style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email or Phone Number"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </GlassmorphicContainer>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoToRegister}>
          <Text style={styles.switchText}>Don't have an account? <Text style={styles.signUpText}>Sign Up</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.guestText}>Continue as guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryGradientEnd,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.primaryGradientStart,
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: COLORS.white,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    color: COLORS.primaryGradientStart,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primaryGradientStart,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: COLORS.white,
    marginTop: 20,
  },
  signUpText: {
    color: COLORS.primaryGradientStart,
    fontWeight: 'bold',
  },
  guestText: {
      color: COLORS.primaryGradientStart,
      marginTop: 15,
  }
});

export default LoginScreen;
