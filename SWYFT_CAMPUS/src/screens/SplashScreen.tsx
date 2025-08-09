import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import theme, { COLORS, FONTS } from '../../constants/theme';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>SWYFT CAMPUS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
