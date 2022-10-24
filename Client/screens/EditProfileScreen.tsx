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
import { selectCurrentHousehold } from "../store/selectors";
import { current } from "@reduxjs/toolkit";

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;

export default function EditProfileScreen({ navigation, route }: Props) {
  const [availibleAvatars, setState] = React.useState<avatar[] | null>(null);
  const [profileName, setProfileName] = React.useState("");
  const [profileAvatar, setProfileAvatar] = React.useState<avatar | null>(null);
  const [id, setId] = React.useState<number | undefined>();

  const selected = useAppSelector(selectCurrentHousehold);
  setId(selected?.id);
  const curretnProfile = useAppSelector((state) => state.household.profile);
  setState(avatars);

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (profileAvatar && profileName && id) {
      const profile: Profile = {
        id: curretnProfile.id,
        user: curretnProfile.user,
        role: curretnProfile.role,
        name: profileName,
        avatar: profileAvatar,
      };

      dispatch(updateProfile({ profile, id }));
      navigation.navigate("Profile");
    }
  };

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
          data={availibleAvatars}
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
