import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import AvatarButton from "../components/AvatarButtonComponent";
import FullWidthButton from "../components/FullWidthButton";
import TextInputField from "../components/TextInputField";
import { RootStackParamList } from "../navigation/RootNavigator";
import { updateProfile } from "../store/householdSlice";
import { selectCurrentHousehold, selectCurrentUserProfile } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { availibleAvatars } from "../utils/avatar";
import avatars from "../utils/mockdata";
import { Avatar as avatar } from "../utils/type";

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;

// TODO: Fix validation

export default function EditProfileScreen({ navigation }: Props) {
  const [profileName, setProfileName] = React.useState("");
  const [profileAvatar, setProfileAvatar] = React.useState<avatar | null>(null);
  const [isAvatarToken, setAvatars] = React.useState<string[] | null>(null);

  const selected = useAppSelector(selectCurrentHousehold);
  const currentUserProfile = useAppSelector(selectCurrentUserProfile);
  const theme = useTheme();

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (currentUserProfile && selected) {
      setAvatars(availibleAvatars(selected));
    }
  }, [currentUserProfile, selected]);

  const handleSubmit = () => {
    if (currentUserProfile != null && selected != null && profileAvatar != null) {
      const profileId = currentUserProfile?.id;
      const name = profileName;
      const icon = profileAvatar.icon;
      const color = profileAvatar.color;
      const householdId = selected?.id;

      dispatch(updateProfile({ profileId, name, icon, color, householdId }));

      navigation.navigate("Profile");
    }
  };

  function isAvatarAvailible(item: string) {
    return (
      isAvatarToken?.find((a) => {
        return a === item && currentUserProfile?.avatar.icon !== item;
      }) != null
    );
  }

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <Image
        source={require("../assets/logo.png")}
        style={{
          marginTop: 15,
          width: 200,
          height: 200,
        }}
      />
      <Text style={styles.title}>Ange ditt namn: </Text>
      <TextInputField value={profileName} onChange={setProfileName} placeholder={"Name"} />
      <Text style={styles.title}>Välj din avatar: </Text>

      <View
        style={{
          alignContent: "center",
          alignItems: "stretch",
        }}
      >
        <FlatList
          data={avatars}
          numColumns={4}
          style={styles.flatList}
          renderItem={({ item }) => (
            <AvatarButton
              buttonColor={item.color}
              icon={item.icon}
              onPress={() => setProfileAvatar(item)}
              selected={profileAvatar?.icon == item.icon}
              disabled={isAvatarAvailible(item.icon)}
            />
          )}
        />
        <View
          style={{
            alignContent: "center",
            marginLeft: 35,
          }}
        >
          <FullWidthButton onPress={() => handleSubmit()} text={"Spara ändringar"} />
        </View>
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
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  flatList: {
    marginTop: 15,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    maxHeight: 200,
  },
  input: {
    marginTop: 15,
    fontWeight: "bold",
  },
  avatarList: {
    marginTop: 20,
  },
});
