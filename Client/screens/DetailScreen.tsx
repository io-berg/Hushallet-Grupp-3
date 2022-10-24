import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import HomeCard from "../components/HomeCard";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailScreen({ navigation }: Props) {
  const household = useAppSelector(selectCurrentHousehold);
  return (
    <View style={styles.container}>
      <FlatList
        data={household?.tasks}
        renderItem={({ item }) => (
          <HomeCard>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.beskrivning}>Beskrivning:</Text>
            <Text>{item.description}</Text>
            <Text style={styles.inputtext1}>Återkommer</Text>
            <Text style={styles.inputtext2}>Värde</Text>
            <Text>
              <Text style={styles.button1}>fake button ett....................... </Text>
              <Text style={styles.button2}>......................fake button två</Text>
            </Text>
            <Button onPress={() => navigation.navigate("EditTask", { taskId: item.id })}>
              Redigera
            </Button>
          </HomeCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,

    // fontWeight: "bold",
  },
  beskrivning: {
    fontSize: 15,
    fontWeight: "bold",
  },
  inputtext1: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    marginTop: 50,
    padding: 10,
  },
  inputtext2: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 150,
    padding: 10,
  },
  button1: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "red",
    justifyContent: "space-between",
  },
  button2: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "red",
    justifyContent: "space-between",
    marginLeft: 50,
  },
});
