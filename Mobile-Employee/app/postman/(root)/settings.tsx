import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="user-alt" size={22} color="#fff" />
        </View>
        <Text style={styles.settingText}>Change Profile Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="security" size={25} color="#fff" />
        </View>
        <Text style={styles.settingText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="logout" size={25} color="#fff" />
        </View>
        <Text style={styles.settingText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e", // Dark background color
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333", // Slightly lighter color for separators
  },
  iconContainer: {
    width: 40, // Fixed width for consistent icon alignment
  },
  settingText: {
    fontSize: 18,
    color: "#fff", // White text color
    marginLeft: 10,
  },
  logoutButton: {
    borderTopWidth: 1,
    borderTopColor: "#333", // To match the styling of the other items
    marginTop: 20,
    paddingTop: 15,
    backgroundColor: "#ff4c4c", // Distinct red color for the log-out button
  },
  logoutButtonText: {
    fontWeight: "bold",
  },
});

export default Settings;
