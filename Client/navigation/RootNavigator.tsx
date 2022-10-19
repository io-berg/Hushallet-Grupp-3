import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import StartScreen from "../screens/StartScreen";
import { AuthState, hydrateAuth } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { get } from "../utils/localStorage";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Start: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const auth = useAppSelector((state) => state.auth);

  const isAuthenticated = auth.expirationDate
    ? new Date(auth.expirationDate).getTime() > new Date().getTime() && !!auth.token
    : false;

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      let values: AuthState = {
        token: "",
        user: null,
        expirationDate: "",
        loginErrors: null,
        registerErrors: null,
        loading: false,
        registerSuccess: false,
      };

      const token = await get("auth.token");
      const expirationDate = await get("auth.expirationDate");
      const user = await get("auth.user");

      if (token && expirationDate && user) {
        values = {
          token,
          expirationDate,
          user: JSON.parse(user),
          loginErrors: null,
          registerErrors: null,
          loading: false,
          registerSuccess: false,
        };
      }

      dispatch(hydrateAuth(values));
    })();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Start" : "Login"}>
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen
              name="Start"
              component={StartScreen}
              options={{ title: "Mina hushåll" }}
            />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Register" }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
