// Tab based navigation

import { Tabs } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import icons from "../../../assets/icons";
import { useNavigationState } from "@react-navigation/native";

// Tab icon component
const TabIcon = ({ source, focused }: { source: any; focused: boolean }) => (
  <View>
    <Image
      source={source}
      style={{
        width: 24,
        height: 30,
        tintColor: focused ? "black" : "white",
      }}
    />
  </View>
);

// Header component
const Header = () => {
  // Get the navigation state using the useNavigationState hook
  const navigationState = useNavigationState((state) => state); // Send a function that returns current navigation state as an argument
  const route = navigationState.routes[navigationState.index]; // Get the current route from the routes array using the index

  return (
    <View style={{ flexDirection: "row", height: 50 }}>
      {/*Header title*/}
      <Text
        style={{
          position: "absolute",
          left: 14,
          top: 5,
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {/*Set the header title to the current route name*/}
        {route.name.charAt(0).toUpperCase() + route.name.slice(1)}{" "}
      </Text>

      {/*Notification icon*/}
      <TouchableOpacity style={{ left: 339, top: 10 }}>
        <Image
          source={icons.notifications}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

// Tab navigation
const Layout = () => (
  <Tabs
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "white",
      tabBarStyle: {
        backgroundColor: "#C60024",
        height: 70,
        paddingBottom: 7,
      },
      tabBarLabelStyle: {
        fontSize: 10,
      },
      tabBarItemStyle: {
        paddingVertical: 3,
      },
      tabBarIconStyle: {
        marginTop: 6,
      },
      headerStyle: {
        backgroundColor: "#C60024",
        height: 100,
      },
      headerTintColor: "white",
      headerTitle: () => <Header />,
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.home} />
        ),
      }}
    />
    <Tabs.Screen
      name="route"
      options={{
        title: "Route",
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.route} />
        ),
      }}
    />
    <Tabs.Screen
      name="scan"
      options={{
        title: "Scan",
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.scan} />
        ),
      }}
    />
    <Tabs.Screen
      name="mail"
      options={{
        title: "Mail",
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.mail} />
        ),
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: "Settings",
        headerShown: true,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.settings} />
        ),
      }}
    />
  </Tabs>
);

export default Layout;
