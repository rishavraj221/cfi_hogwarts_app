import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";

import AppText from "../components/Text";
import Screen from "../components/Screen";
import LoginHeadSVG from "../assets/Illustrations/LoginHead";
import LoginSVG from "../assets/Illustrations/Login";
import AppTextInput from "../components/TextInput";
import AppButton from "../components/Button";

import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .label("Username"),
  password: Yup.string()
    .required("Please enter your password")
    .label("Password"),
});

const LoginScreen = ({ navigation }) => {
  return (
    <Screen>
      <ScrollView style={{ backgroundColor: "white" }}>
        <LoginHeadSVG />
        <View style={styles.container}>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(e) => {
              Alert.alert("You provided", JSON.stringify(e, null, 4));
            }}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.form}>
                <AppText style={styles.h3}>
                  Log in to your account to have fun!
                </AppText>
                <AppTextInput
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  placeholder="Username"
                  placeholderTextColor="#bcbcbc"
                  width={278}
                />
                {errors.username && (
                  <AppText style={styles.error}>
                    <ErrorMessage name="username" />
                  </AppText>
                )}
                <AppTextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="#bcbcbc"
                  width={278}
                />
                {errors.password && (
                  <AppText style={styles.error}>
                    <ErrorMessage name="password" />
                  </AppText>
                )}
                <AppButton title="Login" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
          <View style={styles.signupTextCont}>
            <AppText style={styles.h3}>Don't have an account? </AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.SIGNUP)}
            >
              <AppText style={styles.h3Bold}>Sign Up</AppText>
            </TouchableOpacity>
          </View>
          <LoginSVG style={styles.loginSVG} />
          <AppText style={styles.footer}>
            App made by Electronics Club, CFI IITM
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    marginTop: 30,
    alignItems: "center",
  },
  h3: {
    fontFamily: "MerriweatherRegular",
    fontSize: 12,
    textAlign: "center",
    color: "#767676",
    marginBottom: 15,
  },
  h3Bold: {
    fontFamily: "MerriweatherBold",
    color: "#352b2b",
    fontSize: 12,
  },
  error: {
    fontSize: 12,
    color: "red",
  },
  signupTextCont: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginSVG: {
    marginTop: 50,
  },
  footer: {
    marginVertical: 30,
    fontFamily: "MerriweatherRegular",
    fontSize: 10,
    color: "#595959",
  },
});

export default LoginScreen;
