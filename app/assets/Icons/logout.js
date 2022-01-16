import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const LogoutSVG = ({ style, size = "28", color = "#767676" }) => {
  return (
    <View style={style}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M18.1 20H11.8L12.1 5.9L4.3 2H18.1V9H20.1V0H0.4L0 22.1L11.7 28L11.8 22H20.1V13H18.1V20Z"
          fill={color}
        />
        <Path
          d="M26.9 10.3L22.9 6.30005L21.5 7.70005L23.8 10H14V12H23.8L21.5 14.3L22.9 15.7L26.9 11.7C27.3 11.3 27.3 10.7 26.9 10.3Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default LogoutSVG;
