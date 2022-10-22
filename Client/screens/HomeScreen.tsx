import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { logout } from "../store/authSlice";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectCurrentHousehold);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to login" onPress={() => navigation.navigate("Login")} />

      <Text>{user?.username}</Text>
      <Text>{user?.email}</Text>

      <Button title="Logout" onPress={() => dispatch(logout())} />
      <Text>Household: {selected?.name}</Text>

      <Button title="Profile" onPress={() => navigation.navigate("Profile")}></Button>
      <Button title="ProfileCreate" onPress={() => navigation.navigate("SkapaProfil")}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
