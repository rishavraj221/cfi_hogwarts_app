import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import Icon from "../assets/Icons";
import PlayingChessIllus from "../assets/Illustrations/PlayingChess";
import NotFoundIllus from "../assets/Illustrations/NotFound";
import AppText from "../components/Text";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

const GameScreen = ({ boardConnection }) => {
  const auth = useAuth();
  const [searchText, setSearchText] = useState("");
  const [notExist, setNotExist] = useState(false);

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
      <TextInput
        style={styles.searchTextInput}
        onChangeText={(e) => {
          setSearchText(e);
          setNotExist(e ? true : false);
        }}
        placeholder="Enter username of your opponent"
      />
      <View style={styles.midIllus}>
        {notExist ? <NotFoundIllus /> : <PlayingChessIllus />}
        <AppText style={styles.illusTxt}>
          {notExist
            ? "The Person you are looking for does not exist"
            : "Search for your opponent and start playing"}
        </AppText>
      </View>
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
  searchTextInput: {
    backgroundColor: "white",
    alignSelf: "center",
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    color: "#707070",
    fontSize: 12,
    fontFamily: "RobotoRegular",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
    marginTop: 20,
  },
  midIllus: {
    position: "absolute",
    top: "40%",
    left: "30%",
    alignItems: "center",
  },
  illusTxt: {
    color: "#767676",
    fontFamily: "MerriweatherRegular",
    fontSize: 12,
    lineHeight: 18,
    width: 160,
    textAlign: "center",
    marginTop: 15,
  },
});

export default GameScreen;
