import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { useAppSelector } from "../store/store";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const auth = useAppSelector((state) => state.auth);

  const isAuthenticated =
    new Date(auth.expirationDate!).getTime() > new Date().getTime() && !!auth.token;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
