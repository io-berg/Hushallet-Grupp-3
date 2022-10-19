import * as React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import AvatarIcon from "../components/AvatarIconComponent";
import { useAppSelector } from "../store/store";
import { Profile } from "../utils/type";

export default function ProfileScreen() {
  const [currentProfile, setProfile] = React.useState<Profile>();
  const profile = useAppSelector((state) => state.profile);

  React.useEffect(() => {
    (() => {
      setProfile(profile);
      console.log(profile.name);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <AvatarIcon></AvatarIcon>
      <Text style={styles.title}>{currentProfile?.name}</Text>
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
