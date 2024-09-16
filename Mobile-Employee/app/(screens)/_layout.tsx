import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="status" options={{ title: "Status" }} />
      <Stack.Screen name="add-address" options={{ title: "Add Address" }} />
      <Stack.Screen name="leaves" options={{ title: "Leaves" }} />
      <Stack.Screen name="feedback" options={{ title: "Feedback" }} />
    </Stack>
  );
};

export default Layout;
