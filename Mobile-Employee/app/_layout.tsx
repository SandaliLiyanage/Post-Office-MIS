import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ToastProvider } from "react-native-toast-notifications";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "./auth/usercontext"; // Adjust the path to usercontext

// Prevent the splash screen from auto hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

// Defines the overall structure of the app
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hide splash screen after loading
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Return null until fonts are loaded
  if (!loaded) {
    return null;
  }

  // Structure of the app
  return (
    // Wrap the app in UserProvider to provide user context to all screens
    <UserProvider>
      <ToastProvider>
        {/* Stack of screens */}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="postman" options={{ headerShown: false }} />
          <Stack.Screen
            name="dispatch-manager"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ToastProvider>
    </UserProvider>
  );
}
