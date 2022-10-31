import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Paragraph, Portal, Text, useTheme } from "react-native-paper";
import DualBottomButton from "../components/DualBottomButton";
import EffortPicker from "../components/EffortPicker";
import FrequencyPicker from "../components/FrequencyPicker";
import FullWidthButton from "../components/FullWidthButton";
import { RootStackParamList } from "../navigation/RootNavigator";
import { createTaskHistoryItem, deleteTask } from "../store/householdSlice";
import { selectCurrentHousehold, selectCurrentUserProfile } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Task } from "../utils/type";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailScreen({ navigation, route }: Props) {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const household = useAppSelector(selectCurrentHousehold);
  const taskId = route.params.taskId;
  const task = useAppSelector(selectCurrentHousehold)?.tasks.find((t) => t.id === taskId);
  const currentUserProfile = useAppSelector(selectCurrentUserProfile);
  const dispatch = useAppDispatch();
  const isUserAdmin = useAppSelector(selectCurrentUserProfile)?.role === "admin";

  const theme = useTheme();

  function onDelete(editedTask: Task) {
    if (household?.id && task?.id) {
      dispatch(deleteTask({ householdId: household.id, task: editedTask }));
      navigation.navigate("Home", { screen: "Overview" });
    }
  }

  function onSubmit() {
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
  }

  if (task) {
    return (
      <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
        <Portal>
          <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
            <Paragraph>Är du säker på att du vill radera denna sysla?</Paragraph>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  if (task) {
                    onDelete(task);
                  }
                }}
              >
                Ok
              </Button>
              <Button onPress={hideDialog}>Avbryt</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

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

        <View
          style={{
            marginTop: 15,
            marginLeft: 20,
          }}
        >
          <FullWidthButton onPress={onSubmit} text={"Markera som klar"}></FullWidthButton>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flex: 1,
          }}
        >
          {isUserAdmin && (
            <DualBottomButton
              title1="Ändra"
              icon1="pen"
              title2="Radera"
              icon2="close-circle-outline"
              onPress1={() => {
                if (currentUserProfile?.role == "admin") {
                  navigation.navigate("EditTask", { taskId });
                }
              }}
              onPress2={() => {
                setVisible(true);
              }}
            />
          )}
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
  dialog: {
    alignItems: "center",
    paddingTop: 15,
  },
});
