import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import TaskForm from "../components/TaskForm";
import { RootStackParamList } from "../navigation/RootNavigator";
import { createTask } from "../store/householdSlice";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Task } from "../utils/type";

type Props = NativeStackScreenProps<RootStackParamList, "CreateTask">;

const CreateTaskScreen = ({ navigation }: Props) => {
  const householdId = useAppSelector(selectCurrentHousehold)?.id;
  const dispatch = useAppDispatch();

  function onSubmit(task: Task) {
    if (householdId) {
      dispatch(createTask({ task, householdId }));
      navigation.navigate("Home");
    }
  }

  return (
    <View>
      <TaskForm onSubmit={onSubmit} onCancel={() => navigation.goBack()} />
    </View>
  );
};

export default CreateTaskScreen;
