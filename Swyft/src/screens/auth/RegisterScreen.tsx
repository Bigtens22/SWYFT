import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import COLORS from '../../constants/colors';

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRoleSelection = (role: 'Student' | 'Driver' | 'Delivery and Pick up') => {
    navigation.navigate('RegisterDetails', { role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('Student')}>
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('Driver')}>
        <Text style={styles.buttonText}>Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('Delivery and Pick up')}>
        <Text style={styles.buttonText}>Delivery and Pick up</Text>
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
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.primaryGradientStart,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
