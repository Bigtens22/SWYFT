import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { COLORS, FONTS } from '../../constants/theme';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

type NavProps = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<NavProps>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Please enter email and password.');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Auth state listener will handle navigation
        } catch (error: any) {
            Alert.alert('Login Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to your account</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLORS.gray}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={COLORS.gray}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterRole')}>
                <Text style={styles.switchText}>
                    Don't have an account? <Text style={styles.signUpText}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.secondary,
        padding: 20,
    },
    title: {
        ...FONTS.h1,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        ...FONTS.body,
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: COLORS.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        ...FONTS.body,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        ...FONTS.body,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    switchText: {
        ...FONTS.body,
        color: COLORS.gray,
        textAlign: 'center',
        marginTop: 20,
    },
    signUpText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
