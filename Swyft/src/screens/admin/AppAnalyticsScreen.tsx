import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppAnalyticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>App Analytics</Text>
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

export default AppAnalyticsScreen;
