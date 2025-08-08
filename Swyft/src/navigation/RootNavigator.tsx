import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import DeliveryAndPickupNavigator from './DeliveryAndPickupNavigator';
import DriverNavigator from './DriverNavigator';
import AdminNavigator from './AdminNavigator';
import { useAuth } from '../hooks/useAuth';

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  const renderMainNavigator = () => {
    switch (user?.role) {
      case 'Admin':
        return <AdminNavigator />;
      case 'Delivery and Pick up':
        return <DeliveryAndPickupNavigator />;
      case 'Driver':
        return <DriverNavigator />;
      case 'Student':
      default:
        return <MainNavigator />;
    }
  };

  return (
    <NavigationContainer>
      {user ? renderMainNavigator() : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
