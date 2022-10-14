import React from "react";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { RootNavigator } from "./navigation/RootNavigator";
import { store } from "./store/store";
import theme from "./utils/theme";

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
