import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import FullWidthButton from "../components/FullWidthButton";
import TextInputField from "../components/TextInputField";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log("Logging in...");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <TextInputField
        value={username}
        onChange={setUsername}
        placeholder="username"
        style={{
          marginBottom: 10,
          marginTop: 50,
        }}
      />
      <TextInputField
        value={password}
        onChange={setPassword}
        placeholder="password"
        type="password"
        style={{
          marginBottom: 30,
        }}
      />
      <FullWidthButton text="Logga in" onPress={login} />
      <Button
        onPress={() => console.log("Registering...")}
        style={{
          marginTop: 20,
        }}
      >
        <Text style={{ color: "blue" }}>Registrera nytt konto</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
});
