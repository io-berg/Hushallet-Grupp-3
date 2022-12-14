import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
import DualBottomButton from "../components/DualBottomButton";
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

  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyHouseholds());
  }, [dispatch]);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={styles.scrollViewStyles}>
        <Portal>
          <Modal
            visible={joinModalVisible}
            onDismiss={() => setJoinModalVisible(false)}
            style={{ ...styles.modal, backgroundColor: theme.colors.background }}
            contentContainerStyle={styles.modalContent}
          >
            <TextInputField
              placeholder="Household Code"
              value={householdCode}
              onChange={setHouseholdCode}
              style={{ marginBottom: 10 }}
            />
            <FullWidthButton
              text="Skicka Ans??kan"
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
            style={{
              ...styles.modal,
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.surface,
              borderWidth: 1,
            }}
            contentContainerStyle={styles.modalContent}
          >
            <TextInputField
              placeholder="Hush??lls namn"
              value={householdName}
              onChange={setHouseholdName}
              style={{ marginBottom: 10 }}
            />
            <FullWidthButton
              text="Skapa Hush??ll"
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
              backgroundColor: theme.colors.surface,
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
            marginBottom: 100,
          }}
        >
          {households?.map((household) => (
            <HouseholdInfo
              key={household.id}
              household={household}
              onPress={() => {
                if (selected?.id !== household.id) {
                  dispatch(setCurrentHousehold({ id: household.id }));
                  setTimeout(() => {
                    navigation.navigate("Home", { screen: "Overview" });
                  }, 200);
                } else {
                  navigation.navigate("Home", { screen: "Overview" });
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <DualBottomButton
          title1="G?? med"
          icon1="account-plus"
          onPress1={() => setJoinModalVisible(true)}
          title2="Skapa"
          icon2="plus"
          onPress2={() => setCreateModalVisible(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  scrollViewStyles: {
    alignItems: "center",
    marginTop: 20,
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
