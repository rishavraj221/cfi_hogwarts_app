import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const TickSVG = ({ style, size = "19", color = "#1C8D00" }) => {
  return (
    <View style={style}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M9.5 0C4.24654 0 0 4.24654 0 9.5C0 14.7535 4.24654 19 9.5 19C14.7535 19 19 14.7535 19 9.5C19 4.24654 14.7535 0 9.5 0ZM14.0968 7.52995L8.4712 13.1336C8.29606 13.3088 8.07727 13.3963 7.8583 13.3963C7.63932 13.3963 7.39854 13.3088 7.24539 13.1336L4.4654 10.3755C4.11513 10.0252 4.11513 9.47799 4.4654 9.12772C4.81566 8.77746 5.3629 8.77746 5.71317 9.12772L7.8583 11.2728L12.8491 6.28206C13.1993 5.9318 13.7466 5.9318 14.0969 6.28206C14.4251 6.63248 14.4251 7.20153 14.0969 7.52999L14.0968 7.52995Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default TickSVG;
