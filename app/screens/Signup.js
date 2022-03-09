import React, { useState, useEffect } from "react";
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
import SignUpSVG from "../assets/Illustrations/SignUp";
import AppTextInput from "../components/TextInput";
import AppButton from "../components/Button";
import useInterval from "../hooks/useInterval";
import { createDynamoUser } from "../api/dynamo";
import useAuth from "../auth/useAuth";
import { showErrorToast, showSuccessToast } from "../components/Toast";

import routes from "../navigation/routes";

const otpValidationSchema = Yup.object().shape({
  verificationCode: Yup.string().matches("\\d{6}", "Please enter a valid code"),
});

const RESEND_CODE_TIME = 20;

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
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const [resendCodeBool, setResendCodeBool] = useState(true);
  const [resendCodeTimer, setResendCodeTimer] = useState(RESEND_CODE_TIME);

  useInterval(() => {
    if (resendCodeTimer > 0) setResendCodeTimer(resendCodeTimer - 1);
  }, 1000);

  const confirmEmailApi = async (Username, verificationCode) => {
    try {
      showSuccessToast("Verifying code...");
      setLoading(true);
      const result = await Auth.confirmSignUp(Username, verificationCode);
      setLoading(false);

      if (result !== "SUCCESS")
        showErrorToast("Something went wrong. Please try again later");
      else {
        showSuccessToast("Signup Successful, Logging in...");
        // navigation.navigate(routes.LOGIN);
        setLoading(true);
        const user = await Auth.signIn(Username, password);
        setLoading(false);

        if (!user)
          showErrorToast("Something went wrong. Please try again later");
        else showSuccessToast("Login Successful!");

        const dynamo_create = await createDynamoUser(Username);
        // console.log(dynamo_create);

        // console.log(JSON.stringify(user, null, 4));

        auth.logIn(user.signInUserSession.idToken.jwtToken);
      }
    } catch (error) {
      showErrorToast("error confirming sign up");
      setLoading(false);
      console.log(error);
    }
  };

  const signupApi = async (Username, Email, Password) => {
    try {
      showSuccessToast("Sending code...");
      setLoading(true);
      const { user } = await Auth.signUp({
        username: Username,
        password: Password,
        attributes: {
          email: Email,
        },
      });
      setLoading(false);
      setOTPSent(true);
      setResendCodeTimer(20);
      if (!user) showErrorToast("Something went wrong. Please try again later");
      else showSuccessToast("Verification Code Sent...");
    } catch (error) {
      showErrorToast("error signing up:", error);
      setLoading(false);
      console.log(error);
    }
  };

  const resendVerificationCode = async (Username) => {
    try {
      showSuccessToast("Sending code...");
      setLoading(true);
      const result = await Auth.resendSignUp(Username);
      setLoading(false);

      if (!result.CodeDeliveryDetails) showErrorToast("Something went wrong");
      else showSuccessToast("Code sent successfully");
      // console.log(result);
    } catch (err) {
      showErrorToast("error resending code");
      setLoading(false);
      console.log(err);
    }
  };

  const handleResendCode = () => {
    if (resendCodeTimer === 0) {
      resendVerificationCode(username);
      setResendCodeTimer(20);
    }
    return;
  };

  return (
    <Screen>
      <ScrollView style={{ backgroundColor: "white" }}>
        <LoginHeadSVG />
        <View style={styles.container}>
          {otpSent ? (
            <Formik
              initialValues={{ verificationCode: "" }}
              onSubmit={(e) => confirmEmailApi(username, e.verificationCode)}
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
                    Enter 6 digit verification code sent to{" "}
                    <AppText style={styles.h3Bold}>
                      {email.toLowerCase()}
                    </AppText>
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
                  <View style={styles.signupTextCont}>
                    <AppText style={styles.h3}>
                      Didn't receive the code yet?{" "}
                    </AppText>
                    <TouchableOpacity onPress={handleResendCode}>
                      <AppText
                        style={[
                          styles.h3Bold,
                          {
                            color:
                              resendCodeTimer === 0 ? "#352b2b" : "#767676",
                          },
                        ]}
                      >
                        Resend{" "}
                        {resendCodeTimer === 0 ? "" : `(${resendCodeTimer})`}
                      </AppText>
                    </TouchableOpacity>
                  </View>
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
                setUsername(e.username);
                setEmail(e.email);
                setPassword(e.password);
                signupApi(e.username, e.email, e.password);
              }}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.form}>
                  {loading && (
                    <AppText style={styles.apiStatus}>
                      Sending code to your mail ...
                    </AppText>
                  )}
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
