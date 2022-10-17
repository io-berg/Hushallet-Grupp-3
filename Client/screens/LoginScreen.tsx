import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import FullWidthButton from "../components/FullWidthButton";
import TextInputField from "../components/TextInputField";
import { RootStackParamList } from "../navigation/RootNavigator";
import { login } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useAppSelector((state) => state.auth.errors);
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    dispatch(login({ username, password }));
  };

  const usernameErrors = errors.errors?.Username;
  const passwordErrors = errors.errors?.Password;

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
        placeholder="Användarnamn"
        style={{
          marginTop: 50,
        }}
      />
      <Text style={{ paddingBottom: 10 }}>
        {usernameErrors?.map((error: string) => (
          <Text style={styles.error} key={error}>
            {error}
          </Text>
        ))}
      </Text>
      <TextInputField
        value={password}
        onChange={setPassword}
        placeholder="Lösenord"
        type="password"
      />
      <Text style={{ paddingBottom: 50 }}>
        {passwordErrors?.map((error: string) => (
          <Text style={styles.error} key={error}>
            {error}
          </Text>
        ))}
      </Text>
      <FullWidthButton text="Logga in" onPress={handleLogin} />
      <Button
        onPress={() => navigation.navigate("Register")}
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
  errors: {
    width: "100%",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
});
