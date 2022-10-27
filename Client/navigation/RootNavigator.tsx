import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import DetailScreen from "../screens/DetailScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import HouseholdOverviewScreen from "../screens/HouseholdOverviewScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import StartScreen from "../screens/StartScreen";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppSelector } from "../store/store";
import { TabNavigator, TabsParamList } from "./TabsNavigator";

export type RootStackParamList = {
  Login: undefined;
  Home: NavigatorScreenParams<TabsParamList>;
  Register: undefined;
  Tema: undefined;
  Profile: undefined;
  Household: undefined;
  HouseholdOverview: undefined;
  Start: undefined;
  EditProfile: undefined;
  Details: { taskId: number };
  CreateTask: undefined;
  EditTask: { taskId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const auth = useAppSelector((state) => state.auth);

  const isAuthenticated = auth.expirationDate
    ? new Date(auth.expirationDate).getTime() > new Date().getTime() && !!auth.token
    : false;

  const selected = useAppSelector(selectCurrentHousehold);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        {isAuthenticated ? (
          selected ? (
            <Stack.Group>
              <Stack.Screen name="Home" component={TabNavigator} options={{ title: "Hushållet" }} />
              <Stack.Screen
                name="HouseholdOverview"
                component={HouseholdOverviewScreen}
                options={{ title: selected.name }}
              />
              <Stack.Screen
                name="Start"
                component={StartScreen}
                options={{ title: "Mina Hushåll" }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profil" }}
              />
              <Stack.Screen
                name="Details"
                component={DetailScreen}
                options={{ title: "Details" }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: "Redigera Profil" }}
              />
              <Stack.Screen
                name="CreateTask"
                component={CreateTaskScreen}
                options={{ title: "Skapa en ny syssla" }}
              />
              <Stack.Screen
                name="EditTask"
                component={EditTaskScreen}
                options={{ title: "Redigera syssla" }}
              />
            </Stack.Group>
          ) : (
            <Stack.Screen
              name="Start"
              component={StartScreen}
              options={{ title: "Mina Hushåll" }}
            />
          )
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Logga in" }} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Registrera" }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
