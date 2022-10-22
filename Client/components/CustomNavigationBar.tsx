import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Menu } from "react-native-paper";

export function CustomNavigationBar({ navigation, back }: any) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header mode="small">
      <Appbar.BackAction onPress={navigation.goBack} />
      <Appbar.Content titleStyle={{ textAlign: "center" }} title="Hushållet" />
      {
        <Menu
          style={styles.meny}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu" color="black" onPress={openMenu} />}
        >
          <View style={styles.menyback}>
            <Menu.Item
              leadingIcon="home"
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
              title="Hem"
            />

            <Menu.Item
              leadingIcon="calendar-month-outline"
              style={styles.button}
              onPress={() => navigation.navigate("HouseholdOverview")}
              title="Hushålls Översikt"
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
              onPress={() => navigation.navigate("Profile")}
              title="Profil"
            />

            <Menu.Item
              leadingIcon="brightness-6"
              style={styles.button}
              onPress={() => navigation.navigate("Tema")}
              title="Ljust/Mörkt teama"
            />

            <Menu.Item
              leadingIcon="location-exit"
              style={styles.logButton}
              onPress={() => navigation.navigate("LoggaUt")}
              title="Logga ut"
            />
          </View>
        </Menu>
      }
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  menyback: {},
  meny: {
    // marginTop: 120,
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
