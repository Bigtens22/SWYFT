import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import COLORS from '../../constants/colors';

const AvailableDeliveriesScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState<Region | undefined>(undefined);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {region ? (
        <MapView style={styles.map} region={region}>
          {location && (
            <Marker
              coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
              title="Your Location"
            />
          )}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Loading Map...</Text>
      )}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Available Deliveries</Text>
        {/* Delivery list will go here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryGradientEnd,
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
  listContainer: {
      flex: 1,
      padding: 20,
      width: '100%',
  },
  listTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.white,
  },
  loadingText: {
      color: COLORS.white,
      marginTop: Dimensions.get('window').height * 0.3,
  }
});

export default AvailableDeliveriesScreen;
