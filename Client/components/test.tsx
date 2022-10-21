import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function MyTabBar({ state, navigation }: MaterialTopTabBarProps) {
  const currentTab = state.routes[state.index];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {state.index > 0 ? (
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.navigate(state.routes[state.index - 1].name)}
          style={{
            alignSelf: "flex-start",
            marginLeft: 20,
          }}
        />
      ) : (
        <View />
      )}

      <Text
        style={{
          fontSize: 20,
          alignSelf: "center",
        }}
      >
        {currentTab.name}
      </Text>
      {state.index < state.routes.length - 1 ? (
        <AntDesign
          name="arrowright"
          size={24}
          color="black"
          onPress={() => navigation.navigate(state.routes[state.index + 1].name)}
          style={{
            alignSelf: "flex-end",
            marginRight: 20,
          }}
        />
      ) : (
        <View />
      )}
    </View>
  );
}
