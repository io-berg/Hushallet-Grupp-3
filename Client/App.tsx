import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { RootNavigator } from "./navigation/RootNavigator";
import { store, useAppDispatch, useAppSelector } from "./store/store";
import { darkTheme, lightTheme } from "./utils/theme";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistanceGate>
        <SafeAreaProvider>
          <StatusBar />
          <RootNavigator />
        </SafeAreaProvider>
      </PersistanceGate>
    </ReduxProvider>
  );
}

interface Props {
  children: JSX.Element;
}

function PersistanceGate({ children }: Props) {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();
  const themeState = useAppSelector((state) => state.settings.theme);

  let theme = MD3LightTheme;
  if (themeState === "auto") {
    theme = colorScheme === "dark" ? darkTheme : lightTheme;
  } else {
    theme = themeState === "light" ? lightTheme : darkTheme;
  }

  // useEffect(() => {
  //   (async () => {
  //     const persistedAuth = await getPersistedAuthValues();
  //     const persistedSettings = await getPersistedSettingsValues();
  //     dispatch(hydrateAuth(persistedAuth));
  //     dispatch(hydrateSettings(persistedSettings));
  //   })();
  // }, [dispatch]);

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
