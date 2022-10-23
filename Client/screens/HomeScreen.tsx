import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeCard from "../components/HomeCard";
import { RootStackParamList } from "../navigation/RootNavigator";
import { logout } from "../store/authSlice";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectCurrentHousehold);
  const username = useAppSelector((state) => state.auth.user?.username);
  const email = useAppSelector((state) => state.auth.user?.email);
  const selected = useAppSelector(selectCurrentHousehold);
  const current = useAppSelector((state) => state.household.current);
  console.log("current", current);
  console.log("selected", selected);

  return (
    <View style={styles.container}>
      <FlatList
        data={household?.tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detalj")}>
            <HomeCard>
              <Text>{item.title}</Text>
            </HomeCard>
          </TouchableOpacity>
        )}
      />
      <Text>Home Screen</Text>
      <Button title="Go to login" onPress={() => navigation.navigate("Login")} />

      <Text>{username}</Text>
      <Text>{email}</Text>

      <Button title="Logout" onPress={() => dispatch(logout())} />
      <Text>Household: {household?.name}</Text>

      <Button title="Profile" onPress={() => navigation.navigate("Profile")}></Button>
      <Button title="ProfileCreate" onPress={() => navigation.navigate("SkapaProfil")}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
