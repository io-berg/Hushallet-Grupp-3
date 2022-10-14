import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useAppSelector } from "../store/store";
import { Avatar } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation, route }: Props) {
  const profileName = useAppSelector((state) => state.household[0].profiles[0].name);
  const profileAvatar = useAppSelector((state) => state.household[0].profiles[0].avatar.color);
  const profileAvatarIcon = useAppSelector((state) => state.household[0].profiles[0].avatar.icon);

  return (
    <View style={styles.container}>
      <View>
        <Avatar.Text size={150} label={profileAvatarIcon} />
      </View>
      <View>
        <Text style={styles.title}>{profileName}</Text>
      </View>
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
  avatar: {
    fontSize: 150,
    backgroundColor: "#ED5949",
  },
});
