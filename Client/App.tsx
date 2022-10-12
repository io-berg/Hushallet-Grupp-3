import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url = "http://10.0.2.2:5279/api/Auth/Login";
  const fetchUrl = "http://10.0.2.2:5279/WeatherForecast";

  const tryFetch = async () => {
    try {
      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNumberFact = async () => {
    try {
      const response = await fetch("http://numbersapi.com/42");
      if (response.ok) {
        const data = await response.text();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setToken(data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Logged in: {token ? "True" : "False"}</Text>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={() => login()} />
      <Button title="Fetch" onPress={() => tryFetch()} />
      <Button title="Fetch Number Fact" onPress={() => fetchNumberFact()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
