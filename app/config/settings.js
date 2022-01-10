import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://adw5css8n5.execute-api.us-west-2.amazonaws.com/prod",
  },
  staging: {
    apiUrl: "https://adw5css8n5.execute-api.us-west-2.amazonaws.com/prod",
  },
  prod: {
    apiUrl: "https://adw5css8n5.execute-api.us-west-2.amazonaws.com/prod",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
