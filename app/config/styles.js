import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: "#6f6f6f",
    fontSize: 12,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
