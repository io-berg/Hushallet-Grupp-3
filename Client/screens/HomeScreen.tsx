import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { logout } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const household = useAppSelector((state) => state.household[0].name);
  const username = useAppSelector((state) => state.auth.user?.username);
  const email = useAppSelector((state) => state.auth.user?.email);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to login" onPress={() => navigation.navigate("LogIn")} />

      <Text>{username}</Text>
      <Text>{email}</Text>

      <Button title="Logout" onPress={() => dispatch(logout())} />
      <Text>Household: {household}</Text>
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
