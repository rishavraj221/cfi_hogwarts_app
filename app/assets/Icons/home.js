import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const HomeSVG = ({ style, size = "21", color = "#595959" }) => {
  return (
    <View style={style}>
      <Svg
        width={(20 / 21) * size}
        height={size}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M8.5983 1.77913C9.3764 1.01462 10.6236 1.01462 11.4017 1.77913L18.4017 8.65685C18.7844 9.03289 19 9.54693 19 10.0835V18C19 19.1046 18.1046 20 17 20H3C1.89543 20 1 19.1046 1 18V10.0835C1 9.54693 1.21558 9.03289 1.5983 8.65685L8.5983 1.77913Z"
          stroke={color}
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

export default HomeSVG;
