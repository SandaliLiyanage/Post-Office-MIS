import { Camera, CameraView } from "expo-camera";
import {
  AppState,
  Linking,
  SafeAreaView,
  StyleSheet,
  Alert,
  Text,
} from "react-native";

import { useEffect, useRef, useState } from "react";

// Scan screen
export default function Scan() {
  const [hasPermission, setHasPermission] = useState(false); // State variable to track if the user has granted camera permissions
  const qrLock = useRef(false); // Ref object to manage a lock to prevent multiple scans
  const appState = useRef(AppState.currentState); // Ref object to store the app state

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    // Handle app state changes to reset the lock
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // Reset the lock when the app is in the background or inactive
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    // Remove the event listener when the component is unmounted
    return () => {
      subscription.remove();
    };
  }, []);

  // Handle barcode data processing
  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true; // Lock the scanner to prevent multiple scans
      console.log("Scanned data:", data);

      // Show an alert with the scanned
      Alert.alert(
        "Scan Successful",
        `Scanned Data: ${data}`,
        [
          {
            text: "Scan Again",
            onPress: () => {
              qrLock.current = false; // Unlock the scanner
            },
          },
        ],
        { cancelable: false } // Prevent the user from dismissing the alert
      );
    }
  };

  // // Handle case where the camera permission is still being requested
  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </SafeAreaView>
    );
  }

  // Handle case where the camera permission was denied
  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No access to camera</Text>
      </SafeAreaView>
    );
  }

  // Render the camera view
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back" // Use the back camera
        onBarcodeScanned={handleBarcodeScanned} // Handle barcode scanning
      />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
