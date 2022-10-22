import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { textToEmoji } from "../utils/avatar";
import theme from "../utils/theme";
import { Household } from "../utils/type";

interface Props {
  household: Household;
  onPress?: () => void;
}

const HouseholdInfo = ({ household, onPress }: Props) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{household.name}</Text>
        <Pressable
          onPress={() => setCollapsed(!collapsed)}
          style={{
            alignSelf: "center",
            padding: 10,
          }}
        >
          <MaterialIcons name={collapsed ? "expand-more" : "expand-less"} size={24} color="black" />
        </Pressable>
      </View>
      {collapsed ||
        household.profiles.map((p) => (
          <View key={p.id} style={styles.container}>
            <Text style={styles.smallText}>{p.name}</Text>
            <Text style={styles.text}>{textToEmoji(p.avatar.icon?.toLocaleLowerCase())}</Text>
          </View>
        ))}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.colors.surface,
    flexDirection: "row",
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
  wrapper: {
    display: "flex",
    backgroundColor: theme.colors.surface,
    elevation: 1,
    width: "92%",
    borderRadius: 10,
    flexDirection: "column",
    marginTop: 10,
  },
  smallText: {
    fontSize: 18,
    padding: 10,
  },
});

export default HouseholdInfo;
