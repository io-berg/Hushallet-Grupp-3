import React from "react";
import { Image, View } from "react-native";

interface Props {
  style?: object;
  animal: string;
}

const AvatarIcon = ({ style, animal }: Props) => {
  return (
    <View style={{ ...style }}>
      <Image
        source={require("../assets/animals/" + animal + ".png")}
        style={{
          ...style,
        }}
      />
    </View>
  );
};

export default AvatarIcon;
