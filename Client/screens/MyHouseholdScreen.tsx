import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MyHouseholdScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mina hushåll screen</Text>
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
