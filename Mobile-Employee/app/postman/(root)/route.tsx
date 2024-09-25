import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

const Route = () => {
  // Define the set of locations with their coordinates
  const locations = [
    { id: 1, latitude: 6.93365203450841, longitude: 79.9835312139157 },
    { id: 2, latitude: 6.932900155314793, longitude: 79.98257295440071 },
    { id: 3, latitude: 6.931829673826147, longitude: 79.98283733773043 },
    { id: 4, latitude: 6.926691701903446, longitude: 79.98007013891583 },
    { id: 5, latitude: 6.921379683015376, longitude: 79.9748551127648 },
    { id: 6, latitude: 6.92625283379399, longitude: 79.97224505313936 },
    { id: 7, latitude: 6.930090869184906, longitude: 79.97488263874345 },
    { id: 8, latitude: 6.936511594394954, longitude: 79.97497555414972 },
    { id: 9, latitude: 6.936982597575644, longitude: 79.97664553759417 },
    { id: 10, latitude: 6.936934494539469, longitude: 79.98072335547656 },
    { id: 11, latitude: 6.9359585237643095, longitude: 79.98390472475725 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.93365203450841, // Centering on the first location
          longitude: 79.9835312139157,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* Add a Marker with a pointer-like custom view for each location */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            {/* Custom View for the numbered pointer marker */}
            <View style={styles.marker}>
              <Text style={styles.markerText}>{location.id}</Text>
              <View style={styles.pointer} />
            </View>
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -31,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "blue",
    marginTop: -2,
  },
});

export default Route;
