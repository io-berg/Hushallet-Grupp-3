import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, TouchableRipple } from "react-native-paper";
import OverViewUserButton from "../components/OverviewUserButton";
import { sendApplicationResponse, transferOwnership } from "../store/householdSlice";
import { selectCurrentHousehold, selectCurrentUserProfile } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { textToEmoji } from "../utils/avatar";
import { Application, Profile } from "../utils/type";

export default function HouseholdOverviewScreen() {
  const [selectedProfile, setSelectedProfile] = useState<Profile>();
  const [selectedApplication, setSelectedApplication] = useState<Application>();
  const household = useAppSelector(selectCurrentHousehold);
  const userIsOwner = useAppSelector(selectCurrentUserProfile)?.role === "admin";
  const dispatch = useAppDispatch();
  console.log(household);
  // const applications = household?.applications;

  if (household) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{household.name}</Text>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Hushållskod: {household.code}
          </Text>
        </View>
        <Text style={styles.subtitle}>Dela koden så att andra kan gå med i ditt hushåll</Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 20,
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

        {household.applications.length > 0 && (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                marginTop: 20,
              }}
            >
              Applications
            </Text>
            {household.applications.map((application) => (
              <TouchableRipple
                key={application.id}
                onPress={() => setSelectedApplication(application)}
                rippleColor="lightyellow"
                style={{
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  marginVertical: 5,
                }}
              >
                <Text>{application.username}</Text>
              </TouchableRipple>
            ))}
          </View>
        )}

        {selectedProfile && (
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
              {userIsOwner && (
                <Button
                  style={{
                    marginTop: 10,
                  }}
                  onPress={() => {
                    dispatch(
                      transferOwnership({
                        householdId: household.id,
                        email: selectedProfile.user.email,
                      })
                    );
                    setSelectedProfile(undefined);
                  }}
                >
                  Ge ägarskap av hushållet
                </Button>
              )}
            </Modal>
          </Portal>
        )}
        {userIsOwner && selectedApplication && (
          <Portal>
            <Modal
              visible={selectedApplication !== undefined}
              onDismiss={() => setSelectedApplication(undefined)}
              style={styles.modal}
              contentContainerStyle={styles.modalContent}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {selectedApplication?.username}
              </Text>
              <Text>{selectedApplication?.email}</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onPress={() => {
                    dispatch(sendApplicationResponse({ id: selectedApplication.id, accept: true }));
                    setSelectedApplication(undefined);
                  }}
                >
                  Acceptera
                </Button>
                <Button
                  onPress={() => {
                    dispatch(
                      sendApplicationResponse({ id: selectedApplication.id, accept: false })
                    );
                    setSelectedApplication(undefined);
                  }}
                >
                  Avvisa
                </Button>
              </View>
            </Modal>
          </Portal>
        )}
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
    paddingLeft: 10,
    marginBottom: 10,
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
