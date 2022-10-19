import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import FullWidthButton from "../components/FullWidthButton";
import HouseholdInfo from "../components/HouseholdInfo";
import TextInputField from "../components/TextInputField";
import { RootStackParamList } from "../navigation/RootNavigator";
import { fetchMyHouseholds, setCurrentHousehold } from "../store/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "Start">;

export default function StartScreen({ navigation }: Props) {
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [householdCode, setHouseholdCode] = useState("");

  const households = useAppSelector((state) => state.household.households);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyHouseholds());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={joinModalVisible}
          onDismiss={() => setJoinModalVisible(false)}
          style={styles.modal}
          contentContainerStyle={styles.modalContent}
        >
          <TextInputField
            placeholder="Household Code"
            value={householdCode}
            onChange={setHouseholdCode}
            style={{ marginBottom: 10 }}
          />
          <FullWidthButton
            text="Skicka Ansökan"
            onPress={() => {
              console.log("Joining household with code: " + householdCode);
            }}
          />
        </Modal>
      </Portal>
      <Image
        source={require("../assets/logo.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
      {households?.map((household) => (
        <HouseholdInfo
          key={household.id}
          household={household}
          onPress={() => dispatch(setCurrentHousehold({ id: household.id }))}
        />
      ))}
      <Button title="home" onPress={() => navigation.navigate("Home")} />

      <View
        style={{
          marginTop: "auto",
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "space-evenly",
        }}
      >
        <Button title="Gå med" onPress={() => setJoinModalVisible(true)} />
        <Button title="Skapa" onPress={() => console.log("Skapa hushåll")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    gap: 10,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
  errors: {
    width: "100%",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    height: 160,
    marginTop: "50%",
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
