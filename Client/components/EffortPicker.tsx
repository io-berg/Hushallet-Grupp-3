import React, { useState } from "react";
import { View } from "react-native";
import { Badge, Text, TouchableRipple, useTheme } from "react-native-paper";

interface Props {
  value: number;
  onChange?: (value: number) => void;
}

const EffortPicker = ({ value, onChange }: Props) => {
  const [showPicker, setShowPicker] = useState(false);

  const theme = useTheme();

  const valueToColor: { [num: string]: string } = {
    1: "#f2f2f2",
    2: "#f1f0f0",
    4: "#e9e7e7",
    6: "#e1e1e1",
    8: "#d9d9d9",
  };

  if (!showPicker) {
    return (
      <TouchableRipple
        disabled={!onChange}
        onPress={() => {
          setShowPicker(true);
        }}
        style={{
          width: "92%",
          padding: 15,
          borderRadius: 10,
          elevation: 5,
          backgroundColor: theme.colors.surface,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Värde:
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: theme.colors.text,
              }}
            >
              Hur energikrävande är sysslan?
            </Text>
          </View>
          <Badge
            size={25}
            style={{
              backgroundColor: theme.colors.disabled,
              marginHorizontal: 5,
              alignSelf: "center",
              color: theme.colors.text,
            }}
          >
            {value}
          </Badge>
        </View>
      </TouchableRipple>
    );
  }

  return (
    <View
      style={{
        width: "92%",
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: theme.colors.surface,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {[1, 2, 4, 6, 8].map((item) => (
        <Badge
          key={item}
          size={50}
          style={{
            backgroundColor: valueToColor[item],
            marginHorizontal: 5,
            alignSelf: "center",
            color: theme.colors.text,
            fontSize: 18,
          }}
          onPress={() => {
            onChange?.(item);
            setShowPicker(false);
          }}
        >
          {item}
        </Badge>
      ))}
    </View>
  );
};

export default EffortPicker;
