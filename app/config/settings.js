import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://maxfit.herokuapp.com/api/v1",
  },
  staging: {
    apiUrl: "https://maxfit.herokuapp.com/api/v1",
  },
  prod: {
    apiUrl: "https://maxfit.herokuapp.com/api/v1",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
