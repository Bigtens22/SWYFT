import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import COLORS from '../../constants/colors';

const ProfileScreen = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // onAuthStateChanged will handle navigation
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGradientEnd,
  },
  title: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.primaryGradientStart,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
