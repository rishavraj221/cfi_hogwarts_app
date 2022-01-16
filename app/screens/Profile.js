import React from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";

import Icon from "../assets/Icons";
import AppText from "../components/Text";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

const ProfileScreen = () => {
  const auth = useAuth();

  return (
    <Screen style={{ backgroundColor: "#f7f8fa" }}>
      <View style={styles.profileHeadCont}>
        <Icon name="account" />
        <View style={styles.profileTxts}>
          <AppText style={styles.username}>
            {auth.user["cognito:username"]}
          </AppText>
          <AppText style={styles.email}>{auth.user["email"]}</AppText>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.pencil}
          onPress={() =>
            Alert.alert("Work in progress", "Thanks for your patience!")
          }
        >
          <Icon name="pencil" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30 }} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={() =>
          Alert.alert("Work in progress", "Thanks for your patience!")
        }
      >
        <Icon name="feedback" />
        <AppText style={styles.btnTitle}>Give Feedback</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={() =>
          Alert.alert("Work in progress", "Thanks for your patience!")
        }
      >
        <Icon name="bug" />
        <AppText style={styles.btnTitle}>Report an issue</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={() =>
          Alert.alert("Work in progress", "Thanks for your patience!")
        }
      >
        <Icon name="aboutus" />
        <AppText style={styles.btnTitle}>About Us</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={auth.logOut}
      >
        <Icon name="logout" />
        <AppText style={styles.btnTitle}>Log out</AppText>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  profileHeadCont: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  profileTxts: {
    alignSelf: "flex-end",
    marginLeft: 15,
  },
  username: {
    fontFamily: "MerriweatherRegular",
    fontSize: 14,
    color: "#352B2B",
  },
  email: {
    fontFamily: "MerriweatherRegular",
    fontSize: 12,
    color: "#767676",
    marginTop: 5,
  },
  pencil: {
    position: "absolute",
    right: 30,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingHorizontal: 40,
  },
  btnTitle: {
    marginLeft: 15,
    fontFamily: "RobotoMedium",
    fontSize: 15,
    color: "#767676",
  },
});

export default ProfileScreen;
