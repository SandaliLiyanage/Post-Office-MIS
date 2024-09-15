// Home screen

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ROUTES } from "./routes";
import { IP } from "../../../config";

// Home screen component
const Home = () => {
  const router = useRouter(); // Call useRouter at the top level of the component

  // Define a type for the available routes
  type RouteKeys = keyof typeof ROUTES;

  // Handle navigation by pushing the route
  const handleNavigation = (routeName: RouteKeys) => {
    router.push(ROUTES[routeName] as any); // Navigate to the selected route
  };

  // State to store user data
  const [userData, setUserData] = useState<{
    employeeName: string;
    role: string;
    postOfficeName: string;
  } | null>(null); // Set the initial value null

  // State to store delivery counts
  const [deliveryCounts, setDeliveryCounts] = useState<{
    NORMAL_MAIL: number;
    REGISTERED_MAIL: number;
    COURIER: number;
  } | null>(null); // Set the initial value null

  // State to store loading status
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://${IP}:5000/employee/user?employeeID=0002` // Send GET request
        );
        const data = await response.json(); // Parse JSON data into an JavaScript object and store it in the data variable
        setUserData(data); // Update userData
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch delivery count data from the backend
    const fetchDeliveryCounts = async () => {
      try {
        const response = await fetch(
          `http://${IP}:5000/mail/employee?employeeID=0002` // Send GET request
        );
        const data = await response.json(); // Parse JSON data into an JavaScript object and store it in the data variable
        setDeliveryCounts(data); // Update deliveryCounts
      } catch (error) {
        console.error("Error fetching delivery counts:", error);
      }
    };

    // Fetch user data and delivery counts
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUserData(), fetchDeliveryCounts()]); // Waits for both fetchUserData and fetchDeliveryCounts to complete
      setLoading(false);
    };

    fetchData(); // This is called when the useEffect hook triggers
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#C60024" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* User data */}
      {userData && ( // Check if userData is not null
        <View style={styles.profDetailsContainer}>
          {/* <Image
          source={{ uri: userData.profilePicture }}
          style={styles.profileImage}
        /> */}
          <View>
            <Text style={styles.name}>{userData.employeeName}</Text>
            <Text style={styles.role}>{userData.role}</Text>
            <Text style={styles.branch}>{userData.postOfficeName}</Text>
          </View>
        </View>
      )}

      {/* Delivery counts */}
      {deliveryCounts && ( // Check if deliveryCounts is not null
        <View style={styles.deliveriesContainer}>
          <Text style={styles.deliveriesTitle}>Deliveries Remaining</Text>

          <View style={styles.deliveryTypes}>
            {/* Normal mail */}
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryCount}>
                {deliveryCounts.NORMAL_MAIL}
              </Text>
              <Text style={styles.deliveryLabel}>Normal</Text>
            </View>

            {/* Registered mail */}
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryCount}>
                {deliveryCounts.REGISTERED_MAIL}
              </Text>
              <Text style={styles.deliveryLabel}>Registered</Text>
            </View>

            {/* Parcel */}
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryCount}>{deliveryCounts.COURIER}</Text>
              <Text style={styles.deliveryLabel}>Parcel</Text>
            </View>
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleNavigation("STATUS")}
        >
          <Image
            source={require("../../../assets/icons/status.png")}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleNavigation("ADD_ADDRESS")}
        >
          <Image
            source={require("../../../assets/icons/address.png")}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Add Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleNavigation("LEAVES")}
        >
          <Image
            source={require("../../../assets/icons/leave.png")}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Leaves</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleNavigation("FEEDBACK")}
        >
          <Image
            source={require("../../../assets/icons/feedback.png")}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Feedback</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9001E",
    padding: 20,
  },
  profDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 55,
    marginLeft: 5,
    height: 50,
  },
  // profileImage: {
  //   width: 70,
  //   height: 70,
  //   borderRadius: 5,
  //   marginRight: 15,
  // },
  name: {
    fontSize: 33,
    color: "white",
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "white",
  },
  branch: {
    fontSize: 14,
    color: "white",
  },
  bellIcon: {
    position: "absolute",
    right: 0,
  },
  bellImage: {
    width: 30,
    height: 30,
  },
  deliveriesContainer: {
    backgroundColor: "#C60024",
    borderRadius: 10,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 25,
    marginBottom: 20,
  },
  deliveriesTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 60,
  },
  deliveryTypes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  deliveryItem: {
    alignItems: "center",
  },
  deliveryCount: {
    fontSize: 45,
    color: "white",

    fontWeight: "bold",
  },
  deliveryLabel: {
    fontSize: 14,

    color: "white",
  },
  actionsContainer: {
    marginTop: 19,
    marginLeft: 8,
    marginRight: 8,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  actionButton: {
    width: "42%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 25,
  },
  actionIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    color: "#333",
  },

  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Home;
