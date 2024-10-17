import React from "react";
import Router from "./src/router/Router";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <Router />
      <Toast position="bottom" visibilityTime={2000} />
    </NavigationContainer>
  );
};

export default App;
