import React from "react";
import { View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

const WarningSVG = ({ style, size = "19", color = "#FFBD12" }) => {
  return (
    <View style={style}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Circle cx="9.5" cy="9.5" r="9.5" fill={color} />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.79318 16.0001C9.05043 16.0001 8.44836 15.398 8.44836 14.6552C8.44836 13.9125 9.05043 13.3104 9.79318 13.3104C10.5359 13.3104 11.138 13.9125 11.138 14.6552C11.138 15.398 10.5359 16.0001 9.79318 16.0001Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.79319 3C8.80369 3 8 3.80369 8 4.79319C8 5.39946 8.39594 9.72239 8.94137 11.4274C9.06374 11.8104 9.21064 12.0813 9.34323 12.2146C9.48762 12.3599 9.64501 12.4137 9.79319 12.4137C9.94138 12.4137 10.0988 12.3598 10.2432 12.2146C10.3757 12.0813 10.5226 11.8104 10.645 11.4274C11.1904 9.72242 11.5864 5.39951 11.5864 4.79319C11.5864 3.80369 10.7827 3 9.79319 3Z"
          fill="white"
        />
      </Svg>
    </View>
  );
};

export default WarningSVG;
