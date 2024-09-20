import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <View style={styles.container}>
      {/* Stack component for the screens */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#C60024", // Common header background color
          },
          headerTitleStyle: {
            color: "#fff",
            fontSize: 24, // Adjust the title font size
            fontWeight: "bold", // Set the title font weight to bold
          },
          headerTintColor: "#fff", // Change the Go Back icon color
        }}
      >
        <Stack.Screen name="status" options={{ title: "Status" }} />
        <Stack.Screen name="add-address" options={{ title: "Add Address" }} />
        <Stack.Screen name="leaves" options={{ title: "Leaves" }} />
        <Stack.Screen name="feedback" options={{ title: "Feedback" }} />
        <Stack.Screen name="signaturescreen" options={{ title: "Signature" }} />
      </Stack>

      {/* Footer component */}
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height: 50,
    backgroundColor: "#C60024",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Layout;
