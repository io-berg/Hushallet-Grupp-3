import React from "react";
import { Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface Props {
  onPress: () => void;
  buttonColor: string;
  icon: string;
  disabled?: boolean;
  selected: boolean;
}

const AvatarButton = ({ buttonColor, icon, onPress, disabled, selected }: Props) => {
  const color = disabled ? "grey" : buttonColor;

  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        margin: 5,
        borderRadius: 55,
        height: 75,
        width: 75,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: selected ? 3 : 0,
        borderColor: theme.colors.accent,
      }}
      disabled={disabled}
    >
      <Text
        style={{
          fontSize: 35,
          color: disabled ? "#22222299" : "",
        }}
      >
        {icon}
      </Text>
    </Pressable>
  );
};

export default AvatarButton;
