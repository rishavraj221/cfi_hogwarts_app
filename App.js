import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import authStorage from "./app/auth/storage";
import AuthContext from "./app/auth/context";
import Home from "./app/screens/home";

LogBox.ignoreLogs(["Remote debugger"]);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    await Font.loadAsync({
      MerriweatherBlack: require("./app/assets/fonts/Merriweather/Merriweather-Black.ttf"),
      MerriweatherBlackItalic: require("./app/assets/fonts/Merriweather/Merriweather-BlackItalic.ttf"),
      MerriweatherBold: require("./app/assets/fonts/Merriweather/Merriweather-Bold.ttf"),
      MerriweatherBoldItalic: require("./app/assets/fonts/Merriweather/Merriweather-BoldItalic.ttf"),
      MerriweatherItalic: require("./app/assets/fonts/Merriweather/Merriweather-Italic.ttf"),
      MerriweatherLight: require("./app/assets/fonts/Merriweather/Merriweather-Light.ttf"),
      MerriweatherLightItalic: require("./app/assets/fonts/Merriweather/Merriweather-LightItalic.ttf"),
      MerriweatherRegular: require("./app/assets/fonts/Merriweather/Merriweather-Regular.ttf"),
    });
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
        {user ? <Home /> : <AuthNavigator />}
        <Toast />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
