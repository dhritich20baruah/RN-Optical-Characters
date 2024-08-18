import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import React, { useState, useEffect, useRef } from "react";
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
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  });

  const [draggableCoord, setDraggableCoord] = useState({
    latitude: 27.4705,
    longitude: 94.9125,
  });
  const [count, setCount] = useState(0)
  const onRegionChange = (region) => {
    // console.log(region);
  };

  const mapRef = useRef()

  const takeSnapShot = async () => {
    const snapShot = await mapRef.current.takeSnapshot({width: 300, height: 300, result: "base64"})
    console.log(snapShot)
  }

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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        ref={mapRef}
        style={styles.map}
        region={mapRegion}
        onRegionChange={onRegionChange}
      >
        <Marker coordinate={mapRegion} title="Pin" />
        {/* {locationOfInterest.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={item.location}
              title={item.title}
              description={item.description}
            />
          );
        })} */}
        <Marker
          draggable
          coordinate={draggableCoord}
          pinColor="#00ff00"
          onDragEnd={(e) => setDraggableCoord(e.nativeEvent.coordinate)}
        />
        {/* <Marker coordinate={{latitude: 27.4, longitude: 95}} pinColor="#8F00FF" title="increment"/> */}
        <Marker coordinate={{latitude: 27.45, longitude: 94.9}} pinColor="#8F00FF">
          <Callout>
            <Text>Count: {count}</Text>
            <Button title='increment' onPress={()=>setCount(count + 1)}/>
          </Callout>
        </Marker>
      </MapView>
      <Button title="Snap & Share" onPress={takeSnapShot}/>
      {/* <Button onPress={userLocation} title="GET LOCATION" color="red" /> */}
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
