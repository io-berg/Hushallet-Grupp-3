import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 2,
  },
});

interface Props {
  onPress: () => void;
  buttonColor: string;
  icon: string;
  disabled?: boolean;
}

const AvatarButton = ({ buttonColor, icon, onPress, disabled }: Props) => {
  function isDisabled(state: boolean | undefined) {
    if (state) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Button
      buttonColor={buttonColor}
      mode="contained"
      onPress={onPress}
      style={{
        margin: 5,
        borderRadius: 55,
        height: 75,
        width: 75,
      }}
      contentStyle={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
      }}
      disabled={isDisabled(disabled)}
    >
      <Text
        style={{
          fontSize: 15,
        }}
      >
        {icon}
      </Text>
    </Button>
  );
};

export default AvatarButton;
