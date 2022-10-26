import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectCurrentHousehold, selectCurrentUserProfile } from "../store/selectors";
import { useAppSelector } from "../store/store";
import FrequencyPicker from "../components/FrequencyPicker";
import EffortPicker from "../components/EffortPicker";
import DualBottomButton from "../components/DualBottomButton";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailScreen({ navigation, route }: Props) {
  const household = useAppSelector(selectCurrentHousehold);
  const taskId = route.params.taskId;
  const task = useAppSelector(selectCurrentHousehold)?.tasks.find((t) => t.id === taskId);
  const currentUserProfile = useAppSelector(selectCurrentUserProfile);

  function onSubmit() {}

  if (task) {
    return (
      <View style={styles.container}>
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
          <FrequencyPicker value={task?.frequency} bool={true} />
        </View>
        <View
          style={{
            paddingVertical: 10,
            marginLeft: 20,
          }}
        >
          <EffortPicker value={task?.effort} bool={true} />
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
            onPress2={() => onCancel()}
          />
        </View>
      </View>
    );
  }
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
