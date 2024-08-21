import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import icons from "../../../assets/icons";
import { useNavigationState } from "@react-navigation/native";

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

const Header = () => {
  const navigationState = useNavigationState((state) => state);
  const route = navigationState.routes[navigationState.index];

  return (
    <View style={{ flexDirection: "row", height: 50 }}>
      <Text
        style={{
          position: "absolute",
          left: 10,
          top: 5,
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
      </Text>
      <Image
        source={icons.notifications}
        style={{
          left: 325,
          top: 10,
          width: 30,
          height: 30,
        }}
      />
    </View>
  );
};

const Layout = () => (
  <Tabs
    initialRouteName="index"
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
      //headerTitleAlign: "center",
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
