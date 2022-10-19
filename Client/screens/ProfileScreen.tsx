import * as React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import AvatarIcon from "../components/avatarIcon";
import { useAppSelector } from "../store/store";

export default function ProfileScreen() {
  const profile = useAppSelector((state) => state.household[0].profiles[0]);
  const color = profile.avatar.color;
  return (
    <View style={styles.container}>
      <AvatarIcon></AvatarIcon>
      <Text style={styles.title}>{profile.name}</Text>
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
    fontSize: 45,
    fontWeight: "bold",
  },
  icon: {
    marginTop: 15,
    fontSize: 200,
    fontWeight: "bold",
  },
});
