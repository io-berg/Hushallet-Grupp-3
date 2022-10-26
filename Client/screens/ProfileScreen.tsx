import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import DualBottomButton from "../components/DualBottomButton";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectCurrentUserProfile } from "../store/selectors";
import { useAppSelector } from "../store/store";
import { Profile } from "../utils/type";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const [profile, setProfile] = React.useState<Profile | null>();
  const currentUserProfile = useAppSelector(selectCurrentUserProfile);

  const theme = useTheme();

  React.useEffect(() => {
    if (currentUserProfile) {
      setProfile(currentUserProfile);
    }
  }, [currentUserProfile]);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
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
          {profile?.avatar.icon}
        </Text>
      </View>
      <Text style={styles.title}>{profile?.name}</Text>
      <View
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <DualBottomButton
          title1="Mina hushåll"
          onPress1={() => navigation.navigate("Start")}
          title2="Redigera"
          onPress2={() => navigation.navigate("EditProfile")}
        />
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
    fontSize: 45,
    fontWeight: "bold",
  },
  icon: {
    marginTop: 15,
    fontSize: 200,
    fontWeight: "bold",
  },
});
