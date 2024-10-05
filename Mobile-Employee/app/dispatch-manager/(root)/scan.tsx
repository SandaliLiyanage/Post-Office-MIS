import { Camera, CameraView } from "expo-camera";
import {
  AppState,
  SafeAreaView,
  StyleSheet,
  Alert,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";

import { useEffect, useRef, useState } from "react";
import { IP } from "../../../config";

// Scan screen
export default function Scan() {
  const [hasPermission, setHasPermission] = useState(false); // State variable to track if the user has granted camera permissions
  interface BundleData {
    bundleID: string;
    destPostalCode: string;
    currentPostCode: string;
    bundleStatus: string;
    route: string[];
  }

  const [bundleData, setBundleData] = useState<BundleData | null>(null); // State variable to store fetched bundle data
  const [modalVisible, setModalVisible] = useState(false); // State variable to control modal visibility
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

  // Fetch bundle data from backend using barcode data
  const fetchBundleData = async (bundleID: string) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/bundles/find?bundleID=${bundleID}`
      );
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch bundle data");
      }
      const data = await response.json();

      if (!data || typeof data !== "object") {
        throw new Error("Invalid bundle data");
      }

      console.log("Bundle Data:", data);
      setBundleData(data); // Set the fetched bundle data
      setModalVisible(true); // Show the modal
    } catch (error) {
      Alert.alert(
        "Error",
        (error as Error).message || "Failed to fetch bundle data"
      );
    }
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true; // Lock the scanner to prevent multiple scans
      fetchBundleData(data); // Fetch bundle data based on scanned barcode
    }
  };

  // Handle case where the camera permission is still being requested
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
    <SafeAreaView style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back" // Use the back camera
        onBarcodeScanned={handleBarcodeScanned} // Handle barcode scanning
      />

      {/* Modal to display the bundle data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.bundleText}>
              Bundle ID: {bundleData?.bundleID}
            </Text>
            <Text style={styles.bundleText}>
              Destination Postal Code: {bundleData?.destPostalCode}
            </Text>
            <Text style={styles.bundleText}>
              Current Post Code: {bundleData?.currentPostCode}
            </Text>
            <Text style={styles.bundleText}>
              Status: {bundleData?.bundleStatus}
            </Text>
            {/* <Text style={styles.bundleText}>
              Route: {bundleData?.route.join(", ")}
            </Text> */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setBundleData(null); // Clear bundle data on close
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  bundleText: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
  },
});
