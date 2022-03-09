import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import Amplify, { Auth } from "aws-amplify";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import authStorage from "./app/auth/storage";
import AuthContext from "./app/auth/context";

LogBox.ignoreLogs(["Remote debugger"]);

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-west-2:218661ca-a257-480e-a694-ddae1b0ef7c7",

    // REQUIRED - Amazon Cognito Region
    region: "us-west-2",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "us-west-2",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-west-2_UEgmt1og9",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "45k6k31k2hrtd378kgh6u6us8r",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '.yourdomain.com',
    // // OPTIONAL - Cookie path
    //     path: '/',
    // // OPTIONAL - Cookie expiration in days
    //     expires: 365,
    // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //     sameSite: "strict" | "lax",
    // // OPTIONAL - Cookie secure flag
    // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //     secure: true
    // },

    // OPTIONAL - customized storage object
    // storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // OPTIONAL - Hosted UI configuration
    // oauth: {
    //     domain: 'your_cognito_domain',
    //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    //     redirectSignIn: 'http://localhost:3000/',
    //     redirectSignOut: 'http://localhost:3000/',
    //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    // }
  },
});

// You can get the current config object
const currentConfig = Auth.configure();

export default function App() {
  // const auth = useAuth();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [boardConnection, setBoardConnection] = useState(false);

  const loadAssetsAsync = async () => {
    await Font.loadAsync(fonts);
    setFontLoaded(true);
  };

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    loadAssetsAsync();
    restoreUser();
    setIsReady(true);
  }, []);

  if (!fontLoaded) return <AppLoading />;
  if (!isReady) return <AppLoading />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer>
        {user ? (
          <AppNavigator boardConnection={boardConnection} />
        ) : (
          <AuthNavigator />
        )}
        <Toast />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const fonts = {
  MerriweatherBlack: require("./app/assets/fonts/Merriweather/Merriweather-Black.ttf"),
  MerriweatherBlackItalic: require("./app/assets/fonts/Merriweather/Merriweather-BlackItalic.ttf"),
  MerriweatherBold: require("./app/assets/fonts/Merriweather/Merriweather-Bold.ttf"),
  MerriweatherBoldItalic: require("./app/assets/fonts/Merriweather/Merriweather-BoldItalic.ttf"),
  MerriweatherItalic: require("./app/assets/fonts/Merriweather/Merriweather-Italic.ttf"),
  MerriweatherLight: require("./app/assets/fonts/Merriweather/Merriweather-Light.ttf"),
  MerriweatherLightItalic: require("./app/assets/fonts/Merriweather/Merriweather-LightItalic.ttf"),
  MerriweatherRegular: require("./app/assets/fonts/Merriweather/Merriweather-Regular.ttf"),
  RobotoBlack: require("./app/assets/fonts/Roboto/Roboto-Black.ttf"),
  RobotoBlackItalic: require("./app/assets/fonts/Roboto/Roboto-BlackItalic.ttf"),
  RobotoBold: require("./app/assets/fonts/Roboto/Roboto-Bold.ttf"),
  RobotoBoldItalic: require("./app/assets/fonts/Roboto/Roboto-BoldItalic.ttf"),
  RobotoItalic: require("./app/assets/fonts/Roboto/Roboto-Italic.ttf"),
  RobotoLight: require("./app/assets/fonts/Roboto/Roboto-Light.ttf"),
  RobotoLightItalic: require("./app/assets/fonts/Roboto/Roboto-LightItalic.ttf"),
  RobotoMedium: require("./app/assets/fonts/Roboto/Roboto-Medium.ttf"),
  RobotoMediumItalic: require("./app/assets/fonts/Roboto/Roboto-MediumItalic.ttf"),
  RobotoRegular: require("./app/assets/fonts/Roboto/Roboto-Regular.ttf"),
  RobotoThin: require("./app/assets/fonts/Roboto/Roboto-Thin.ttf"),
  RobotoThinItalic: require("./app/assets/fonts/Roboto/Roboto-ThinItalic.ttf"),
};
