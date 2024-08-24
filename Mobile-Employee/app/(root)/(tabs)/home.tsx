import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../../assets/icons/home.png")}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>Virat Kohli</Text>
          <Text style={styles.role}>Postman</Text>
          <Text style={styles.branch}>Moratuwa Branch</Text>
        </View>
        <TouchableOpacity style={styles.bellIcon}>
          <Image
            source={require("../../../assets/icons/home.png")}
            style={styles.bellImage}
          />
        </TouchableOpacity>
      </View>

      {/* Deliveries Remaining Section */}
      <View style={styles.deliveriesContainer}>
        <Text style={styles.deliveriesTitle}>Deliveries Remaining</Text>
        <View style={styles.deliveryTypes}>
          <View style={styles.deliveryItem}>
            <Text style={styles.deliveryCount}>27</Text>
            <Text style={styles.deliveryLabel}>Normal</Text>
          </View>
          <View style={styles.deliveryItem}>
            <Text style={styles.deliveryCount}>09</Text>
            <Text style={styles.deliveryLabel}>Registered</Text>
          </View>
          <View style={styles.deliveryItem}>
            <Text style={styles.deliveryCount}>04</Text>
            <Text style={styles.deliveryLabel}>Parcel</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons Section */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require("../../../assets/icons/home.png")} // Replace with the actual path
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Status</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require("../../../assets/icons/home.png")} // Replace with the actual path
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Add Address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require("../../../assets/icons/home.png")} // Replace with the actual path
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Leaves</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require("../../../assets/icons/home.png")} // Replace with the actual path
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
    backgroundColor: "#e41f26", // Red background
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  name: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    color: "#fff",
  },
  branch: {
    fontSize: 14,
    color: "#fff",
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
    backgroundColor: "#c2161d", // Darker red for deliveries section
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  deliveriesTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  deliveryTypes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  deliveryItem: {
    alignItems: "center",
  },
  deliveryCount: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  deliveryLabel: {
    fontSize: 14,
    color: "#fff",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  actionButton: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
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
});

export default Home;
