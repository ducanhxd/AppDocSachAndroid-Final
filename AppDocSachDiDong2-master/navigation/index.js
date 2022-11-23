import * as React from "react";
import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Home from "../screens/Home";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="SignIn" component={SignInScreen} />
        <Tab.Screen name="SignUp" component={SignUpScreen} />
        <Tab.Screen name="Home" component={Home}
           
           
         />
        <Tab.Screen name="BookDetailsScreen" component={BookDetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}
export default AppNavigation;
