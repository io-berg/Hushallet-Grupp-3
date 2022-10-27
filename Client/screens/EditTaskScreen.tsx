import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Dialog, Paragraph, Portal, Button } from "react-native-paper";
import TaskForm from "../components/TaskForm";
import { RootStackParamList } from "../navigation/RootNavigator";
import { deleteTask, editTask } from "../store/householdSlice";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Task } from "../utils/type";

type Props = NativeStackScreenProps<RootStackParamList, "EditTask">;

const EditTaskScreen = ({ navigation, route }: Props) => {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const householdId = useAppSelector(selectCurrentHousehold)?.id;
  const dispatch = useAppDispatch();

  const taskId = route.params.taskId;
  const task = useAppSelector(selectCurrentHousehold)?.tasks.find((t) => t.id === taskId);

  const theme = useTheme();

  function onSubmit(editedTask: Task) {
    if (householdId && task?.id) {
      dispatch(editTask({ householdId: householdId, task: editedTask }));
      navigation.navigate("Home", { screen: "Overview" });
    }
  }

  function onDelete(editedTask: Task) {
    if (householdId && task?.id) {
      dispatch(deleteTask({ householdId: householdId, task: editedTask }));
      navigation.navigate("Home", { screen: "Overview" });
    }
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
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
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View
        style={{
          paddingVertical: 10,
        }}
      >
        <Button onPress={() => setVisible(true)}> Radera Syssla </Button>
      </View>
      <TaskForm onSubmit={onSubmit} onCancel={() => navigation.goBack()} editTask={task} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    alignItems: "center",
    height: "100%",
  },
  dialog: {
    alignItems: "center",
    paddingTop: 15,
  },
});

export default EditTaskScreen;
