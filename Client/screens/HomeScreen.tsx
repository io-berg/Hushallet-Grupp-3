import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeCard from "../components/HomeCard";
import TaskHeader from "../components/TaskHeader";
import { logout } from "../store/authSlice";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectCurrentHousehold);
  const username = useAppSelector((state) => state.auth.user?.username);
  const email = useAppSelector((state) => state.auth.user?.email);
  const selected = useAppSelector(selectCurrentHousehold);
  const current = useAppSelector((state) => state.household.current);
  console.log("current", current);
  console.log("selected", selected);
  const [test, setTest] = useState([
    { title: "Laga mat" },
    { title: "Damma" },
    { title: "Diska" },
    { title: "Ta hand om My" },
    { title: "Torka golvet" },
    { title: "Vattna blommor" },
  ]);

  return (
    <View style={styles.container}>
      <TaskHeader title="Idag" />
      <FlatList
        data={test}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detalj", item)}>
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
