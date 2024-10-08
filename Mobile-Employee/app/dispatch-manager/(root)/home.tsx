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
import { useFocusEffect } from "@react-navigation/native";
import { useUser } from "../../auth/usercontext";
import { IP } from "../../../config";

// Home screen component
const Home = () => {
  const router = useRouter(); // Call useRouter at the top level of the component
  const { user } = useUser();
  //const employeeID = user?.employeeID;
  const employeeID = "0005";
  console.log("employeeID", user);
  //const employeeID = "0002";
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

  // Fetch data every time the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://${IP}:5000/employee/user?employeeID=${employeeID}`
          );
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      const fetchDeliveryCounts = async () => {
        try {
          const response = await fetch(
            `http://${IP}:5000/mail/employee?employeeID=${employeeID}`
          );
          const data = await response.json();
          setDeliveryCounts(data);
        } catch (error) {
          console.error("Error fetching delivery counts:", error);
        }
      };

      const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchUserData(), fetchDeliveryCounts()]);
        setLoading(false);
      };

      fetchData(); // Fetch data when screen is focused
    }, [])
  );

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
          <Text style={styles.deliveriesTitle}>Bundles Remaining</Text>

          <View style={styles.deliveryTypes}>
            {/* Normal mail */}
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryCount}>
                5
                {/* {deliveryCounts.NORMAL_MAIL !== undefined
                  ? deliveryCounts.NORMAL_MAIL
                  : 0} */}
              </Text>
              <Text style={styles.deliveryLabel}>Created</Text>
            </View>

            {/* Parcel */}
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryCount}>
                8
                {/* {deliveryCounts.COURIER !== undefined
                  ? deliveryCounts.COURIER
                  : 0} */}
              </Text>
              <Text style={styles.deliveryLabel}>Arrived</Text>
            </View>
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actionsContainer}>
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
    fontSize: 16,
    color: "white",
  },
  branch: {
    fontSize: 16,
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
    marginLeft: 69,
  },
  deliveryTypes: {
    flexDirection: "row",
    justifyContent: "space-around",
    //paddingLeft: 0,
  },
  deliveryItem: {
    alignItems: "center",
  },
  deliveryCount: {
    fontSize: 50,
    color: "white",
    //paddingLeft: 12,
    fontWeight: "bold",
  },
  deliveryLabel: {
    fontSize: 16,
    color: "white",
    alignItems: "center",
    //paddingLeft: 2,
  },
  actionsContainer: {
    marginTop: 19,
    marginLeft: 65,
    marginRight: 65,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  actionButton: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 10,
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
