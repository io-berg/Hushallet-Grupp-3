import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { decrement, increment } from "../store/counterSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function HemScreen({ navigation }: any) {
  const [state, setState] = useState(0);
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.count);
  const household = useAppSelector((state) => state.household[0].name);

  useEffect(() => {
    setState(count);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to login" onPress={() => navigation.navigate("LogIn")} />
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
