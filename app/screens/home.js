import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import AppText from "../components/Text";
import Button from "../components/Button";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import Icon from "../assets/Icons";

const gameStats = [
  {
    statName: "Games Played",
    count: 56,
    iconName: "gamesPlayed",
  },
  {
    statName: "Games Won",
    count: 42,
    iconName: "gamesWon",
  },
  {
    statName: "Games Lost",
    count: 9,
    iconName: "gamesLost",
  },
  {
    statName: "Stalemate Games",
    count: 5,
    iconName: "gamesTie",
  },
];

const HomeScreen = ({ boardConnection }) => {
  const auth = useAuth();

  const prependZero = (number) => {
    if (number < 10) return "0" + number;
    return number;
  };

  return (
    <Screen style={{ backgroundColor: "#F7F8FA" }}>
      <View style={styles.boardStatsCont}>
        <AppText style={styles.statTitle}>
          Board <AppText style={styles.boardName}>{boardConnection}</AppText>{" "}
          {boardConnection ? "is" : "not"} connected
        </AppText>
        <Icon
          name={boardConnection ? "tick" : "warning"}
          style={{ marginHorizontal: 10 }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.connectionBtn}
          onPress={() =>
            Alert.alert("Work in Progress", "Thanks for your patience!")
          }
        >
          <AppText style={styles.btnTxt}>
            {boardConnection ? "Disconnect" : "Connect"}
          </AppText>
        </TouchableOpacity>
      </View>
      <AppText style={styles.headTxt}>Your Stats</AppText>
      <ScrollView>
        {gameStats.map((g, index) => (
          <View key={index} style={styles.statBox}>
            <View style={styles.statBoxLeftContent}>
              <AppText style={styles.statBoxTitle}>{g.statName}</AppText>
              <AppText style={styles.statCount}>{prependZero(g.count)}</AppText>
            </View>
            <Icon name={g.iconName} style={styles.statIcon} />
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  boardStatsCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  statTitle: {
    color: "#767676",
    fontFamily: "MerriweatherRegular",
    fontSize: 12,
  },
  boardName: {
    color: "#352B2B",
    fontFamily: "MerriweatherRegular",
    fontSize: 12,
  },
  connectionBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 30,
  },
  btnTxt: {
    color: "#767676",
    fontFamily: "MerriweatherRegular",
    fontSize: 11,
  },
  headTxt: {
    padding: 20,
    paddingTop: 30,
    fontFamily: "RobotoMedium",
    fontSize: 14,
    color: "#767676",
  },
  statBox: {
    width: "80%",
    height: 120,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
    marginVertical: 10,
    flexDirection: "row",
  },
  statBoxLeftContent: {
    width: "65%",
    height: 120,
  },
  statBoxTitle: {
    margin: 20,
    marginBottom: 5,
    fontFamily: "RobotoRegular",
    fontSize: 14,
    color: "#7D7B7B",
  },
  statCount: {
    fontFamily: "MerriweatherLight",
    fontSize: 36,
    textAlign: "center",
    marginLeft: 50,
    color: "#949494",
  },
  statIcon: {
    width: "35%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
