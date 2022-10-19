import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HouseholdOverviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hushålls översikt screen</Text>
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
