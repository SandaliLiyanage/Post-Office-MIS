import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { useUser } from "../../auth/usercontext";
import { IP } from "../../../config";

interface Bundle {
  bundleID: string;
  destPostalCode: string;
  currentPostCode: string;
  bundleStatus: string;
  route: string[];
}

// Define the type for bundle sections
interface BundleSection {
  title: string;
  data: Bundle[];
}

// Render section header with empty state message
const SectionHeaderWithEmptyMessage = ({
  section,
}: {
  section: BundleSection;
}) => (
  <View>
    <Text style={styles.sectionHeader}>{section.title}</Text>
    {section.data.length === 0 && (
      <Text
        style={
          section.title === "Distributed"
            ? styles.emptySectionMessage2 // Style for "Returned" section
            : styles.emptySectionMessage1 // Style for "Delivered" and "To be Delivered" sections
        }
      >
        {section.title === "Distributed" ? "No bundles" : "No bundles"}
      </Text>
    )}
  </View>
);

// Bundles screen component
const Bundles = () => {
  const { user } = useUser();
  const employeeID = user?.employeeID;
  //const employeeID = "0005";
  const [bundleSections, setBundleSections] = useState<BundleSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBundle, setselectedBundle] = useState<Bundle | null>(null);
  const [updating, setUpdating] = useState(false);

  // Fetch bundle items from the backend
  const fetchBundles = async () => {
    try {
      // Fetch the arrived bundles
      const response1 = await fetch(
        `http://${IP}:5000/bundles/arrived?employeeID=${employeeID}`
      );
      const arrived = await response1.json();
      console.log("Arrived:", arrived);

      // Fetch the created bundles
      const response2 = await fetch(
        `http://${IP}:5000/bundles/created?employeeID=${employeeID}`
      );
      const created = await response2.json();
      console.log("Created:", created);

      // Fetch the dispatched bundles
      const response3 = await fetch(
        `http://${IP}:5000/bundles/dispatched?employeeID=${employeeID}`
      );
      const dispatched = await response3.json();
      console.log("Dispatched:", dispatched);

      // Fetch the distributed bundles
      const response4 = await fetch(
        `http://${IP}:5000/bundles/distributed?employeeID=${employeeID}`
      );
      const distributed = await response4.json();
      console.log("Distributed:", distributed);

      // Update the sections state with categorized bundle data
      setBundleSections([
        { title: "Created", data: created },
        { title: "Arrived", data: arrived },
        { title: "Dispatched", data: dispatched },
        { title: "Distributed", data: distributed },
      ]);
    } catch (error) {
      console.error("Error fetching bundle items:", error);
    }
  };

  // Use useFocusEffect to refresh the list when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        await fetchBundles(); // Ensure fetchBundles completes before setting loading to false
        setLoading(false);
      };

      fetchData();
    }, [])
  );

  // Handle bundle item press
  const handlePress = (bundle: Bundle) => {
    setselectedBundle(bundle); // Store the selected bundle item
  };

  // Handle loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#C60024" />
      </SafeAreaView>
    );
  }

  // Bundle status names
  const bundleStatusNames: { [key: string]: string } = {
    CREATED: "Created",
    ARRIVED: "Arrived",
    DISPATCHED: "Dispatched",
    DISTRIBUTED: "Distributed",
  };

  const getBundleStatusName = (bundleStatus: string): string => {
    return bundleStatusNames[bundleStatus];
  };

  // Render each bundle item
  const renderItem = ({ item }: { item: Bundle }) => (
    <TouchableOpacity
      style={styles.bundleItem}
      onPress={() => handlePress(item)}
    >
      <Text style={styles.bundleId}>Bundle ID: {item.bundleID}</Text>
      <Text style={styles.bundleCategory}>Next: {getNextPostalCode(item)}</Text>
      <Text style={styles.bundleStatus}>
        {getBundleStatusName(item.bundleStatus)}
      </Text>
    </TouchableOpacity>
  );

  const updateBundleStatus = async (newStatus: string) => {
    try {
      setUpdating(true);
      await fetch(`http://${IP}:5000/bundles/update-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bundleID: selectedBundle?.bundleID, newStatus }),
      });

      setUpdating(false);
      setselectedBundle(null);
      fetchBundles();
    } catch (error) {
      console.error("Error updating bundle status:", error);
      setUpdating(false);
    }
  };

  function getNextPostalCode(selectedBundle: Bundle) {
    // Get the route array and current postal code from the selectedBundle
    const route = selectedBundle.route;
    const currentPostCode = selectedBundle.currentPostCode;

    // Find the index of the current postal code in the route array
    const currentIndex = route.indexOf(currentPostCode);

    // Find the next postal code (if it exists)
    const nextPostCode =
      currentIndex !== -1 && currentIndex < route.length - 1
        ? route[currentIndex + 1]
        : "End of Route"; // If no next post code, show "End of Route"

    return nextPostCode;
  }

  // Render the bundle sectioned list
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={bundleSections} // Sections of categorized bundle items
        renderItem={renderItem} // Render each bundle item using the renderItem function
        keyExtractor={(item) => item.bundleID} // Use the bundleID as the key for each item
        renderSectionHeader={({ section }) => (
          <SectionHeaderWithEmptyMessage section={section} />
        )} // Render section headers
      />
      <Modal
        isVisible={!!selectedBundle}
        onBackdropPress={() => setselectedBundle(null)}
        animationIn="zoomIn" // Animation for appearing
        animationOut="zoomOut" // Animation for disappearing
        backdropTransitionOutTiming={0} // To avoid flickering when closing
      >
        <View style={styles.card}>
          <Text style={styles.title}>Bundle Details</Text>
          {selectedBundle && (
            <View>
              {/* Bundle data section */}
              <View>
                <Text style={styles.label}>Bundle ID:</Text>
                <Text style={styles.value}>{selectedBundle.bundleID}</Text>

                <Text style={styles.label}>Current Post Office:</Text>
                <Text style={styles.value}>
                  {selectedBundle.currentPostCode}
                </Text>

                <Text style={styles.label}>Next Post Office:</Text>
                <Text style={styles.value}>
                  {getNextPostalCode(selectedBundle)}
                </Text>

                <Text style={styles.label}>Destination Post Office:</Text>
                <Text style={styles.value}>
                  {selectedBundle.destPostalCode}
                </Text>

                <Text style={styles.label}>Route:</Text>
                <Text style={styles.value}>
                  {selectedBundle.route.join(", ")}
                </Text>

                <Text style={styles.label}>Current Status:</Text>
                <Text style={styles.value}>
                  {getBundleStatusName(selectedBundle.bundleStatus)}
                </Text>
              </View>

              {/* Buttons section */}
              <View style={styles.buttonsContainer}>
                {/* Check if the bundle is either "CREATED" or "ARRIVED" */}
                {selectedBundle.bundleStatus === "CREATED" && (
                  <TouchableOpacity
                    style={styles.markAsButton}
                    onPress={() => updateBundleStatus("DISPATCHED")}
                  >
                    <Text style={styles.buttonText}>
                      {"  "}
                      Mark as {"\n"} "Dispatched"
                    </Text>
                  </TouchableOpacity>
                )}

                {selectedBundle.bundleStatus === "ARRIVED" &&
                  selectedBundle.destPostalCode ===
                    selectedBundle.currentPostCode && (
                    <TouchableOpacity
                      style={styles.markAsButton}
                      onPress={() => updateBundleStatus("DISTRIBUTED")}
                    >
                      <Text style={styles.buttonText}>
                        {"  "}
                        Mark as {"\n"} "Distributed"
                      </Text>
                    </TouchableOpacity>
                  )}

                {selectedBundle.bundleStatus === "ARRIVED" &&
                  selectedBundle.destPostalCode !=
                    selectedBundle.currentPostCode && (
                    <TouchableOpacity
                      style={styles.markAsButton}
                      onPress={() => updateBundleStatus("DISPATCHED")}
                    >
                      <Text style={styles.buttonText}>
                        {"  "}
                        Mark as {"\n"} "Dispatched"
                      </Text>
                    </TouchableOpacity>
                  )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setselectedBundle(null)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#C60024EF",
    padding: 8,
    borderRadius: 5,
  },
  emptySectionMessage1: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 5,
    paddingBottom: 2,
  },
  emptySectionMessage2: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 5,
    paddingBottom: 12,
  },
  bundleItem: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  bundleId: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bundleCategory: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
  },
  bundleStatus: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 14,
    fontWeight: "bold",
    color: "#C60024",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 14,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    paddingTop: 13,
    paddingBottom: 13,
  },
  buttonsContainer: {
    flexDirection: "row", // Aligns buttons in a row
    justifyContent: "space-between", // Space between the buttons
    marginTop: 15, // Adds space between the buttons and bundle details
    marginBottom: 12, // Adds space between the buttons and the bottom of the modal
  },
  markAsButton: {
    backgroundColor: "#C60024",
    paddingVertical: 5,
    paddingBottom: 7,
    paddingHorizontal: 2,
    borderRadius: 5,
    flex: 1, // Takes equal space as close button
    marginRight: 5, // Adds space between two buttons
    justifyContent: "center", // Centers text vertically
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingRight: 7,
  },
  closeButton: {
    backgroundColor: "#747474",
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 5,
    flex: 1, // Takes equal space as markAsButton
    justifyContent: "center", // Centers text vertically
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Bundles;
