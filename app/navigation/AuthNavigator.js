import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/Signup";
import routes from "./routes";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.SIGNUP} component={SignUpScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
