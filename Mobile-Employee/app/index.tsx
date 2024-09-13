// Entry point for the app

import { Redirect } from "expo-router";

const Index = () => {
  // user is dericted to the login page
  //return <Redirect href="/(auth)/log-in" />;
  return <Redirect href="/(root)/(tabs)/home" />;
};

export default Index;
