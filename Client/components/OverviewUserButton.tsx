import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Profile } from "../utils/type";
import TextAvatar from "./TextAvatar";

interface Props {
  profile: Profile;
  onClick?: () => void;
}

const OverViewUserButton = ({ profile, onClick }: Props) => {
  return (
    <TouchableRipple
      onPress={onClick}
      rippleColor="lightyellow"
      style={{
        borderRadius: 10,
        backgroundColor: "#fff",
        marginVertical: 5,
      }}
    >
      <View
        key={profile.id}
        style={{
          padding: 10,
          borderRadius: 10,
          height: 40,
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TextAvatar icon={profile.avatar.icon} />
          <Text style={{ paddingLeft: 5 }} key={profile.id}>
            {profile.name + " (" + profile.user.username + ")"}
          </Text>
        </View>
        {profile.role === "admin" && (
          <MaterialCommunityIcons
            name="crown"
            size={24}
            color="gold"
            style={{
              padding: 0,
              margin: 0,
            }}
          />
        )}
      </View>
    </TouchableRipple>
  );
};

export default OverViewUserButton;
