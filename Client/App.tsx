import React from "react";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { RootNavigator } from "./navigation/RootNavigator";
import { store } from "./store/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <StatusBar />
        <RootNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
}
