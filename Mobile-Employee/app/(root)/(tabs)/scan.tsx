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

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(false);
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    // Handle app state changes to reset the lock
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Handle barcode data processing
  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      console.log("Scanned data:", data);

      Alert.alert(
        "Scan Successful",
        `Scanned Data: ${data}`,
        [
          {
            text: "Scan Again",
            onPress: () => {
              qrLock.current = false;
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No access to camera</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
