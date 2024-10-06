import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const AddAddress = () => {
  const [region, setRegion] = useState({
    latitude: 6.791534055020761,
    longitude: 79.90200871740784,
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
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleAddAddress = () => {
    if (addressNo && streetName && locality) {
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
      {/* Map section */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="You are here"
            description="Current location"
          />
        )}
      </MapView>

      {/* Address form section */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Address No"
          value={addressNo}
          onChangeText={setAddressNo}
        />
        <TextInput
          style={styles.input}
          placeholder="Street Name"
          value={streetName}
          onChangeText={setStreetName}
        />
        <TextInput
          style={styles.input}
          placeholder="Locality"
          value={locality}
          onChangeText={setLocality}
        />
        <Button title="Add Address" onPress={handleAddAddress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "40%", // Top part of the screen
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddAddress;
