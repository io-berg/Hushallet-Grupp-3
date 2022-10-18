import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  CreateProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        <Stack.Screen
          name="CreateProfileScreen"
          component={CreateProfileScreen}
          options={{ title: "Create Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
