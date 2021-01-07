import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Drawer from "./drawer";
import SignInScreen from "../../screens/SignInScreen";

const Stack = createStackNavigator();

export default function QnQStack(props) {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={({ route, navigation }) => ({
        headerShown: false
      })}
    >
      {props.userToken == null ? (
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          animationTypeForReplace={props.isSignout ? "pop" : "push"}
        />
      ) : (
        <Stack.Screen name="Drawer" component={Drawer} />
      )}
    </Stack.Navigator>
  );
}
