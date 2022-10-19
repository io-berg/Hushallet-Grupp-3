import * as React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useAppSelector } from "../store/store";
import { Avatar } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

export default function ProfileScreen() {
  const profile = useAppSelector((state) => state.household[0].profiles[0]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.icon}>{profile.avatar.icon}</Text>
        <Text style={styles.title}>{profile.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
  icon: {
    marginTop: 15,
    fontSize: 200,
    fontWeight: "bold",
  },
});
