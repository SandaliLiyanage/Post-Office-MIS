import React, { useState } from "react";
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

// Bundle item interface
interface Bundle {
  bundleID: string;
  bundlestatus: string;
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
      <Text style={styles.emptySectionMessage}>No bundles in this status</Text>
    )}
  </View>
);

// Mail screen component
const Bundles = () => {
  const { user } = useUser();
  const employeeID = user?.employeeID;
  const [bundleSections, setBundleSections] = useState<BundleSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [updating, setUpdating] = useState(false);

  // Fetch bundles by separate routes based on status
  const fetchBundlesByRoute = async (route: string) => {
    try {
      const response = await fetch(`http://${IP}:5000/bundles/${route}`, {
        method: "GET",
      });
      return await response.json(); // Return the bundle data for the specific route
      console.log("Bundles fetched:", response);
    } catch (error) {
      console.error(`Error fetching ${route} bundles:`, error);
      return []; // Return an empty array if there's an error
    }
  };

  // Fetch all bundles by status using separate routes
  const fetchAllBundles = async () => {
    try {
      // Fetch each status separately via different routes
      const arrived = await fetchBundlesByRoute("arrived");
      // const dispatched = await fetchBundlesByRoute("dispatched");
      const distributed = await fetchBundlesByRoute("distributed");
      const created = await fetchBundlesByRoute("created");

      // Update the sections state with categorized bundle data
      setBundleSections([
        { title: "Arrived", data: arrived },
        // { title: "Dispatched", data: dispatched },
        { title: "Distributed", data: distributed },
        { title: "Created", data: created },
      ]);
    } catch (error) {
      console.error("Error fetching all bundles:", error);
    }
  };

  // Use useFocusEffect to refresh the list when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        await fetchAllBundles(); // Fetch all bundle data
        setLoading(false);
      };

      fetchData();
    }, [])
  );

  // Handle bundle press
  const handlePress = (bundle: Bundle) => {
    setSelectedBundle(bundle); // Store the selected bundle item
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
    ARRIVED: "Arrived",
    DISPATCHED: "Dispatched",
    DISTRIBUTED: "Distributed",
    CREATED: "Created",
  };

  const getBundleStatusName = (bundlestatus: string): string => {
    return bundleStatusNames[bundlestatus];
  };

  // Render each bundle item
  const renderItem = ({ item }: { item: Bundle }) => (
    <TouchableOpacity
      style={styles.bundleItem}
      onPress={() => handlePress(item)}
    >
      <Text style={styles.bundleId}>Bundle ID: {item.bundleID}</Text>
      <Text style={styles.bundleStatus}>
        {getBundleStatusName(item.bundlestatus)}
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
      setSelectedBundle(null);
      fetchAllBundles(); // Refresh the bundle list after updating
    } catch (error) {
      console.error("Error updating bundle status:", error);
      setUpdating(false);
    }
  };

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
        onBackdropPress={() => setSelectedBundle(null)}
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

                <Text style={styles.label}>Current Status:</Text>
                <Text style={styles.value}>
                  {getBundleStatusName(selectedBundle.bundlestatus)}
                </Text>
              </View>

              {/* Buttons section */}
              <View style={styles.buttonsContainer}>
                {(selectedBundle.bundlestatus === "DISPATCHED" ||
                  selectedBundle.bundlestatus === "DISTRIBUTED") && (
                  <TouchableOpacity
                    style={styles.markAsButton}
                    onPress={() => updateBundleStatus("ARRIVED")}
                  >
                    <Text style={styles.buttonText}>
                      {"  "}
                      Mark as {"\n"} "Arrived"
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedBundle(null)}
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
  emptySectionMessage: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 5,
    paddingBottom: 2,
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
    marginTop: 15, // Adds space between the buttons and mail details
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
    marginLeft: 5, // Adds space between two buttons
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
