import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRoute, useNavigation } from "@react-navigation/native";
import { IP } from "../../../config"; // Assuming IP is stored in config

const AddAddress = () => {
  const [region, setRegion] = useState({
    latitude: 6.924172260546507,
    longitude: 79.96982292945405,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const route = useRoute();
  const navigation = useNavigation();

  // Retrieve the addressID from the route parameters
  const { addressID } = route.params as { addressID: string };

  // Request permission and get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to proceed.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });

      // Set initial region to current location
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    })();
  }, []);

  // Function to update the address on the backend
  const handleAddAddress = async () => {
    if (!currentLocation) {
      Alert.alert("Error", "Current location not available.");
      return;
    }

    try {
      const response = await fetch(
        `http://${IP}:5000/address/updateAddressLocation`, // Assuming this is the correct backend route
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressID: addressID, // Sending the address ID
            latitude: currentLocation.latitude, // Sending current latitude
            longitude: currentLocation.longitude, // Sending current longitude
            verified: true, // Set verified to true
          }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Address location updated successfully!");
        navigation.goBack(); // Go back to the previous screen after updating
      } else {
        Alert.alert("Error", "Failed to update address. Please try again.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      Alert.alert("Error", "An error occurred while updating the address.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Map section */}
      <MapView
        style={styles.map}
        region={region} // Dynamic region based on current location
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        showsUserLocation={true} // Show blue dot for user's location
        followsUserLocation={true} // Follow user's live location
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="You are here"
            description="Current location"
          />
        )}
      </MapView>

      {/* Add address button */}
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddAddress}>
          <Text style={styles.buttonText}>Add Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: -31, // Adjust the top margin to avoid SafeAreaView padding
  },
  map: {
    width: Dimensions.get("window").width,
    height: "84%", // Map height
  },
  formContainer: {
    padding: 10,
    paddingTop: 15,
    backgroundColor: "#fff",
    height: "50%", // Form container height
  },
  button: {
    backgroundColor: "#007BFF", // Button color
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff", // Button text color
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default AddAddress;
