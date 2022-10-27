import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, View } from "react-native";
import { useTheme } from "react-native-paper";
import TaskForm from "../components/TaskForm";
import { RootStackParamList } from "../navigation/RootNavigator";
import { deleteTask, editTask } from "../store/householdSlice";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Task } from "../utils/type";

type Props = NativeStackScreenProps<RootStackParamList, "EditTask">;

const EditTaskScreen = ({ navigation, route }: Props) => {
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
      <TaskForm
        onSubmit={onSubmit}
        onDelete={onDelete}
        onCancel={() => navigation.goBack()}
        editTask={task}
      />
    </View>
  );
};

export default EditTaskScreen;
