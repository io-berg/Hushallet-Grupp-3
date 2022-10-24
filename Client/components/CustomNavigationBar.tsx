import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/settingsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export function CustomNavigationBar({ navigation, back }: NativeStackHeaderProps) {
  const [visible, setVisible] = React.useState(false);
  const theme = useAppSelector((state) => state.settings.theme);
  const selectedHousehold = useAppSelector((state) => state.household.current);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useAppDispatch();

  const themeButtonTitle = theme === "auto" ? "Auto" : theme === "light" ? "Ljust" : "Mörkt";

  return (
    <Appbar.Header mode="center-aligned" statusBarHeight={0}>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content
        titleStyle={{
          fontSize: 24,
          fontWeight: "bold",
        }}
        title="Hushållet"
      />
      {
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu" color="black" onPress={openMenu} />}
          contentStyle={styles.meny}
        >
          <View style={styles.menyback}>
            <Menu.Item
              leadingIcon="home"
              style={styles.button}
              onPress={() => {
                navigation.navigate("Home");
                setVisible(false);
              }}
              title="Hem"
              disabled={selectedHousehold == null}
            />

            <Menu.Item
              leadingIcon="calendar-month-outline"
              style={styles.button}
              onPress={() => {
                navigation.navigate("HouseholdOverview");
                setVisible(false);
              }}
              title="Hushålls Översikt"
              disabled={selectedHousehold == null}
            />

            <Menu.Item
              leadingIcon="calendar-range-outline"
              style={styles.button}
              onPress={() => navigation.navigate("Start")}
              title="Mina hushåll"
            />

            <Menu.Item
              leadingIcon="account"
              style={styles.button}
              onPress={() => {
                navigation.navigate("Profile");
                setVisible(false);
              }}
              title="Profil"
              disabled={selectedHousehold == null}
            />

            <Menu.Item
              leadingIcon="brightness-6"
              style={styles.button}
              onPress={() => dispatch(toggleTheme())}
              title={"Växla tema | " + themeButtonTitle}
            />

            <Menu.Item
              leadingIcon="location-exit"
              style={styles.logButton}
              onPress={() => dispatch(logout())}
              title="Logga ut"
            />
          </View>
        </Menu>
      }
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  menyback: {
    backgroundColor: "#F5F5F5",
  },
  meny: {
    backgroundColor: "#F5F5F5",
    marginTop: 70,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#778899",
    margin: 10,
    paddingRight: 80,
  },
  logButton: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#778899",
    margin: 10,
    marginTop: 200,
  },
});
