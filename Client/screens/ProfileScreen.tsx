import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectCurrentUserProfile } from "../store/selectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const currentUserProfile = useAppSelector(selectCurrentUserProfile);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 15,
          height: 320,
          width: 320,
          borderRadius: 170,
          backgroundColor: currentUserProfile?.avatar.color,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            marginTop: 15,
            fontSize: 200,
            fontWeight: "bold",
          }}
        >
          {currentUserProfile?.avatar.icon}
        </Text>
      </View>
      <Text style={styles.title}>{currentUserProfile?.name}</Text>

      <Button onPress={() => navigation.navigate("EditProfile")}>Redigera Profil</Button>
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
