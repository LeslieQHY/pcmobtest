import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BUCKS_SCREEN } from "../constants";
import BucksScreenAdd from "../screens/BucksScreenAdd";
import BucksScreenHome from "../screens/BucksScreenHome";
import BucksScreenDetails from "../screens/BucksScreenDetails";

const BucksStackNav = createStackNavigator();

export default function BucksStack() {
  return (
    <BucksStackNav.Navigator>
      <BucksStackNav.Screen
        name={BUCKS_SCREEN.Home}
        component={BucksScreenHome}
        options={{ headerShown: false }}
      />
      <BucksStackNav.Screen
        name={BUCKS_SCREEN.Add}
        component={BucksScreenAdd}
        options={{ headerShown: false }}
      />
      <BucksStackNav.Screen
        name={BUCKS_SCREEN.Details}
        component={BucksScreenDetails}
        options={{ headerShown: false }}
      />
    </BucksStackNav.Navigator>
  );
}