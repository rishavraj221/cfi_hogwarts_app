import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const ProfileSVG = ({ style, size = "20", color = "#969696" }) => {
  return (
    <View style={style}>
      <Svg
        width={(17 / 20) * size}
        height={size}
        viewBox="0 0 17 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M8.47231 12.1668C11.8336 12.1668 14.5557 9.44459 14.5557 6.0834C14.5557 2.72215 11.8335 0 8.47231 0C5.11112 0 2.38892 2.7222 2.38892 6.0834C2.38892 9.44464 5.11112 12.1668 8.47231 12.1668ZM8.47231 2.08336C10.6946 2.08336 12.5001 3.88883 12.5001 6.11113C12.5001 8.33342 10.6946 10.1389 8.47231 10.1389C6.25002 10.1389 4.44454 8.33342 4.44454 6.11113C4.44454 3.88903 6.25002 2.08336 8.47231 2.08336Z"
          fill={color}
        />
        <Path
          d="M12.8334 13.0557H4.1111C1.86113 13.0557 0 14.8891 0 17.1668V18.9722C0 19.5278 0.472202 20 1.02774 20C1.58328 20 2.05548 19.5278 2.05548 18.9722V17.1668C2.05548 16.0278 2.97215 15.1111 4.1111 15.1111H12.8334C13.9724 15.1111 14.889 16.0278 14.889 17.1668V18.9722C14.889 19.5278 15.3612 20 15.9168 20C16.4723 20 16.9445 19.5278 16.9445 18.9722V17.1668C16.9447 14.8889 15.1113 13.0557 12.8336 13.0557H12.8334Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default ProfileSVG;