import React, { useState, useEffect } from "react";
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
import { getUserFromDB } from "../hooks/getDynamoUser";
import { showErrorToast } from "../components/Toast";

const HomeScreen = ({ boardConnection }) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [dynamoUser, setDynamoUser] = useState(null);
  const [gameStats, setGameStats] = useState([
    {
      statName: "Games Played",
      count: 0,
      iconName: "gamesPlayed",
    },
    {
      statName: "Games Won",
      count: 0,
      iconName: "gamesWon",
    },
    {
      statName: "Games Lost",
      count: 0,
      iconName: "gamesLost",
    },
    {
      statName: "Stalemate Games",
      count: 0,
      iconName: "gamesTie",
    },
  ]);

  const prependZero = (number) => {
    if (number < 10) return "0" + number;
    return number;
  };

  const getUserFunc = async (username) => {
    const data = await getUserFromDB(username, setLoading, showErrorToast);
    // console.log(data);
    setDynamoUser(data);

    const gameStatsTemp = [...gameStats];
    gameStatsTemp[0].count = data.game_stats.played;
    gameStatsTemp[1].count = data.game_stats.won;
    gameStatsTemp[2].count = data.game_stats.lose;
    gameStatsTemp[3].count = data.game_stats.tie;

    setGameStats(gameStatsTemp);
  };

  useEffect(() => {
    getUserFunc(auth.user["cognito:username"]);
  }, []);

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
      {loading && <AppText style={styles.apiStatus}>Getting Stats...</AppText>}
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
  apiStatus: {
    fontFamily: "MerriweatherRegular",
    fontSize: 12,
    textAlign: "center",
    color: "green",
    marginTop: 15,
    marginBottom: 5,
  },
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
