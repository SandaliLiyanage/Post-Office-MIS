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
  TouchableWithoutFeedback,
} from "react-native";

import { useEffect, useRef, useState } from "react";
import { useUser } from "../../auth/usercontext";

//const employeeID = "0005";
import { IP } from "../../../config";

// Scan screen
export default function Scan() {
  const { user } = useUser();
  const employeeID = user?.employeeID;
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

  useEffect(() => {
    if (bundleData) {
      console.log("Bundle Data Updated:", bundleData);
      setModalVisible(true); // Show the modal only when bundleData is available
    }
  }, [bundleData]); // This effect runs whenever bundleData changes

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

      console.log("Bundle Data1:", data);
      setBundleData(data); // Set the fetched bundle data
      console.log("Bundle Data2", bundleData);
      //setModalVisible(true); // Show the modal
    } catch (error) {
      Alert.alert(
        "Error",
        (error as Error).message || "Failed to fetch bundle data"
      );
    }
  };

  // Function to mark the bundle as arrived
  const markAsArrived = async () => {
    if (bundleData) {
      try {
        const response = await fetch(
          `http://${IP}:5000/bundles/update-arrived`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bundleID: bundleData.bundleID,
              employeeID: employeeID,
              status: "ARRIVED", // Set the new status
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update bundle status");
        }

        const updatedData = await response.json();
        setBundleData(updatedData); // Update the state with the new bundle data
        Alert.alert("Success", "Bundle status updated to 'Arrived'"); // Show success alert
      } catch (error) {
        Alert.alert(
          "Error",
          (error as Error).message || "Failed to update bundle status"
        );
      }
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

  // Show alert with bundle data
  // if (bundleData) {
  //   Alert.alert(
  //     "Bundle Details",
  //     `Bundle ID: ${bundleData.bundleID}\n` +
  //       `Destination Postal Code: ${bundleData.destPostalCode}\n` +
  //       `Current Post Code: ${bundleData.currentPostCode}\n` +
  //       `Status: ${bundleData.bundleStatus}`,
  //     [
  //       {
  //         text: "Mark as Arrived",
  //         onPress: () => {
  //           qrLock.current = false; // Unlock the scanner
  //           setBundleData(null); // Clear bundle data
  //         },
  //       },
  //       {
  //         text: "Scan Again",
  //         onPress: () => {
  //           qrLock.current = false; // Unlock the scanner
  //           setBundleData(null); // Clear bundle data
  //         },
  //       },
  //     ]
  //   );
  // }

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
        animationType="fade"
        transparent={true}
        visible={modalVisible && !!bundleData} // Ensure modal is visible only if bundleData is available
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Bundle Details</Text>
              {bundleData ? (
                <>
                  <Text style={styles.bundleText}>
                    Bundle ID: {bundleData.bundleID}
                  </Text>
                  <Text style={styles.bundleText}>
                    Destination Postal Code: {bundleData.destPostalCode}
                  </Text>
                  <Text style={styles.bundleText}>
                    Current Post Code: {bundleData.currentPostCode}
                  </Text>
                  <Text style={styles.bundleText}>
                    Status: {bundleData.bundleStatus}
                  </Text>
                  {/* <View>
                    <Text style={styles.label}>Bundle ID:</Text>
                    <Text style={styles.value}>58</Text>

                    <Text style={styles.label}>Current Post Office:</Text>
                    <Text style={styles.value}>Kandy</Text>

                    <Text style={styles.label}>Next Post Office:</Text>
                    <Text style={styles.value}>Kaduwela</Text>

                    <Text style={styles.label}>Destination Post Office:</Text>
                    <Text style={styles.value}>Kaduwela</Text>

                    <Text style={styles.label}>Route:</Text>
                    <Text style={styles.value}>Akurana, Kandy, Kaduwela</Text>

                    <Text style={styles.label}>Current Status:</Text>
                    <Text style={styles.value}>Dispatched</Text>
                  </View> */}

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.markArrivedButton}
                      // onPress={markAsArrived}
                      onPress={() => {
                        markAsArrived();
                        qrLock.current = false; // Unlock the scanner
                        setModalVisible(false);
                        setBundleData(null); // Clear bundle data on close
                      }}
                    >
                      <Text style={styles.markArrivedButtonText}>
                        Mark as Arrived
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {
                        qrLock.current = false; // Unlock the scanner
                        setModalVisible(false);
                        setBundleData(null); // Clear bundle data on close
                      }}
                    >
                      <Text style={styles.closeButtonText}>Scan Again</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <Text style={styles.bundleText}>Loading bundle data...</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  // markArrivedButton: {
  //   backgroundColor: "#28a745",
  //   padding: 10,
  //   borderRadius: 5,
  //   flex: 1,
  //   marginRight: 10,
  // },
  // markArrivedButtonText: {
  //   color: "white",
  //   textAlign: "center",
  // },
  // closeButton: {
  //   backgroundColor: "#007bff",
  //   padding: 10,
  //   borderRadius: 5,
  //   flex: 1,
  // },
  // closeButtonText: {
  //   color: "white",
  //   textAlign: "center",
  // },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#C60024EF",
    padding: 8,
    borderRadius: 5,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row", // Aligns buttons in a row
    justifyContent: "space-between", // Space between the buttons
    marginTop: 12, // Adds space between the buttons and bundle details
    marginBottom: 12, // Adds space between the buttons and the bottom of the modal
  },
  markArrivedButton: {
    backgroundColor: "#28a745",
    paddingVertical: 5,
    paddingBottom: 7,
    paddingHorizontal: 2,
    borderRadius: 5,
    flex: 1, // Takes equal space as close button
    marginRight: 5, // Adds space between two buttons
    justifyContent: "center", // Centers text vertically
    alignItems: "center",
  },
  markArrivedButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    paddingRight: 1,
  },
  closeButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 5,
    flex: 1, // Takes equal space as markAsButton
    justifyContent: "center", // Centers text vertically
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
