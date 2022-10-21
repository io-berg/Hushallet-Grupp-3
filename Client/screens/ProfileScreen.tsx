import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Button } from "react-native-paper";
//import AvatarIcon from "../components/AvatarIconComponent";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppSelector } from "../store/store";
import { Profile } from "../utils/type";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const [currentProfile, setProfile] = React.useState<Profile>();
  const selected = useAppSelector(selectCurrentHousehold);
  const user = useAppSelector((state) => state.auth.user?.email);

  function getProfile() {
    const profile = selected?.profiles.find((profile) => profile.user.email == user);
    return profile;
  }

  React.useEffect(() => {
    (() => {
      setProfile(getProfile());
      console.log(currentProfile?.name);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 15,
          height: 320,
          width: 320,
          borderRadius: 170,
          backgroundColor: currentProfile?.avatar.color,
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
          {currentProfile?.avatar.icon}
        </Text>
      </View>
      <Text style={styles.title}>{currentProfile?.name}</Text>

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
