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
import { Auth } from "aws-amplify";

import AppText from "../components/Text";
import Screen from "../components/Screen";
import LoginHeadSVG from "../assets/Illustrations/LoginHead";
import LoginSVG from "../assets/Illustrations/Login";
import AppTextInput from "../components/TextInput";
import AppButton from "../components/Button";
import { login } from "../api/auth";
import useAuth from "../auth/useAuth";
import { showErrorToast, showSuccessToast } from "../components/Toast";

import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .label("Username"),
});

const otpValidationSchema = Yup.object().shape({
  verificationCode: Yup.string().matches("\\d{6}", "Please enter a valid code"),
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

const ForgotPasswordScreen = ({ navigation }) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const [codeSent, setCodeSent] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState("");

  const sendVerificationCode = async (Username) => {
    try {
      showSuccessToast("Sending code ...");
      setLoading(true);
      const result = await Auth.forgotPassword(Username);
      setLoading(false);

      if (!result.CodeDeliveryDetails)
        return showErrorToast("Something went wrong, please try again later");
      setUsername(Username);
      showSuccessToast("Reset code sent successfully");
      setEmail(result.CodeDeliveryDetails.Destination);
      setCodeSent(true);

      //   console.log(JSON.stringify(user, null, 4));
    } catch (error) {
      showErrorToast("Something went wrong. Please try again later");
      setLoading(false);
      console.log(error);
    }
  };

  const verifyCodeApi = async (Username, VerificationCode, NewPassword) => {
    try {
      showSuccessToast("Verifying code ...");
      setLoading(true);
      const result = await Auth.forgotPasswordSubmit(
        Username,
        VerificationCode,
        NewPassword
      );
      setLoading(false);

      if (result !== "SUCCESS")
        return showErrorToast(
          "Something went wrong, please try again later..."
        );
      showSuccessToast("Password change successful");
      navigation.navigate(routes.LOGIN);

      //   console.log(result);
    } catch (err) {
      showErrorToast("Something went wrong. Please try again later");
      setLoading(false);
    }
  };

  return (
    <Screen>
      <ScrollView style={{ backgroundColor: "white" }}>
        <LoginHeadSVG />
        <View style={styles.container}>
          {codeSent ? (
            <Formik
              initialValues={{ verificationCode: "" }}
              onSubmit={(e) =>
                verifyCodeApi(username, e.verificationCode, e.password)
              }
              validationSchema={otpValidationSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.form}>
                  {loading && (
                    <AppText style={styles.apiStatus}>
                      Verifying code ...
                    </AppText>
                  )}
                  <AppText style={styles.h3}>
                    Enter 6 digit password reset code sent to{" "}
                    <AppText style={styles.h3Bold}>
                      {email.toLowerCase()}
                    </AppText>
                  </AppText>
                  <AppTextInput
                    onChangeText={handleChange("verificationCode")}
                    onBlur={handleBlur("verificationCode")}
                    value={values.verificationCode}
                    keyboardType="number-pad"
                    placeholder="6 Digit Password Reset Code"
                    placeholderTextColor="#bcbcbc"
                    width={278}
                  />
                  {errors.verificationCode && (
                    <AppText style={styles.error}>
                      <ErrorMessage name="verificationCode" />
                    </AppText>
                  )}
                  <AppTextInput
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                    placeholder="New Password"
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
                    placeholder="Re-enter your new Password"
                    placeholderTextColor="#bcbcbc"
                    width={278}
                  />
                  {errors.reenterPassword && (
                    <AppText style={styles.error}>
                      <ErrorMessage name="reenterPassword" />
                    </AppText>
                  )}
                  <AppButton title="Verify" onPress={handleSubmit} />
                </View>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{ username: "" }}
              onSubmit={(e) => sendVerificationCode(e.username)}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.form}>
                  {loading && (
                    <AppText style={styles.apiStatus}>Loading...</AppText>
                  )}
                  <AppText style={styles.h3}>Your account is safe!</AppText>
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
                  <AppButton title="Submit" onPress={handleSubmit} />
                </View>
              )}
            </Formik>
          )}
          <View style={styles.signupTextCont}>
            <AppText style={styles.h3}>Remember your password? </AppText>
            <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
              <AppText style={styles.h3Bold}>Login</AppText>
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
  apiStatus: {
    fontFamily: "MerriweatherRegular",
    fontSize: 12,
    textAlign: "center",
    color: "green",
    marginBottom: 15,
  },
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

export default ForgotPasswordScreen;
