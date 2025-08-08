import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusinessOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Incoming Orders</Text>
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

export default BusinessOrdersScreen;
