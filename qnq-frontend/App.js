import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import QnQDrawer from "./app/config/navigation";
import Onboarding from "./app/screens/OnboardingScreen"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
            headerMode= "none"
            // initialRouteName={"Home"}   // Home Screen to be added later
            >
            <Stack.Screen name="Onboarding" component={Onboarding}/>
            {/*<QnQDrawer />*/}
        </Stack.Navigator>
    </NavigationContainer>
  );
}
