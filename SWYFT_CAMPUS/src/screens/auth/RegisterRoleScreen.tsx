import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, Role } from '../../navigation/AuthNavigator';
import { COLORS, FONTS } from '../../constants/theme';

type NavProps = StackNavigationProp<AuthStackParamList, 'RegisterRole'>;

const RegisterRoleScreen = () => {
  const navigation = useNavigation<NavProps>();

  const handleSelectRole = (role: Role) => {
    navigation.navigate('RegisterForm', { role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join SWYFT CAMPUS</Text>
      <Text style={styles.subtitle}>Select your role to get started</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleSelectRole('Student')}>
        <Text style={styles.buttonText}>I'm a Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSelectRole('Driver')}>
        <Text style={styles.buttonText}>I'm a Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSelectRole('Business')}>
        <Text style={styles.buttonText}>I'm a Business</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    ...FONTS.body,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default RegisterRoleScreen;
