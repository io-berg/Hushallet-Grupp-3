import React from "react";
import { Button, Text, useTheme } from "react-native-paper";

interface Props {
  onPress: () => void;
  text: string;
  icon?: string;
  disabled?: boolean;
}

const FullWidthButton = ({ text, icon, onPress, disabled }: Props) => {
  const theme = useTheme();
  return (
    <Button
      icon={icon}
      disabled={disabled}
      onPress={onPress}
      mode="elevated"
      style={{
        width: "92%",
        shadowColor: "black",
        backgroundColor: theme.colors.surface,
        elevation: 5,
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 18,
        }}
      >
        {text}
      </Text>
    </Button>
  );
};

export default FullWidthButton;
