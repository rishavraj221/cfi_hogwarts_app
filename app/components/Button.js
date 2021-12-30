import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function AppButton({ title, width, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, { width }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#8f8f8f",
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "MerriweatherBold",
    color: "#8f8f8f",
  },
});

export default AppButton;
