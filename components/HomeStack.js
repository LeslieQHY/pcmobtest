import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { BUCKS_STACK, PROFILE_SCREEN } from "../constants";
import ProfileScreen from "../screens/ProfileScreen";
import BucksStack from "./BucksStack";

const BottomTab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == BUCKS_STACK) iconName = "list-alt";
          else iconName = "user";

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name={BUCKS_STACK} component={BucksStack} />
      <BottomTab.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
    </BottomTab.Navigator>
  );
}