import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CustomNavigationBar } from "../components/CustomNavigationBar";
import HemScreen from "../screens/HemScreen";
import HomeScreen from "../screens/HemScreen";
import HushållÖversiktScreen from "../screens/HushållsÖversiktScreen";
import LoggaUtScreen from "../screens/LoggaUtScreen";
import LoginScreen from "../screens/LoginScreen";
import MinaHushållScreen from "../screens/MinaHushållScreen";
import ProfilScreen from "../screens/ProfilScreen";
import TemaScreen from "../screens/Tema";
import { TabNavigator } from "./TabsNavigator";

// type RootStackParamList = {
//   Home: undefined;
//   LogIn: undefined;
// };

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Hem"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        <Stack.Screen name="Hushållet" component={TabNavigator} options={{ title: "Hushållet" }} />
        <Stack.Screen name="LoggaIn" component={LoginScreen} options={{ title: "LoggaIn" }} />
        <Stack.Screen name="LoggaUt" component={LoggaUtScreen} options={{ title: "LoggaUt" }} />
        <Stack.Screen
          name="HusHållÖversikt"
          component={HushållÖversiktScreen}
          options={{ title: "HushållÖversikt" }}
        />
        <Stack.Screen
          name="MinaHushåll"
          component={MinaHushållScreen}
          options={{ title: "MinaHushåll" }}
        />
        <Stack.Screen name="Profil" component={ProfilScreen} options={{ title: "Profil" }} />
        <Stack.Screen name="Tema" component={TemaScreen} options={{ title: "Tema" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
