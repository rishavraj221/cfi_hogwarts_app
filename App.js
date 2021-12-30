import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";

LogBox.ignoreLogs(["Remote debugger"]);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

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

  useEffect(() => {
    loadAssetsAsync();
  }, []);

  if (!fontLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
