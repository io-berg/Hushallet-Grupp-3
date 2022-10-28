import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface Props {
  days: number;
  overDue?: boolean;
}

const DaysCircle = ({ days, overDue }: Props) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: overDue ? "#cd5d6f" : theme.colors.background,
        borderRadius: 25,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 15,
          color: overDue ? "white" : theme.colors.text,
        }}
      >
        {/* can be below if emulator time is off  */}
        {days < 0 ? 0 : days}
      </Text>
    </View>
  );
};

export default DaysCircle;
