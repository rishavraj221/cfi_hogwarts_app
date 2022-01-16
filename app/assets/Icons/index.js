import React from "react";
import { Text } from "react-native";

import ABU from "./aboutUs";
import AC from "./account";
import Bug from "./bug";
import CFI from "./cfi";
import FBK from "./feedback";
import Game from "./game";
import GL from "./gamesLost";
import GP from "./gamesPlayed";
import GT from "./gamesTie";
import GW from "./gamesWon";
import Home from "./home";
import LGT from "./logout";
import Pncl from "./pencil";
import Prof from "./profile";
import Tick from "./tick";
import Wr from "./warning";

const Icon = ({ name, size, color, style }) => {
  const t = name.toLowerCase();

  if (t === "aboutus") return <ABU style={style} size={size} color={color} />;
  if (t === "account") return <AC style={style} size={size} color={color} />;
  if (t === "bug") return <Bug style={style} size={size} color={color} />;
  if (t === "cfi") return <CFI style={style} size={size} color={color} />;
  if (t === "feedback") return <FBK style={style} size={size} color={color} />;
  if (t === "game") return <Game style={style} size={size} color={color} />;
  if (t === "gameslost") return <GL style={style} size={size} color={color} />;
  if (t === "gamesplayed")
    return <GP style={style} size={size} color={color} />;
  if (t === "gamestie") return <GT style={style} size={size} color={color} />;
  if (t === "gameswon") return <GW style={style} size={size} color={color} />;
  if (t === "home") return <Home style={style} size={size} color={color} />;
  if (t === "logout") return <LGT style={style} size={size} color={color} />;
  if (t === "pencil") return <Pncl style={style} size={size} color={color} />;
  if (t === "profile") return <Prof style={style} size={size} color={color} />;
  if (t === "tick") return <Tick style={style} size={size} color={color} />;
  if (t === "warning") return <Wr style={style} size={size} color={color} />;

  return <Text>?</Text>;
};

export default Icon;
