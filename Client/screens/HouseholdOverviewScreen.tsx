import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import OverViewUserButton from "../components/OverviewUserButton";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppSelector } from "../store/store";
import { textToEmoji } from "../utils/avatar";
import { Profile } from "../utils/type";

export default function HouseholdOverviewScreen() {
  const [selectedProfile, setSelectedProfile] = useState<Profile>();
  const household = useAppSelector(selectCurrentHousehold);

  if (household) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{household.name}</Text>

        <Text
          style={{
            fontSize: 20,
          }}
        >
          Medlemmar
        </Text>
        {household.profiles.map((profile) => (
          <OverViewUserButton
            profile={profile}
            key={profile.id}
            onClick={() => setSelectedProfile(profile)}
          />
        ))}
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {household.code}
          </Text>
        </View>
        <Text style={styles.subtitle}>Ge ut koden till de som delar hushåll</Text>

        <Portal>
          <Modal
            visible={selectedProfile !== undefined}
            onDismiss={() => setSelectedProfile(undefined)}
            style={styles.modal}
            contentContainerStyle={styles.modalContent}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {selectedProfile?.name + " " + textToEmoji(selectedProfile?.avatar.icon)}
            </Text>
            <Text>{selectedProfile?.user.email}</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                justifyContent: "space-between",
              }}
            >
              <Button>Befodra till ägare</Button>
              <Button>Ta bort från hushåll</Button>
            </View>
          </Modal>
        </Portal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No household selected</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
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
