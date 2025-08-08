import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EarningsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My Earnings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EarningsScreen;
