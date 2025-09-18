import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";  // ✅ add this

import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import BottomTabs from "./BottomTabs";
import Venue from "../screens/venue";
import AboutUsScreen from "../screens/Aboutus";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
          {/* Step 1: Onboarding (no tabs) */}
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />

          {/* Step 2: Login (no tabs) */}
          <Stack.Screen name="Login" component={LoginScreen} />
          

          <Stack.Screen name="About" component={AboutUsScreen} />
          {/* Step 3: Main App with Bottom Tabs */}
          <Stack.Screen name="MainApp" component={BottomTabs} />
          {/* Add other screens here if needed */}
          <Stack.Screen name="Venue" component={Venue} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
