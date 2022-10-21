import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeCard from "../components/HomeCard";

export default function DetailScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <HomeCard>
        <Text>Hej Hej Detaljsidan</Text>
      </HomeCard>
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
