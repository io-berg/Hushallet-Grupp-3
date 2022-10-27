import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { subDays } from "date-fns/fp";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import DaysCircle from "../components/DaysCircle";
import DualBottomButton from "../components/DualBottomButton";
import HomeCard from "../components/HomeCard";
import TaskHeader from "../components/TaskHeader";
import { RootStackParamList } from "../navigation/RootNavigator";
import { TabsParamList } from "../navigation/TabsNavigator";
import { selectCurrentHousehold, selectCurrentUserProfile } from "../store/selectors";
import { useAppSelector } from "../store/store";
import { Profile, Task } from "../utils/type";

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<TabsParamList, "Overview">,
  NativeStackScreenProps<RootStackParamList, "Home">
>;

export default function HomeScreen({ navigation }: Props) {
  const household = useAppSelector(selectCurrentHousehold);
  const profiles = household?.profiles ?? [];
  const isUserAdmin = useAppSelector(selectCurrentUserProfile)?.role === "admin";

  const theme = useTheme();

  function getIcons(task: Task, profiles: Profile[]) {
    const today = new Date();

    const itemsWithinDate = task.taskHistory?.filter((historyItem) => {
      const date = new Date(historyItem.date);
      if (date >= subDays(task.frequency, today)) {
        return true;
      }
      return false;
    });

    const icons = itemsWithinDate.map((historyItem) => {
      if (new Date(historyItem.date).getDate() == today.getDate()) {
        const profile = profiles.find((profile) => profile.id === historyItem.profileId);
        return profile?.avatar.icon;
      }
    });

    const filteredIcons = icons.filter((icon) => icon !== undefined);

    if (filteredIcons.length > 0) {
      const filtered = new Set(icons);
      return (
        <Text
          style={{
            fontSize: 22,
          }}
        >
          {filtered}
        </Text>
      );
    }

    const length = task.taskHistory?.length;
    if (length) {
      const lastFinished = task.taskHistory[length - 1];
      let daysBetween: number;
      if (lastFinished) {
        const lastCompleatedDate = new Date(lastFinished.date);
        daysBetween = Math.floor(
          (today.getTime() - lastCompleatedDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysBetween > task.frequency) {
          return <DaysCircle days={daysBetween} overDue />;
        }

        return <DaysCircle days={daysBetween} />;
      }
    }

    const daysSinceTaskCreated = Math.floor(
      (today.getTime() - new Date(task.createdDateTask).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceTaskCreated > task.frequency) {
      return <DaysCircle days={daysSinceTaskCreated} overDue />;
    }

    return <DaysCircle days={daysSinceTaskCreated} />;
  }

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <TaskHeader title="Idag" />
      <FlatList
        data={household?.tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", { taskId: item.id })}>
            <HomeCard>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>
                {getIcons(item, profiles)}
              </View>
            </HomeCard>
          </TouchableOpacity>
        )}
      />
      {isUserAdmin && (
        <DualBottomButton
          title1="Lägg till"
          icon1="plus"
          onPress1={() => navigation.navigate("CreateTask")}
          title2="Ändra"
          icon2="pencil"
          onPress2={() => navigation.navigate("Profile")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
