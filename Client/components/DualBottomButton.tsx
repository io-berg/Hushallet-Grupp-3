import React from "react";
import { View } from "react-native";
import { Button, Divider } from "react-native-paper";

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

const DualBottomButton = ({
  title1,
  icon1,
  onPress1,
  disabled1,
  title2,
  onPress2,
  icon2,
  disabled2,
}: Props) => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "flex-end",
        bottom: 0,
        paddingStart: "2%",
        paddingEnd: "2%",
      }}
    >
      <Button
        mode="contained"
        icon={icon1}
        onPress={onPress1}
        disabled={disabled1}
        buttonColor="white"
        textColor="black"
        style={{ width: "50%", borderStartColor: "#FFFFFF", padding: 8 }}
      >
        {title1}
      </Button>
      <Divider style={{ width: 1, height: "100%" }}></Divider>
      <Button
        mode="contained"
        icon={icon2}
        onPress={onPress2}
        disabled={disabled2}
        buttonColor="white"
        textColor="black"
        style={{ width: "50%", padding: 8 }}
      >
        {title2}
      </Button>
    </View>
  );
};

export default DualBottomButton;
