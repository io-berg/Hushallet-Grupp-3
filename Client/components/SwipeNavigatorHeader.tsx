import { AntDesign } from "@expo/vector-icons";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export default function MyTabBar({ state, navigation }: MaterialTopTabBarProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "visible",
      }}
    >
      {state.index > 0 ? (
        <LinearGradient
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100,
            height: 30,
            width: 80,
          }}
          colors={[theme.colors.surface, "transparent"]}
          start={[0.7, 0]}
          end={[1, 0]}
        >
          <AntDesign
            name="left"
            size={24}
            color="black"
            onPress={() => navigation.navigate(state.routes[state.index - 1].name)}
            style={{
              position: "absolute",
              fontSize: 20,
              paddingLeft: 20,
              top: 0,
              left: 0,
              zIndex: 100,
            }}
          />
        </LinearGradient>
      ) : (
        <View />
      )}

      {state.index < state.routes.length - 1 ? (
        <LinearGradient
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 100,
            height: 30,
            width: 80,
          }}
          colors={[theme.colors.surface, "transparent"]}
          start={[0.3, 1]}
          end={[0, 1]}
        >
          <AntDesign
            name="right"
            size={24}
            color="black"
            onPress={() => navigation.navigate(state.routes[state.index + 1].name)}
            style={{
              position: "absolute",
              fontSize: 20,
              paddingRight: 20,
              top: 0,
              right: 0,
              zIndex: 100,
            }}
          />
        </LinearGradient>
      ) : (
        <View />
      )}
    </View>
  );
}
