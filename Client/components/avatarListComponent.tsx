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

const AvatarItem = ({ buttonColor, icon, onPress, disabled }: Props) => {
  return (
    <Button
      buttonColor={buttonColor}
      mode="contained"
      onPress={onPress}
      style={styles.button}
      contentStyle={{ borderRadius: 50 }}
    >
      <Text style={{ fontSize: 15 }}>{icon}</Text>
    </Button>
  );
};

export default AvatarItem;
