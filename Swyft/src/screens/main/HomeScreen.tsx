import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Businesses</Text>
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
      color: COLORS.white,
      fontWeight: 'bold',
  }
});

export default HomeScreen;
