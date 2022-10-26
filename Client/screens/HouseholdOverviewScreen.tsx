import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, TouchableRipple, useTheme } from "react-native-paper";
import OverViewUserButton from "../components/OverviewUserButton";
import TextInputField from "../components/TextInputField";
import {
  changeHouseholdName,
  leaveHousehold,
  sendApplicationResponse,
  transferOwnership,
} from "../store/householdSlice";
import { selectCurrentHousehold, selectCurrentUserProfile } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { textToEmoji } from "../utils/avatar";
import { Application, Profile } from "../utils/type";

export default function HouseholdOverviewScreen() {
  const [selectedProfile, setSelectedProfile] = useState<Profile>();
  const [selectedApplication, setSelectedApplication] = useState<Application>();
  const [showNamechangeModal, setShowNamechangeModal] = useState(false);
  const [householdName, setHouseholdName] = useState("");

  const household = useAppSelector(selectCurrentHousehold);
  const currentUserProfile = useAppSelector(selectCurrentUserProfile);
  const userIsOwner = currentUserProfile?.role === "admin";
  const dispatch = useAppDispatch();

  const theme = useTheme();

  useEffect(() => {
    if (household) {
      setHouseholdName(household.name);
    }
  }, [household]);

  if (household) {
    return (
      <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
        <Text style={styles.title}>{household.name}</Text>
        <View
          style={{
            backgroundColor: theme.colors.surface,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: theme.colors.text,
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
              Ansökningar
            </Text>
            {household.applications.map((application) => (
              <TouchableRipple
                key={application.id}
                onPress={() => setSelectedApplication(application)}
                rippleColor="lightyellow"
                style={{
                  borderRadius: 10,
                  backgroundColor: theme.colors.surface,
                  marginVertical: 5,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                  }}
                >
                  {application.username + " (" + application.email + ")"}
                </Text>
              </TouchableRipple>
            ))}
          </View>
        )}

        <Portal>
          {selectedProfile && (
            <Modal
              visible={selectedProfile !== undefined}
              onDismiss={() => setSelectedProfile(undefined)}
              style={{ ...styles.modal, backgroundColor: theme.colors.background }}
              contentContainerStyle={styles.modalContent}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: theme.colors.text,
                }}
              >
                {selectedProfile?.name + " " + textToEmoji(selectedProfile?.avatar.icon)}
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                }}
              >
                {selectedProfile?.user.email}
              </Text>
              {userIsOwner && selectedProfile != currentUserProfile && (
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
          )}
          {userIsOwner && selectedApplication && (
            <Modal
              visible={selectedApplication !== undefined}
              onDismiss={() => setSelectedApplication(undefined)}
              style={{
                backgroundColor: theme.colors.background,
                ...styles.modal,
              }}
              contentContainerStyle={{
                ...styles.modalContent,
              }}
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
          )}
          <Modal
            visible={showNamechangeModal}
            onDismiss={() => setShowNamechangeModal(false)}
            style={{
              backgroundColor: theme.colors.background,
              ...styles.modal,
            }}
            contentContainerStyle={styles.modalContent}
          >
            <TextInputField
              value={householdName}
              onChange={setHouseholdName}
              placeholder="Hushållsnamn"
            />
            <Text>{selectedApplication?.email}</Text>

            <Button
              onPress={() => {
                dispatch(changeHouseholdName({ householdId: household.id, name: householdName }));
                setShowNamechangeModal(false);
              }}
            >
              Acceptera
            </Button>
          </Modal>
        </Portal>
        {userIsOwner ? (
          <Button onPress={() => setShowNamechangeModal(true)}>Byt hushållets namn</Button>
        ) : (
          <Button
            onPress={() => {
              Alert.alert(
                "Är du säker?",
                "Om du lämnar hushållet kommer du inte kunna komma åt det igen.",
                [
                  {
                    text: "Avbryt",
                    style: "cancel",
                  },
                  {
                    text: "Lämna hushållet",
                    onPress: () => dispatch(leaveHousehold(household.id)),
                  },
                ]
              );
            }}
          >
            Lämna hushållet
          </Button>
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
    margin: 20,
    borderRadius: 20,
    height: 160,
    marginTop: "50%",
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
