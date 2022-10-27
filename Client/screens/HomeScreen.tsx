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
import { selectCurrentHousehold, selectCurrentUserProfile } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Profile, Task } from "../utils/type";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<TabsParamList, "Overview">,
  NativeStackScreenProps<RootStackParamList, "Home">
>;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectCurrentHousehold);
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector(selectCurrentUserProfile);
  const [profiles, setProfile] = React.useState<Profile | null>();

  function Klar(item: Task) {
    if (profiles != null && item) {
      const taskhistory = item.taskHistory?.find((i) => i.profileId == profiles.id);
      console.log(taskhistory);
      console.log(item.createdDateTask);

      if (taskhistory) {
        console.log(profiles?.avatar.icon);
        return profiles?.avatar.icon;
      } else taskhistory == null;
      {
        // const dateDifferens = formatDistance(subDays(new Date(), 3), new Date(item.date), {
        //   addSuffix: true,
        // });
        // console.log(dateDifferens);
      }
    }
  }

  React.useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile]);

  // function Klar(item: Task) {}

  return (
    <View style={styles.container}>
      <TaskHeader title="Idag" />
      <FlatList
        data={household?.tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", { taskId: item.id })}>
            <HomeCard>
              <Text>
                <Button title="123" onPress={() => console.log(item.taskHistory)} />
                {item.title} {Klar(item)}
              </Text>
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
