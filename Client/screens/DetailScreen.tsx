import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import DualBottomButton from "../components/DualBottomButton";
import EffortPicker from "../components/EffortPicker";
import FrequencyPicker from "../components/FrequencyPicker";
import { RootStackParamList } from "../navigation/RootNavigator";
import { createTaskHistoryItem } from "../store/householdSlice";
import { selectCurrentHousehold, selectCurrentUserProfile } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailScreen({ navigation, route }: Props) {
  const household = useAppSelector(selectCurrentHousehold);
  const taskId = route.params.taskId;
  const task = useAppSelector(selectCurrentHousehold)?.tasks.find((t) => t.id === taskId);
  const currentUserProfile = useAppSelector(selectCurrentUserProfile);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  if (task) {
    return (
      <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
        <Text style={styles.title}>{task?.title}</Text>
        <View
          style={{
            paddingVertical: 20,
          }}
        />
        <Text style={styles.beskrivning}>Beskrivning:</Text>
        <Text style={styles.description}>{task?.description}</Text>
        <View
          style={{
            paddingVertical: 30,
          }}
        />

        <View
          style={{
            paddingVertical: 20,
            marginLeft: 20,
          }}
        >
          <FrequencyPicker value={task?.frequency} />
        </View>
        <View
          style={{
            paddingVertical: 10,
            marginLeft: 20,
          }}
        >
          <EffortPicker value={task?.effort} />
        </View>

        <Button onPress={() => navigation.navigate("EditTask", { taskId: taskId })}>
          Redigera
        </Button>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            flex: 1,
          }}
        >
          <DualBottomButton
            title1="Ändra"
            icon1="pen"
            title2="Klar"
            icon2="close-circle-outline"
            onPress1={() => navigation.navigate("EditTask", { taskId })}
            onPress2={() => {
              if (household && currentUserProfile) {
                dispatch(
                  createTaskHistoryItem({
                    householdId: household.id,
                    taskId: taskId,
                    taskHistory: {
                      id: 0,
                      profileId: currentUserProfile.id,
                      date: new Date().toISOString(),
                    },
                  })
                );
                navigation.navigate("Home", { screen: "Overview" });
              }
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingen uppgift hittades</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    height: "100%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
  },
  beskrivning: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 5,
  },
  description: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
  },
});

//
