import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RegisterDetailsScreen from '../screens/auth/RegisterDetailsScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterDetails: { role: 'Student' | 'Driver' | 'Delivery and Pick up' };
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RegisterDetails" component={RegisterDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
