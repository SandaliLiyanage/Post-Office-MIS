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
import { useUser } from "../../auth/usercontext";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "./routes";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();
  const { removeUser, user } = useUser();
  const navigation = useNavigation();
  type RouteKeys = keyof typeof ROUTES;

  const handleNavigation = (routeName: RouteKeys) => {
    router.push(ROUTES[routeName] as any); // Navigate to the selected route
  };

  const handleLogout = () => {
    removeUser(); // This removes the user from the context or clears the session
    handleNavigation("LOG_IN"); // Navigate to the login screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity style={styles.settingItem}>
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
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
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
    backgroundColor: "#F9001E",
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CD0000", // Slightly lighter color for separators
  },
  iconContainer: {
    width: 40, // Fixed width for consistent icon alignment
  },
  settingText: {
    fontSize: 18,
    color: "#fff", // White text color
    marginLeft: 10,
  },
});

export default Settings;
