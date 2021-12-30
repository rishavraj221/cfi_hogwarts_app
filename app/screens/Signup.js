import React, { useState } from "react";
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
import SignUpSVG from "../assets/Illustrations/SignUp";
import AppTextInput from "../components/TextInput";
import AppButton from "../components/Button";

import routes from "../navigation/routes";

const otpValidationSchema = Yup.object().shape({
  verificationCode: Yup.string().matches("\\d{6}", "Please enter a valid code"),
});

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .label("Username"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email")
    .label("Email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password is too short - should be at least 6 characters")
    .max(12, "Password is too long - should not be more than 12 characters")
    .test(
      "isValidPass",
      "Password must contain atleast 1 small, 1 capital, 1 numeric and 1 special character",
      (value, context) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSymbole = /[!@#%&]/.test(value);
        let validConditions = 0;
        const numberOfMustBeValidConditions = 4;
        const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }
    )
    .label("Password"),
  reenterPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

const SignupScreen = ({ navigation }) => {
  const [otpSent, setOTPSent] = useState(false);
  const [email, setEmail] = useState(null);

  return (
    <Screen>
      <ScrollView style={{ backgroundColor: "white" }}>
        <LoginHeadSVG />
        <View style={styles.container}>
          {otpSent ? (
            <Formik
              initialValues={{ verificationCode: "" }}
              onSubmit={(e) => {
                Alert.alert("You provided", JSON.stringify(e, null, 4));
              }}
              validationSchema={otpValidationSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.form}>
                  <AppText style={styles.h3}>
                    Enter 6 digit verification code sent to{" "}
                    <AppText style={styles.h3Bold}>{email}</AppText>
                  </AppText>
                  <AppTextInput
                    onChangeText={handleChange("verificationCode")}
                    onBlur={handleBlur("verificationCode")}
                    value={values.verificationCode}
                    keyboardType="number-pad"
                    placeholder="6 Digit Verification Code"
                    placeholderTextColor="#bcbcbc"
                    width={278}
                  />
                  {errors.verificationCode && (
                    <AppText style={styles.error}>
                      <ErrorMessage name="verificationCode" />
                    </AppText>
                  )}
                  <AppButton title="Verify" onPress={handleSubmit} />
                </View>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                reenterPassword: "",
              }}
              onSubmit={(e) => {
                setEmail(e.email);
                setOTPSent(true);
              }}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.form}>
                  <AppText style={styles.h3}>Sign up! It's free :)</AppText>
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
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                    placeholderTextColor="#bcbcbc"
                    width={278}
                  />
                  {errors.email && (
                    <AppText style={styles.error}>
                      <ErrorMessage name="email" />
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
                  <AppTextInput
                    onChangeText={handleChange("reenterPassword")}
                    onBlur={handleBlur("reenterPassword")}
                    value={values.reenterPassword}
                    secureTextEntry={true}
                    placeholder="Re-enter your Password"
                    placeholderTextColor="#bcbcbc"
                    width={278}
                  />
                  {errors.reenterPassword && (
                    <AppText style={styles.error}>
                      <ErrorMessage name="reenterPassword" />
                    </AppText>
                  )}
                  <AppButton title="Sign Up" onPress={handleSubmit} />
                </View>
              )}
            </Formik>
          )}
          <View style={styles.signupTextCont}>
            <AppText style={styles.h3}>Already have an account? </AppText>
            <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
              <AppText style={styles.h3Bold}>Login</AppText>
            </TouchableOpacity>
          </View>
          <SignUpSVG style={styles.loginSVG} />
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
    maxWidth: 200,
    lineHeight: 18,
  },
  h3Bold: {
    fontFamily: "MerriweatherBold",
    color: "#352b2b",
    fontSize: 12,
  },
  error: {
    fontSize: 12,
    color: "red",
    maxWidth: 200,
    textAlign: "center",
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

export default SignupScreen;
