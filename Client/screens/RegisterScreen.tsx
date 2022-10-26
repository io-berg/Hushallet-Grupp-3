import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import FullWidthButton from "../components/FullWidthButton";
import TextInputField from "../components/TextInputField";
import { RootStackParamList } from "../navigation/RootNavigator";
import { login, register } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const errors = useAppSelector((state) => state.auth.registerErrors?.errors);
  const registerSuccess = useAppSelector((state) => state.auth.registerSuccess);

  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleRegister = async () => {
    dispatch(register({ username, email, password }));
  };

  const usernameErrors = errors?.Username;
  const emailErrors = errors?.Email;
  const passwordErrors = errors?.Password;

  useEffect(() => {
    if (registerSuccess) {
      dispatch(login({ username, password }));
    }
  }, [registerSuccess, dispatch, username, password]);

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <TextInputField
          value={email}
          onChange={setEmail}
          placeholder="E-post adress"
          style={{
            marginTop: 40,
          }}
        />
        <View style={{ paddingBottom: 10, ...styles.errors }}>
          {emailErrors?.map((error: string) => (
            <Text style={styles.error} key={error}>
              {error}
            </Text>
          ))}
        </View>
        <TextInputField value={username} onChange={setUsername} placeholder="Användarnamn" />
        <View style={{ paddingBottom: 10, ...styles.errors }}>
          {usernameErrors?.map((error: string) => (
            <Text style={styles.error} key={error}>
              {error}
            </Text>
          ))}
        </View>
        <TextInputField
          value={password}
          onChange={setPassword}
          placeholder="Lösenord"
          type="password"
        />
        <View style={{ paddingBottom: 50 }}>
          {passwordErrors?.map((error: string) => (
            <Text style={styles.error} key={error}>
              {error}
            </Text>
          ))}
        </View>
        <FullWidthButton text="Registrera" onPress={handleRegister} />
        <Button
          onPress={() => navigation.navigate("Login")}
          style={{
            marginTop: 20,
          }}
        >
          <Text style={{ color: theme.colors.text }}>Tillbaka till Login</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
