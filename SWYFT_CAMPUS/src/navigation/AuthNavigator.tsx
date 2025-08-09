import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterRoleScreen from '../screens/auth/RegisterRoleScreen';
import RegisterFormScreen from '../screens/auth/RegisterFormScreen';

export type Role = 'Driver' | 'Student' | 'Business';

export type AuthStackParamList = {
  Login: undefined;
  RegisterRole: undefined;
  RegisterForm: { role: Role };
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterRole" component={RegisterRoleScreen} />
      <Stack.Screen name="RegisterForm" component={RegisterFormScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
