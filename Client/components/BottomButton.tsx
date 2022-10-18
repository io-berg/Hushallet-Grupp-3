import React from "react";
import { Button, Text } from "react-native-paper";

interface props {
  onPress: () => void;
  text: string;
  icon?: string;
  disabled?: boolean;
}
