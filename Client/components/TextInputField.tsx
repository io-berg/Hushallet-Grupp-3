import React from "react";
import { TextInput, useTheme } from "react-native-paper";

interface TextInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: "regular" | "password" | "multiline";
  placeholder: string;
  error?: string;
  style?: object;
}

const TextInputField = ({
  value,
  onChange,
  placeholder,
  error,
  type = "regular",
  style,
}: TextInputFieldProps) => {
  const theme = useTheme();
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      error={!!error}
      mode="flat"
      secureTextEntry={type === "password"}
      multiline={type === "multiline"}
      numberOfLines={type === "multiline" ? 4 : 1}
      style={{
        ...style,
        backgroundColor: theme.colors.surface,
        width: "92%",
        elevation: 5,
        shadowColor: "black",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        fontSize: 20,
        paddingHorizontal: 20,
      }}
      placeholderTextColor="#bebebe"
      underlineColorAndroid={"transparent"}
      underlineColor="transparent"
    />
  );
};

export default TextInputField;
