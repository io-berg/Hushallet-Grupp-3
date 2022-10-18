import React from "react";
import { Button, Text } from "react-native-paper";

interface Props {
  onPress: () => void;
  text: string;
  icon?: string;
  disabled?: boolean;
}

const FullWidthButton = ({ text, icon, onPress, disabled }: Props) => {
  return (
    <Button
      icon={icon}
      disabled={disabled}
      onPress={onPress}
      mode="elevated"
      style={{
        width: "92%",
        shadowColor: "black",
        backgroundColor: "#ffff",
        elevation: 5,
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 18,
        }}
      >
        {text}
      </Text>
    </Button>
  );
};

export default FullWidthButton;
