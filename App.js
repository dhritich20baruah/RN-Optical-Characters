import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

let locationOfInterest = [
  {
    title: "First",
    location: {
      latitude: 27.4,
      longitude: 94,
    },
    description: "My First Marker",
  },
  {
    title: "Second",
    location: {
      latitude: 27.2,
      longitude: 96,
    },
    description: "My Second Marker",
  },
];

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 27.4705,
    longitude: 94.9125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = (region) => {
    console.log(region);
  };

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0921,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };
  useEffect(() => {
    userLocation();
  }, []);

  const showLocationOfInterest = () => {
    return locationOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChange={onRegionChange}
      >
        <Marker coordinate={mapRegion} title="Pin" />
        {locationOfInterest.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={item.location}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </MapView>
      <Button onPress={userLocation} title="GET LOCATION" color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "95%",
  },
});
