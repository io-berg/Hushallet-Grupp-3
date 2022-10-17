import React from "react";
import { StatusBar } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import { RootNavigator } from "./navigation/RootNavigator";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { store } from "./store/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar />
        <RootNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FFFFFF",
    secondary: "#F2F2F2",
    tertiary: "#a1b2c3",
  },
};
