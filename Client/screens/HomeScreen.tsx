import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { decrement, increment } from "../store/counterSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation, route }: Props) {
  const [state, setState] = useState(0);
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.count);
  const household = useAppSelector((state) => state.household[0].name);

  useEffect(() => {
    setState(count);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Text>Household: {household}</Text>

      <Button title="Profile" onPress={() => navigation.navigate("Profile")}></Button>
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
