import * as React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useAppSelector } from "../store/store";
import { Avatar } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation, route }: Props) {
  const profile = useAppSelector((state) => state.household[0].profiles[0]);

  return (
    <View style={styles.container}>
      <View>
        <Avatar.Text size={250} label={profile.avatar.icon} />
      </View>
      <View>
        <Text style={styles.title}>{profile.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});
