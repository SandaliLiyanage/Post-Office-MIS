import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

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
  const [addressNo, setAddressNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [locality, setLocality] = useState("");

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

  const handleAddAddress = () => {
    if (addressNo && streetName && locality) {
      console.log("Address No:", addressNo);
      console.log("Street Name:", streetName);
      console.log("Locality:", locality);
      console.log("currentLocation:", currentLocation);
      Alert.alert("Success", "Address added successfully!");
      // Clear input fields
      setAddressNo("");
      setStreetName("");
      setLocality("");
    } else {
      Alert.alert("Error", "Please fill in all the fields.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Address input fields */}
      <View style={styles.topcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Address No"
          value={addressNo}
          onChangeText={setAddressNo}
          selectionColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Street Name"
          value={streetName}
          onChangeText={setStreetName}
          selectionColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Locality"
          value={locality}
          onChangeText={setLocality}
          selectionColor="black"
        />
      </View>

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
  topcontainer: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "55%", // Map height
  },
  formContainer: {
    padding: 10,
    paddingTop: 15,
    backgroundColor: "#fff",
    height: "50%", // Form container height
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
