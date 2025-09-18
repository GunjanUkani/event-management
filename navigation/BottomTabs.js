import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import PassRegistrationScreen from "../screens/PassRegistration";
import Venue from "../screens/venue";
import AboutUsScreen from "../screens/Aboutus";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack for Home (so Home can navigate to sub-pages like Gallery)
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutUsScreen} />
    </Stack.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#eee",
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarActiveTintColor: "#ff6600",
        tabBarInactiveTintColor: "#999",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Register") iconName = "ticket";
          else if (route.name === "Venue") iconName = "location";
          else if (route.name === "About") iconName = "information-circle";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Register" component={PassRegistrationScreen} />
      <Tab.Screen name="Venue" component={Venue} />
    </Tab.Navigator>
  );
}
