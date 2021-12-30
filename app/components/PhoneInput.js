import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import AppText from "./Text";

const country_code = "IN +91";

function AppPhoneInput({ ...otherProps }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.country_code}>{country_code}</AppText>
      <TextInput
        style={styles.input}
        placeholderTextColor="#BAB6BB"
        keyboardType="numeric"
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(215, 217, 216, 0.12)",
    borderRadius: 25,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  country_code: {
    color: "#5F5F5F",
    fontSize: 16,
    marginRight: 16,
  },
  input: {
    paddingLeft: 21,
    borderLeftWidth: 1,
    borderLeftColor: "rgba(186, 182, 187, 0.6)",
  },
});

export default AppPhoneInput;
