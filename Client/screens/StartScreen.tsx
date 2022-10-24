import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import FullWidthButton from "../components/FullWidthButton";
import HouseholdInfo from "../components/HouseholdInfo";
import TextInputField from "../components/TextInputField";
import { RootStackParamList } from "../navigation/RootNavigator";
import {
  createHousehold,
  fetchMyHouseholds,
  sendApplication,
  setCurrentHousehold,
} from "../store/householdSlice";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "Start">;

export default function StartScreen({ navigation }: Props) {
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [householdCode, setHouseholdCode] = useState("");
  const [householdName, setHouseholdName] = useState("");

  const households = useAppSelector((state) => state.household.households);
  const fetchInfo = useAppSelector((state) => state.household.fetchInfo);
  const selected = useAppSelector(selectCurrentHousehold);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyHouseholds());
  }, [dispatch]);

  useEffect(() => {
    if (selected) {
      navigation.navigate("Home");
    }
  }, [selected, navigation]);

  return (
    <ScrollView
      style={{
        height: "100%",
      }}
    >
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
                dispatch(sendApplication({ code: householdCode }));
                setJoinModalVisible(false);
              }}
            />
          </Modal>
        </Portal>
        <Portal>
          <Modal
            visible={createModalVisible}
            onDismiss={() => setCreateModalVisible(false)}
            style={styles.modal}
            contentContainerStyle={styles.modalContent}
          >
            <TextInputField
              placeholder="Hushålls namn"
              value={householdName}
              onChange={setHouseholdName}
              style={{ marginBottom: 10 }}
            />
            <FullWidthButton
              text="Skapa Hushåll"
              onPress={() => {
                dispatch(createHousehold({ name: householdName }));
                setCreateModalVisible(false);
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
        {fetchInfo && (
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: fetchInfo.type === "error" ? theme.colors.error : "green",
              }}
            >
              {fetchInfo.message}
            </Text>
          </View>
        )}
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          {households?.map((household) => (
            <HouseholdInfo
              key={household.id}
              household={household}
              onPress={() => {
                if (selected?.id !== household.id) {
                  dispatch(setCurrentHousehold({ id: household.id }));
                } else {
                  navigation.navigate("Home");
                }
              }}
            />
          ))}
        </View>

        <View
          style={{
            marginTop: "auto",
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "space-evenly",
          }}
        >
          <Button title="Gå med" onPress={() => setJoinModalVisible(true)} />
          <Button title="Skapa" onPress={() => setCreateModalVisible(true)} />
        </View>
      </View>
    </ScrollView>
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
