import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  Dimensions,
} from "react-native";
import { Chess } from "chess.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Icon from "../assets/Icons";
import PlayingChessIllus from "../assets/Illustrations/PlayingChess";
import NotFoundIllus from "../assets/Illustrations/NotFound";
import AppText from "../components/Text";
import Screen from "../components/Screen";
import { scanUserByKeyword } from "../api/dynamo";
import { showErrorToast } from "../components/Toast";
import Piece from "../components/Piece";

const { width } = Dimensions.get("window");

const useConst = (initialValue) => {
  const ref = useRef();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
            initialValue()
          : initialValue,
    };
  }
  return ref.current.value;
};

const WHITE = "#ffffff";
const BLACK = "#9B9B88";

const Square = ({ row, col }) => {
  const offset = row % 2 === 0 ? 1 : 0;
  const backgroundColor = (col + offset) % 2 === 0 ? WHITE : BLACK;
  const color = (col + offset) % 2 === 0 ? BLACK : WHITE;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        padding: 4,
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color, fontWeight: "500", opacity: col === 0 ? 1 : 0 }}>
        {8 - row}
      </Text>
      <Text
        style={{
          color,
          fontWeight: "500",
          alignSelf: "flex-end",
          opacity: row === 7 ? 1 : 0,
        }}
      >
        {String.fromCharCode("a".charCodeAt(0) + col)}
      </Text>
    </View>
  );
};

const Row = ({ row }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {new Array(8).fill(0).map((_, col) => (
        <Square key={col} row={row} col={col} />
      ))}
    </View>
  );
};

const mock_players = [
  {
    username: "siddharth_pandey",
    playing: false,
  },
  {
    username: "siddharth3838",
    playing: false,
  },
  {
    username: "sidaui243",
    playing: true,
  },
  {
    username: "sidasdfa",
    playing: false,
  },
];

const GameScreen = ({ boardConnection }) => {
  const [searchText, setSearchText] = useState("");
  const [notExist, setNotExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState(null);

  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });
  const onTurn = useCallback(() => {
    setState({
      player: state.player === "w" ? "b" : "w",
      board: chess.board(),
    });
  }, [chess, state.player]);

  const scanUserFunc = async (Keyword) => {
    try {
      setLoading(true);
      const { data } = await scanUserByKeyword(Keyword);
      setLoading(false);

      console.log(data);
      if (!data.ScannedCount) return showErrorToast("Something went wrong!");
      setPlayers(data.Items);
    } catch (ex) {
      showErrorToast("Something went wrong!");
      console.log(ex);
      setLoading(false);
    }
  };

  return (
    <Screen style={{ backgroundColor: "#F7F8FA" }}>
      <GestureHandlerRootView>
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
        {/* <TextInput
        style={styles.searchTextInput}
        onChangeText={(e) => {
          setSearchText(e);
          scanUserFunc(e);
        }}
        placeholder="Enter username of your opponent"
      />
      {loading && <AppText style={styles.apiStatus}>Searching...</AppText>}
      {players ? (
        players.length > 0 ? (
          players.map((p, index) => (
            <View key={index} style={styles.playerCont}>
              <View>
                <AppText style={styles.playerName}>{p.username}</AppText>
                {p.current_game.playing && (
                  <AppText style={[styles.playerName, { color: "#ffbd12" }]}>
                    Already on a game
                  </AppText>
                )}
              </View>
              {!p.current_game.playing && (
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
              )}
            </View>
          ))
        ) : (
          <View style={styles.midIllus}>
            <NotFoundIllus />
            <AppText style={styles.illusTxt}>
              The Person you are looking for does not exist
            </AppText>
          </View>
        )
      ) : (
        <View style={styles.midIllus}>
          <PlayingChessIllus />
          <AppText style={styles.illusTxt}>
            Search for your opponent and start playing
          </AppText>
        </View>
      )} */}

        <View style={{ height: width, marginTop: "30%" }}>
          {new Array(8).fill(0).map((_, row) => (
            <Row key={row} row={row} />
          ))}
          {state.board.map((row, y) =>
            row.map((piece, x) => {
              if (piece !== null) {
                return (
                  <Piece
                    key={`${x}-${y}`}
                    id={`${piece.color}${piece.type}`}
                    startPosition={{ x, y }}
                    chess={chess}
                    onTurn={onTurn}
                    enabled={state.player === piece.color}
                  />
                );
              }
              return null;
            })
          )}
        </View>
      </GestureHandlerRootView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  apiStatus: {
    fontFamily: "MerriweatherRegular",
    fontSize: 12,
    textAlign: "center",
    color: "green",
    marginBottom: 15,
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
  container: {
    width,
    height: width,
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
    marginBottom: 15,
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
  playerCont: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "white",
  },
  playerName: {
    fontFamily: "RobotoRegular",
    color: "#949494",
    fontSize: 12,
    marginBottom: 2,
  },
});

export default GameScreen;
