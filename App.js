import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import authStorage from "./app/auth/storage";
import AuthContext from "./app/auth/context";

LogBox.ignoreLogs(["Remote debugger"]);

export default function App() {
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
