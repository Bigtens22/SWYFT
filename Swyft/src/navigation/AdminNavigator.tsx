import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageUsersScreen from '../screens/admin/ManageUsersScreen';
import AppAnalyticsScreen from '../screens/admin/AppAnalyticsScreen';
import ProfileScreen from '../screens/main/ProfileScreen'; // Can reuse profile screen
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export type AdminTabParamList = {
  Users: undefined;
  Analytics: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AdminTabParamList>();

const AdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Users') {
            iconName = focused ? 'ios-people' : 'ios-people-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'ios-stats-chart' : 'ios-stats-chart-outline';
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
      <Tab.Screen name="Users" component={ManageUsersScreen} />
      <Tab.Screen name="Analytics" component={AppAnalyticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AdminNavigator;
