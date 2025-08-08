import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from '../screens/delivery/ProductsScreen';
import DeliveryOrdersScreen from '../screens/delivery/DeliveryOrdersScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export type DeliveryTabParamList = {
  Products: undefined;
  Orders: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<DeliveryTabParamList>();

const DeliveryAndPickupNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Products') {
            iconName = focused ? 'ios-cube' : 'ios-cube-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'ios-receipt' : 'ios-receipt-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primaryGradientStart,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
            backgroundColor: COLORS.primaryGradientEnd,
            borderTopColor: COLORS.primaryGradientStart
        }
      })}
    >
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Orders" component={DeliveryOrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default DeliveryAndPickupNavigator;
