import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { RootNavigator } from "./navigation/RootNavigator";
import { hydrateAuth } from "./store/authSlice";
import { fetchMyHouseholds } from "./store/householdSlice";
import { hydrateSettings } from "./store/settingsSlice";
import { store, useAppDispatch, useAppSelector } from "./store/store";
import { getPersistedAuthValues, getPersistedSettingsValues } from "./utils/startup";
import { darkTheme, lightTheme } from "./utils/theme";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <StartupGate>
        <SafeAreaProvider>
          <StatusBar />
          <RootNavigator />
        </SafeAreaProvider>
      </StartupGate>
    </ReduxProvider>
  );
}

interface Props {
  children: JSX.Element;
}

function StartupGate({ children }: Props) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const themeState = useAppSelector((state) => state.settings.theme);

  let theme = MD3LightTheme;
  if (themeState === "auto") {
    theme = colorScheme === "dark" ? darkTheme : lightTheme;
  } else {
    theme = themeState === "light" ? lightTheme : darkTheme;
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    (async () => {
      const persistedAuth = await getPersistedAuthValues();
      const persistedSettings = await getPersistedSettingsValues();
      dispatch(hydrateAuth(persistedAuth));
      dispatch(hydrateSettings(persistedSettings));

      interval = setInterval(() => {
        dispatch(fetchMyHouseholds());
      }, 3000);
    })();

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
