import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../components/Text";
import Button from "../components/Button";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

const HomeScreen = () => {
  const auth = useAuth();
  console.log(auth.user);
  return (
    <Screen>
      <AppText style={styles.text}>Home Screen</AppText>
      <AppText style={styles.text}>{auth.user["cognito:username"]}</AppText>
      <AppText style={styles.text}>{auth.user.email}</AppText>
      <Button title="Logout" onPress={auth.logOut} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
