// import { Camera, CameraView } from "expo-camera";
// import {
//   AppState,
//   Linking,
//   SafeAreaView,
//   StyleSheet,
//   Alert,
//   Text,
//   View,
//   Modal,
//   Button,
// } from "react-native";
// import { useEffect, useRef, useState } from "react";
// import { IP } from "../../../config";

// export default function Scan() {
//   const [hasPermission, setHasPermission] = useState(false);
//   const qrLock = useRef(false);
//   const appState = useRef(AppState.currentState);
//   const [selectedBundle, setSelectedBundle] = useState<any>(null); // State to store the fetched bundle data
//   const [isModalVisible, setIsModalVisible] = useState(false); // State to handle modal visibility

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();

//     const subscription = AppState.addEventListener("change", (nextAppState) => {
//       if (
//         appState.current.match(/inactive|background/) &&
//         nextAppState === "active"
//       ) {
//         qrLock.current = false;
//       }
//       appState.current = nextAppState;
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   // Fetch bundle data from backend using barcode data
//   const fetchBundleData = async (bundleID: string) => {
//     try {
//       const response = await fetch(
//         `http://${IP}:5000/bundles/find?bundleID=${bundleID}`
//       );
//       console.log("Response:", response);
//       if (!response.ok) {
//         throw new Error("Failed to fetch bundle data");
//       }
//       const bundleData = await response.json();

//       if (!bundleData || typeof bundleData !== "object") {
//         throw new Error("Invalid bundle data");
//       }

//       console.log("Bundle Data:", bundleData);
//       setSelectedBundle(bundleData); // Set the fetched bundle data
//       setIsModalVisible(true); // Show the modal with bundle data
//     } catch (error) {
//       Alert.alert(
//         "Error",
//         (error as Error).message || "Failed to fetch bundle data"
//       );
//     }
//   };

//   const handleBarcodeScanned = ({ data }: { data: string }) => {
//     if (data && !qrLock.current) {
//       qrLock.current = true; // Lock the scanner to prevent multiple scans
//       fetchBundleData(data); // Fetch bundle data based on scanned barcode
//     }
//   };

//   const closeModal = () => {
//     setIsModalVisible(false); // Hide the modal
//     qrLock.current = false; // Unlock the scanner
//   };

//   if (hasPermission === null) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text>Requesting camera permission...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text>No access to camera</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={StyleSheet.absoluteFillObject}>
//       <CameraView
//         style={StyleSheet.absoluteFillObject}
//         facing="back"
//         onBarcodeScanned={handleBarcodeScanned}
//       />

//       {/* Modal to show fetched bundle data */}
//       <Modal visible={isModalVisible} animationType="slide" transparent={false}>
//         <View style={styles.modalContainer}>
//           {selectedBundle ? (
//             <View>
//               <Text style={styles.label}>Bundle ID:</Text>
//               <Text style={styles.value}>{selectedBundle.bundleID}</Text>

//               <Text style={styles.label}>Current Post Office:</Text>
//               <Text style={styles.value}>{selectedBundle.currentPostCode}</Text>

//               <Text style={styles.label}>Next Post Office:</Text>
//               <Text style={styles.value}>
//                 {getNextPostalCode(selectedBundle)}
//               </Text>

//               <Text style={styles.label}>Destination Post Office:</Text>
//               <Text style={styles.value}>{selectedBundle.destPostalCode}</Text>

//               <Text style={styles.label}>Route:</Text>
//               <Text style={styles.value}>
//                 {selectedBundle.route.join(", ")}
//               </Text>

//               <Text style={styles.label}>Current Status:</Text>
//               <Text style={styles.value}>
//                 {getBundleStatusName(selectedBundle.bundleStatus)}
//               </Text>

//               <Button title="Close" onPress={closeModal} />
//             </View>
//           ) : (
//             <Text>Loading...</Text>
//           )}
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// // Function to get next post office code
// const getNextPostalCode = (bundle: any) => {
//   // Define logic to get next post office
//   return bundle.route[1]; // Example logic
// };

// // Function to get bundle status name
// const getBundleStatusName = (status: string) => {
//   // Define your status names based on status codes
//   const statusNames: Record<string, string> = {
//     IN_TRANSIT: "In Transit",
//     DELIVERED: "Delivered",
//     RETURNED: "Returned",
//     // Add more statuses if needed
//   };
//   return statusNames[status] || "Unknown";
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     padding: 20,
//     backgroundColor: "white",
//     flex: 1,
//     justifyContent: "center",
//   },
//   label: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   value: {
//     marginBottom: 10,
//     fontSize: 16,
//   },
// });

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
    console.log("Scanned data length:", data.length);
    if (data && !qrLock.current) {
      qrLock.current = true; // Lock the scanner to prevent multiple scans
      console.log("Scanned data:", data);

      // Show an alert with the scanned
      Alert.alert(
        "Scan Successful",
        `Mail Details: ${data}`,
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
