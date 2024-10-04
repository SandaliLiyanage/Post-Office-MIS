import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

// Define the AddAddress component
const AddAddress = () => {
  // Set initial region/state for the map (centered around a default location)
  const [region, setRegion] = useState({
    latitude: 6.791534055020761,
    longitude: 79.90200871740784,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)} // Update map region on drag/zoom
      >
        {/* Example Marker (you can remove or add more markers based on your needs) */}
        {/* <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }} // Marker location
          title="Marker Title"
          description="Marker Description"
        /> */}
      </MapView>
    </SafeAreaView>
  );
};

// Styles for the container and the map
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the map takes up the full screen
  },
  map: {
    width: Dimensions.get("window").width, // Full screen width
    height: Dimensions.get("window").height, // Full screen height
  },
});

export default AddAddress;
