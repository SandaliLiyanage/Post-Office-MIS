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

const Home = () => {
  const [userData, setUserData] = useState<{
    employeeName: string;
    role: string;
    branch: string;
  } | null>(null);
  const [deliveryCounts, setDeliveryCounts] = useState<{
    normal: number;
    registered: number;
    parcel: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.8:5000/employee/user?employeeID=12345"
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch delivery count data from the backend
    const fetchDeliveryCounts = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.8:5000/mail/employee?employeeID=12345"
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

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#C60024" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profDetailsContainer}>
        {/* <Image
          source={{ uri: userData.profilePicture }}
          style={styles.profileImage}
        /> */}
        <View>
          <Text style={styles.name}>{userData.employeeName}</Text>
          <Text style={styles.role}>{userData.role}</Text>
          <Text style={styles.branch}>{userData.branch}</Text>
        </View>
      </View>
      <View style={styles.deliveriesContainer}>
        <Text style={styles.deliveriesTitle}>Deliveries Remaining</Text>
        <View style={styles.deliveryTypes}>
          <View style={styles.deliveryItem}>

            <Text style={styles.deliveryCount}>{deliveryCounts.normal}</Text>
            <Text style={styles.deliveryLabel}>Normal</Text>
          </View>
          <View style={styles.deliveryItem}>
            <Text style={styles.deliveryCount}>
              {deliveryCounts.registered}
            </Text>
            <Text style={styles.deliveryLabel}>Registered</Text>
          </View>
          <View style={styles.deliveryItem}>
            <Text style={styles.deliveryCount}>{deliveryCounts.parcel}</Text>

            <Text style={styles.deliveryLabel}>Parcel</Text>
          </View>
        </View>
      </View>


      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require("../../../assets/icons/status.png")}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Status</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require("../../../assets/icons/address.png")}

            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Add Address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require("../../../assets/icons/leave.png")}

            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Leaves</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9001E",
    padding: 20,
  },
  profDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginLeft: 5,
    height: 60,
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
    padding: 24,
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

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  actionButton: {
    width: "45%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,

    alignItems: "center",
    marginBottom: 20,
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
