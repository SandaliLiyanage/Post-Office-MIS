// Entry point for the app

import { Redirect } from "expo-router";

const Index = () => {
  // user is dericted to the login page
  return <Redirect href="/auth/log-in" />;
  //return <Redirect href="/postman/home" />;
  //return <Redirect href="/dispatch-manager/home" />;
  //return <Redirect href="/postman/add-address" />;
};

export default Index;
