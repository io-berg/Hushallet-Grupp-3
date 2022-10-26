import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeCard from "../components/HomeCard";
import TaskHeader from "../components/TaskHeader";
import { RootStackParamList } from "../navigation/RootNavigator";
import { TabsParamList } from "../navigation/TabsNavigator";
import { logout } from "../store/authSlice";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<TabsParamList, "Overview">,
  NativeStackScreenProps<RootStackParamList, "Home">
>;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectCurrentHousehold);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      <TaskHeader title="Idag" />
      <FlatList
        data={household?.tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", { taskId: item.id })}>
            <HomeCard>
              <Text>{item.title}</Text>
            </HomeCard>
          </TouchableOpacity>
        )}
      />
      <Text>Home Screen</Text>
      <Button title="Go to login" onPress={() => navigation.navigate("Login")} />

      <Text>{user?.username}</Text>
      <Text>{user?.email}</Text>

      <Button title="Logout" onPress={() => dispatch(logout())} />
      <Text>Household: {household?.name}</Text>
      <Button title="New task" onPress={() => navigation.navigate("CreateTask")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
