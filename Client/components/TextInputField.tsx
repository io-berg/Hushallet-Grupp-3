import React from "react";
import { TextInput } from "react-native-paper";

interface TextInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
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
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      error={!!error}
      mode="flat"
      secureTextEntry={type === "password"}
      style={{
        ...style,
        backgroundColor: "white",
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
