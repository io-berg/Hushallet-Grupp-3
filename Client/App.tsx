import React from "react";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { RootNavigator } from "./navigation/RootNavigator";
import { store } from "./store/store";
import theme from "./utils/theme";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar />
          <RootNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
