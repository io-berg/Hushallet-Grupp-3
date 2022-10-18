import React from "react";
import { Button, Text } from "react-native-paper";

interface Props {
  onPress: () => void;
  text: string;
  icon?: string;
  disabled?: boolean;
}

const DualBottomButton = ({ onPress, text, icon, disabled }: Props) => {
  return (
    <view>
      <Button
        onPress={onPress}
        icon={icon}
        disabled={disabled}
        mode="elevated"
        style={{
          width: "50%",
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
      ;
    </view>
  );
};

export default DualBottomButton;
