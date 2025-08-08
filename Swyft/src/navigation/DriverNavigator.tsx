import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AvailableDeliveriesScreen from '../screens/driver/AvailableDeliveriesScreen';
import EarningsScreen from '../screens/driver/EarningsScreen';
import ProfileScreen from '../screens/main/ProfileScreen'; // Can reuse profile screen
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export type DriverTabParamList = {
  Deliveries: undefined;
  Earnings: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<DriverTabParamList>();

const DriverNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Deliveries') {
            iconName = focused ? 'ios-bicycle' : 'ios-bicycle-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'ios-cash' : 'ios-cash-outline';
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
      <Tab.Screen name="Deliveries" component={AvailableDeliveriesScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default DriverNavigator;
