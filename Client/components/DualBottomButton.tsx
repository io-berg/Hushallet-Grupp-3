import React from "react";
import { Button, Text } from "react-native-paper";

interface Props {
  onPress1: () => void;
  text1: string;
  icon1?: string;
  disabled1?: boolean;

  onPress2: () => void;
  text2: string;
  icon2?: string;
  disabled2?: boolean;
}

const DualBottomButton = ({
  onPress1,
  text1,
  icon1,
  disabled1,
  onPress2,
  text2,
  icon2,
  disabled2,
}: Props) => {
  return (
    <view>
      <Button
        onPress={onPress1}
        icon={icon1}
        disabled={disabled1}
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
          {text1}
        </Text>
      </Button>
      <Button
        onPress={onPress2}
        icon={icon2}
        disabled={disabled2}
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
          {text2}
        </Text>
      </Button>
      ;
    </view>
  );
};

export default DualBottomButton;
