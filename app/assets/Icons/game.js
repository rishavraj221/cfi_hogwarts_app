import React from "react";
import { View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

const GameSVG = ({ style, size = "20", color = "#969696" }) => {
  return (
    <View style={style}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Rect
          x="1"
          y="1"
          width="18"
          height="18"
          rx="4"
          stroke={color}
          strokeWidth="2"
        />
        <Path
          d="M1 5C1 2.79086 2.79086 1 5 1H9.32258V9.32258H1V5Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
        <Path
          d="M11.3226 11.3226H19.0001V15.0001C19.0001 17.2092 17.2092 19.0001 15.0001 19.0001H11.3226V11.3226Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

export default GameSVG;
