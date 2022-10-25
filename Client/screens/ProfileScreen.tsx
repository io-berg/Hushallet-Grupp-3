import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectCurrentUserProfile } from "../store/selectors";
import { useAppSelector } from "../store/store";
import DualBottomButton from "../components/DualBottomButton";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const currentUserProfile = useAppSelector(selectCurrentUserProfile);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 15,
          height: 320,
          width: 320,
          borderRadius: 170,
          backgroundColor: currentUserProfile?.avatar.color,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            marginTop: 15,
            fontSize: 200,
            fontWeight: "bold",
          }}
        >
          {currentUserProfile?.avatar.icon}
        </Text>
      </View>
      <Text style={styles.title}>{currentUserProfile?.name}</Text>
      <View
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <DualBottomButton
          title1="Mina hushåll"
          onPress1={() => navigation.navigate("Start")}
          title2="Redigera"
          onPress2={() => navigation.navigate("EditProfile")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 15,
    fontSize: 45,
    fontWeight: "bold",
  },
  icon: {
    marginTop: 15,
    fontSize: 200,
    fontWeight: "bold",
  },
});
