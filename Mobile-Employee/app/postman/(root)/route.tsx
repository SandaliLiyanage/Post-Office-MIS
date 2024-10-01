import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import { IP } from "../../../config";

const Route = () => {
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [employeeID] = useState("0002"); // Replace with actual postman ID
  const [locations, setLocations] = useState<
    { id: string; latitude: number; longitude: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "AIzaSyDe3AFPl_peaJB8FjA_D7uvfT66h0XuDNk"; // Replace with your API key

  // Fetch post office and mail item locations from the backend
  const fetchLocations = async () => {
    try {
      const { data: postOfficeData } = await axios.get(
        `http://${IP}:5000/employee/user?employeeID=${employeeID}`
      );

      const postOffice = {
        id: "Post Office",
        latitude: postOfficeData.latitude,
        longitude: postOfficeData.longitude,
      };

      const { data: mailLocations } = await axios.get(
        `http://${IP}:5000/mail/employee2?employeeID=${employeeID}`
      );

      const addresses = mailLocations.map((loc: any, index: number) => ({
        id: (index + 1).toString(),
        latitude: loc.latitude,
        longitude: loc.longitude,
      }));

      // Add the post office as the start and end point
      setLocations([postOffice, ...addresses]);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("Failed to fetch locations.");
    }
  };

  // Fetch directions from Google Maps Directions API
  const getDirections = async () => {
    if (locations.length === 0) return;

    try {
      const origin = `${locations[0].latitude},${locations[0].longitude}`;
      const destination = `${locations[locations.length - 1].latitude},${
        locations[locations.length - 1].longitude
      }`;
      const waypoints = locations
        .slice(1, -1)
        .map((loc) => `${loc.latitude},${loc.longitude}`)
        .join("|");

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${API_KEY}`;

      const response = await axios.get(url);

      if (response.data.routes && response.data.routes.length > 0) {
        const points = decodePolyline(
          response.data.routes[0].overview_polyline.points
        );
        setRouteCoordinates(points);
      } else {
        setError("No routes found in the API response.");
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
      setError("Failed to fetch directions.");
    }
  };

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
    fetchLocations();
  }, []);

  useEffect(() => {
    if (locations.length > 1) {
      getDirections();
    }
  }, [locations]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: locations[0]?.latitude || 0,
          longitude: locations[0]?.longitude || 0,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
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
                <Text style={styles.markerText}>
                  {location.id === "Post Office" ? "PO" : location.id}
                </Text>
              </View>
              <View style={styles.anchorPointer} />
            </View>
          </Marker>
        ))}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#4285F4"
            strokeWidth={5}
          />
        )}
      </MapView>

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
