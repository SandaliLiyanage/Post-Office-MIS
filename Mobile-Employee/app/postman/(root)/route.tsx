import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios"; // For making the API request

const Route = () => {
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null); // Error state
  const API_KEY = "AIzaSyDe3AFPl_peaJB8FjA_D7uvfT66h0XuDNk"; // Replace with your API key

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

  // Function to fetch directions between the locations
  const getDirections = async () => {
    try {
      // Google Maps Directions API
      const origin = `${locations[0].latitude},${locations[0].longitude}`;
      const destination = `${locations[locations.length - 1].latitude},${
        locations[locations.length - 1].longitude
      }`;
      const waypoints = locations
        .slice(1, -1) // All locations except the first and last
        .map((loc) => `${loc.latitude},${loc.longitude}`)
        .join("|");

      // Request to Google Maps Directions API
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${API_KEY}`;

      const response = await axios.get(url);
      console.log("Directions API response:", response.data); // Log the entire response

      if (response.data.routes && response.data.routes.length > 0) {
        const points = decodePolyline(
          response.data.routes[0].overview_polyline.points
        );
        setRouteCoordinates(points); // Set polyline for the route
      } else {
        console.error("No routes found in response");
        setError("No routes found in the API response.");
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
      setError("Failed to fetch directions.");
    }
  };

  // Decode polyline to get route coordinates
  const decodePolyline = (t: string) => {
    let points: { latitude: number; longitude: number }[] = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < t.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

  useEffect(() => {
    getDirections();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: locations[0].latitude,
          longitude: locations[0].longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* Render markers with numbers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Text style={styles.markerText}>{location.id}</Text>
              </View>
              <View style={styles.anchorPointer} />
            </View>
          </Marker>
        ))}

        {/* Draw the polyline for the route */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#4285F4" // Google Maps light blue
            strokeWidth={5}
          />
        )}
      </MapView>

      {/* Display error if fetching directions failed */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
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
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    backgroundColor: "red",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  anchorPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "red",
    marginTop: -4,
  },
  errorContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Route;
