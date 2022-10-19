import React from "react";
import { Appbar, Menu } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export function CustomNavigationBar({ navigation, back }: any) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={styles.headern}>
      <Appbar.Content title="HusHållet" />
      {!back ? (
        <Menu
          style={styles.meny}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
        >
          <View style={styles.menyback}>
            <Menu.Item
              leadingIcon="home"
              style={styles.button}
              onPress={() => navigation.navigate("Hem")}
              title="Hem"
            />

            <Menu.Item
              leadingIcon="calendar-month-outline"
              style={styles.button}
              onPress={() => navigation.navigate("HushållÖversikt")}
              title="HushållÖversikt"
            />

            <Menu.Item
              leadingIcon="calendar-range-outline"
              style={styles.button}
              onPress={() => navigation.navigate("MinaHushåll")}
              title="Mina hushåll"
            />

            <Menu.Item
              leadingIcon="account"
              style={styles.button}
              onPress={() => navigation.navigate("Profil")}
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
      ) : null}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  menyback: {
    backgroundColor: "#d3d3d3",
  },
  meny: {
    marginTop: 120,
  },
  headern: {
    backgroundColor: "#d3d3d3",
    color: "black",
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
