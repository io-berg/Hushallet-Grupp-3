import * as React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Avatar as avatar } from "../utils/type";
import avatars from "../utils/mockdata";
import { TextInput, Button } from "react-native-paper";
import AvatarItem from "../components/avatarListComponent";

type Props = NativeStackScreenProps<RootStackParamList, "CreateProfileScreen">;

export default function CreateProfileScreen({ navigation, route }: Props) {
  const [availibleAvatars, setState] = React.useState<avatar[] | null>(null);

  React.useEffect(() => {
    (() => {
      setState(avatars);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ange ditt namn: </Text>
      <TextInput label="Email" />

      <View style={styles.avatarList}>
        <FlatList
          data={availibleAvatars}
          numColumns={4}
          renderItem={({ item }) => (
            <Text>
              <AvatarItem id={item.id} color={item.color} icon={item.icon} token={item.token} />
            </Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 50,
    alignContent: "stretch",
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginTop: 15,

    fontWeight: "bold",
  },
  avatarList: {
    marginHorizontal: "auto",
    alignContent: "stretch",
  },
});
