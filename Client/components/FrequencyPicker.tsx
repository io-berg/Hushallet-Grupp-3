import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Badge, Text, TouchableRipple, useTheme } from "react-native-paper";

interface Props {
  value: number;
  onChange?: (value: number) => void;
  bool: boolean;
}

const FrequencyPicker = ({ value, onChange, bool }: Props) => {
  const [showPicker, setShowPicker] = useState(false);

  const theme = useTheme();

  function isDisabled(state: boolean | undefined) {
    if (state) {
      return true;
    } else {
      return false;
    }
  }

  if (!showPicker) {
    return (
      <TouchableRipple
        disabled={isDisabled(bool)}
        onPress={() => {
          if (onChange) setShowPicker(true);
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
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Återkommer:
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
              }}
            >
              var
            </Text>
            <Badge
              style={{
                backgroundColor: "#cd5d6f",
                marginHorizontal: 5,
              }}
              size={25}
            >
              {value}
            </Badge>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
              }}
            >
              dag
            </Text>
          </View>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
          26, 27, 28, 29, 30, 31,
        ].map((v, idx) => (
          <Pressable
            key={idx}
            style={{
              padding: 6,
              marginHorizontal: 5,
              paddingHorizontal: 5,
              borderRadius: 0,
              margin: 0,
            }}
            onPress={() => {
              if (onChange) onChange(v);
              setShowPicker(false);
            }}
          >
            <Text
              style={{
                padding: 1,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {v}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default FrequencyPicker;
