import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import TaskForm from "../components/TaskForm";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "CreateTask">;

const CreateTaskScreen = ({ navigation }: Props) => {
  function onSubmit() {
    console.log("Submitted");
    navigation.navigate("Home");
  }

  return (
    <View>
      <TaskForm onSubmit={onSubmit} onCancel={() => navigation.goBack()} />
    </View>
  );
};

export default CreateTaskScreen;
