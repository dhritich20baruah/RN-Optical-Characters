import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React, {useState, useEffect} from 'react';

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 27.4705,
    longitude: 94.9125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title='Pin'/>
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
