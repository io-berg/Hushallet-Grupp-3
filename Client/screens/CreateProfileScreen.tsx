import * as React from "react";
import { Image, View, Text, StyleSheet, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Avatar as avatar } from "../utils/type";
import AvatarItem from "../components/avatarListComponent";
import TextInputField from "../components/TextInputField";
import FullWidthButton from "../components/FullWidthButton";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "CreateProfileScreen">;

export default function CreateProfileScreen({ navigation, route }: Props) {
  const [availibleAvatars, setState] = React.useState<avatar[] | null>(null);
  const [profileName, setProfileName] = React.useState("");
  const [profileAvatar, setProfileAvatar] = React.useState<avatar | null>(null);

  const household = useAppSelector((state) => state.household[0]);

  React.useEffect(() => {
    (() => {
      setState(household.avatars);
    })();
  }, []);

  const handleSubmit = (name: string, icon: string) => {
    //save new profile
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
            <AvatarItem
              buttonColor={item.color}
              icon={item.icon}
              onPress={() => setProfileAvatar(item)}
            />
          )}
        />
        <View
          style={{
            alignContent: "center",
            marginLeft: 35,
          }}
        >
          <FullWidthButton
            onPress={() => handleSubmit(profileAvatar, profileName)}
            text={"Skapa profil"}
          />
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
