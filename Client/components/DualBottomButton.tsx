import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

interface Props {
  onPress1: () => void;
  title1: string;
  icon1?: string;
  disabled1?: boolean;

  onPress2: () => void;
  title2: string;
  icon2?: string;
  disabled2?: boolean;
}

const DualBottomButton = ({ title1, icon1, onPress1, disabled1 }: Props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Button icon={icon1} onPress={onPress1} disabled={disabled1}>
        {title1}
      </Button>
      <Button icon={icon1} onPress={onPress1} disabled={disabled1}>
        {title1}Test2
      </Button>
    </View>
  );
};

export default DualBottomButton;
