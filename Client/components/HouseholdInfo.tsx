import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useAppSelector } from "../store/store";
import theme from "../utils/theme";
import { Household } from "../utils/type";

interface Props {
  household: Household;
  onPress?: () => void;
}

const HouseholdInfo = ({ household, onPress }: Props) => {
  const me = useAppSelector((state) => state.auth.user);
  const userIcon = household.profiles.find((profile) => profile.user.username == me?.username)
    ?.avatar.icon;

  function emoji(animal = "") {
    switch (animal) {
      case "chicken":
        return "🐥";
      case "squid":
        return "🐙";
      case "whale":
        return "🐋";
      case "owl":
        return "🦉";
      case "fox":
        return "🦊";
      case "unicorn":
        return "🦄";
      case "pig":
        return "🐷";
      case "frog":
        return "🐸";
      default:
        return "";
    }
  }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{household.name}</Text>
      <Text style={styles.text}>{emoji(userIcon)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.surface,
    elevation: 5,
    width: "92%",
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
});

export default HouseholdInfo;
