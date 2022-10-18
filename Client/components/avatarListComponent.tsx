import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Avatar } from "../utils/type";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "black",
    margin: 8,
  },
  protein: {
    fontSize: 18,
    color: "black",
    margin: 8,
  },
  image: {
    width: "100%",
    height: 165,
  },
  description: {
    color: "black",
    margin: 8,
  },
});

const AvatarItem: FC<Avatar> = (props) => {
  return (
    <Button
      buttonColor={props.color}
      mode="contained"
      onPress={() => console.log("Pressed")}
      //style={styles.button}
    >
      {props.icon}
    </Button>
  );
};

export default AvatarItem;
