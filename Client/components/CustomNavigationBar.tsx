import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, Menu, useTheme } from "react-native-paper";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/settingsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export function CustomNavigationBar({ navigation, back, options }: NativeStackHeaderProps) {
  const [visible, setVisible] = React.useState(false);
  const currentTheme = useAppSelector((state) => state.settings.theme);
  const theme = useTheme();
  const selectedHousehold = useAppSelector((state) => state.household.current);
  const isAuthed = useAppSelector((state) => state.auth.token !== null);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useAppDispatch();

  const themeButtonTitle =
    currentTheme === "auto" ? "Auto" : currentTheme === "light" ? "Ljust" : "Mörkt";

  return (
    <Appbar.Header mode="center-aligned" statusBarHeight={0}>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content
        titleStyle={{
          fontSize: 24,
          fontWeight: "bold",
          backgroundColor: theme.colors.surface,
        }}
        title={options.title}
      />
      {
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu" color={theme.colors.text} onPress={openMenu} />}
          contentStyle={styles.meny}
        >
          <Menu.Item
            leadingIcon="home"
            style={{
              ...styles.button,
              backgroundColor: theme.colors.surface,
            }}
            onPress={() => {
              navigation.navigate("Home");
              setVisible(false);
            }}
            title="Hem"
            disabled={selectedHousehold == null || !isAuthed}
          />

          <Menu.Item
            leadingIcon="calendar-month-outline"
            style={{
              ...styles.button,
              backgroundColor: theme.colors.surface,
            }}
            onPress={() => {
              navigation.navigate("HouseholdOverview");
              setVisible(false);
            }}
            title="Hushålls Översikt"
            disabled={selectedHousehold == null || !isAuthed}
          />

          <Menu.Item
            leadingIcon="calendar-range-outline"
            style={{
              ...styles.button,
              backgroundColor: theme.colors.surface,
            }}
            onPress={() => navigation.navigate("Start")}
            title="Mina hushåll"
            disabled={!isAuthed}
          />

          <Menu.Item
            leadingIcon="account"
            style={{
              ...styles.button,
              backgroundColor: theme.colors.surface,
            }}
            onPress={() => {
              navigation.navigate("Profile");
              setVisible(false);
            }}
            title="Profil"
            disabled={selectedHousehold == null || !isAuthed}
          />

          <Menu.Item
            leadingIcon="brightness-6"
            style={{
              ...styles.button,
              backgroundColor: theme.colors.surface,
            }}
            onPress={() => dispatch(toggleTheme())}
            title={"Växla tema | " + themeButtonTitle}
          />

          <Menu.Item
            leadingIcon="location-exit"
            style={{
              ...styles.logButton,
              backgroundColor: theme.colors.surface,
            }}
            onPress={() => dispatch(logout())}
            title="Logga ut"
          />
        </Menu>
      }
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  meny: {
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    margin: 10,
    paddingRight: 80,
  },
  logButton: {
    borderRadius: 10,
    margin: 10,
    marginTop: 200,
  },
});
