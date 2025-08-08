import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={[COLORS.primaryGradientStart, COLORS.primaryGradientEnd]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <Text style={styles.logo}>SWYFT</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default SplashScreen;
