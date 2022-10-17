import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { logout } from "../store/authSlice";
import { decrement, increment } from "../store/counterSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const count = useAppSelector((state) => state.counter.count);
  const household = useAppSelector((state) => state.household[0].name);
  const username = useAppSelector((state) => state.auth.user?.username);
  const email = useAppSelector((state) => state.auth.user?.email);

  return (
    <View style={styles.container}>
      <Text>{username}</Text>
      <Text>{email}</Text>
      <Text style={styles.title}>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
