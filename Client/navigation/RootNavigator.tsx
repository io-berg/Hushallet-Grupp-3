import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import HouseholdOverviewScreen from "../screens/HouseholdOverviewScreen";
import LoginScreen from "../screens/LoginScreen";
import LogOutScreen from "../screens/LogOutScreen";
import MyHouseholdScreen from "../screens/MyHouseholdScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ThemeScreen from "../screens/Theme";
import { AuthState, hydrateAuth } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { get } from "../utils/localStorage";
import { TabNavigator } from "./TabsNavigator";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Tema: undefined;
  Profil: undefined;
  Hushållet: undefined;
  LoggaUt: undefined;
  LoggaIn: undefined;
  HusHållÖversikt: undefined;
  MinaHushåll: undefined;
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
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen
              name="Hushållet"
              component={TabNavigator}
              options={{ title: "Hushållet" }}
            />

            <Stack.Screen name="LoggaUt" component={LogOutScreen} options={{ title: "LoggaUt" }} />
            <Stack.Screen
              name="HusHållÖversikt"
              component={HouseholdOverviewScreen}
              options={{ title: "HushållÖversikt" }}
            />
            <Stack.Screen
              name="MinaHushåll"
              component={MyHouseholdScreen}
              options={{ title: "MinaHushåll" }}
            />
            <Stack.Screen name="Profil" component={ProfileScreen} options={{ title: "Profil" }} />
            <Stack.Screen name="Tema" component={ThemeScreen} options={{ title: "Tema" }} />
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
