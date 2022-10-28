import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function HomeCard(props: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <View style={{ ...styles.card, backgroundColor: theme.colors.surface }}>
      <View style={styles.cardcontent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
  },
  cardcontent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
});
