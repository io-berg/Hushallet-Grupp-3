import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TaskHeader from "../components/TaskHeader";

export default function Statistics1Screen() {
  return (
    <View style={styles.container}>
      <TaskHeader title="Statistik1" />
      <Text style={styles.title}>Statistik 1 Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
  },
});
