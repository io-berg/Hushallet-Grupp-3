import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import HouseholdOverviewScreen from "../screens/HouseholdOverviewScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import StartScreen from "../screens/StartScreen";
import ThemeScreen from "../screens/Theme";
import { useAppDispatch, useAppSelector } from "../store/store";
import { TabNavigator } from "./TabsNavigator";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Tema: undefined;
  Profile: undefined;
  Household: undefined;
  HouseholdOverview: undefined;
  Start: undefined;
  SkapaProfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const auth = useAppSelector((state) => state.auth);

  const isAuthenticated = auth.expirationDate
    ? new Date(auth.expirationDate).getTime() > new Date().getTime() && !!auth.token
    : false;

  console.log(auth);

  console.log("isAuthenticated", isAuthenticated);

  // const dispatch = useAppDispatch();

  /*useEffect(() => {
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
  }, [dispatch]);*/

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
            <Stack.Screen name="Home" component={TabNavigator} options={{ title: "Hushållet" }} />
            <Stack.Screen
              name="HouseholdOverview"
              component={HouseholdOverviewScreen}
              options={{ title: "Husålls Översikt" }}
            />
            <Stack.Screen
              name="Start"
              component={StartScreen}
              options={{ title: "Mina Hushåll" }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profil" }} />
            <Stack.Screen
              name="SkapaProfil"
              component={CreateProfileScreen}
              options={{ title: "Skapa Profil" }}
            />
            <Stack.Screen name="Tema" component={ThemeScreen} options={{ title: "Tema" }} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Registring" }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
