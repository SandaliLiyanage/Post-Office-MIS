import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#C60024", // Common header background color
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 20, // Adjust the title font size
        },
      }}
    >
      <Stack.Screen name="status" options={{ title: "Status" }} />
      <Stack.Screen name="add-address" options={{ title: "Add Address" }} />
      <Stack.Screen name="leaves" options={{ title: "Leaves" }} />
      <Stack.Screen name="feedback" options={{ title: "Feedback" }} />
    </Stack>
  );
};

export default Layout;
