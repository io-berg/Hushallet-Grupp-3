import * as React from "react";
import { View, Text } from "react-native";
import { useAppSelector } from "../store/store";

export default function AvatarIcon() {
  const profile = useAppSelector((state) => state.household[0].profiles[0]);
  const color = profile.avatar.color;
  return (
    <View
      style={{
        marginTop: 15,
        height: 320,
        width: 320,
        borderRadius: 170,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          marginTop: 15,
          fontSize: 200,
          fontWeight: "bold",
        }}
      >
        {profile.avatar.icon}
      </Text>
    </View>
  );
}
