import * as React from "react";
import { Image, View, Text, StyleSheet, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Avatar as avatar, Household, Profile } from "../utils/type";
import avatars from "../utils/mockdata";
import AvatarButton from "../components/AvatarButtonComponent";
import TextInputField from "../components/TextInputField";
import FullWidthButton from "../components/FullWidthButton";
import { useAppDispatch, useAppSelector } from "../store/store";
import { updateProfile } from "../store/householdSlice";
import { selectCurrentHousehold, selectCurrentUserProfile } from "../store/selectors";

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;

export default function EditProfileScreen({ navigation, route }: Props) {
  const [profileName, setProfileName] = React.useState("");
  const [profileAvatar, setProfileAvatar] = React.useState<avatar | null>(null);

  const selected = useAppSelector(selectCurrentHousehold);
  const currentUserProfile = useAppSelector(selectCurrentUserProfile);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (currentUserProfile && selected) {
      setProfileName(currentUserProfile.name);
      setProfileAvatar(currentUserProfile.avatar);
    }
  }, [currentUserProfile, selected]);

  const handleSubmit = () => {
    if (
      currentUserProfile != null &&
      currentUserProfile != undefined &&
      selected != null &&
      selected != undefined &&
      profileAvatar != null &&
      profileAvatar != undefined
    ) {
      const profile: Profile = {
        id: currentUserProfile?.id,
        user: currentUserProfile?.user,
        role: currentUserProfile?.role,
        name: profileName,
        avatar: profileAvatar,
      };
      const id = selected?.id;

      dispatch(updateProfile({ profile, id }));
      navigation.navigate("Profile");
    }
  };

  if (currentUserProfile && selected) {
    return (
      <View style={styles.container}>
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
                disabled={item.token}
              />
            )}
          />
          <View
            style={{
              alignContent: "center",
              marginLeft: 35,
            }}
          >
            <FullWidthButton onPress={() => handleSubmit()} text={"Skapa profil"} />
          </View>
        </View>
      </View>
    );
  }
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
