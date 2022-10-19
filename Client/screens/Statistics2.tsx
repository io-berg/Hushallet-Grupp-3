import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Statistics2Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistik 2 Screen</Text>
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
    // fontWeight: "bold",
  },
});