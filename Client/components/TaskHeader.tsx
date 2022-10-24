import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";

interface Props {
  title: string;
}

const TaskHeader = ({ title }: Props) => {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.surface,
        height: 35,
        paddingBottom: 10,
        elevation: 4,
        width: "100%",
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default TaskHeader;
