import * as React from "react";
import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Home from "../screens/Home";
import Search from "../screens/Search";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import { BottomTab } from "./BottomTab";

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BookSearch" component={Search} />
        <Stack.Screen name="BookDetailsScreen" component={BookDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigation;
