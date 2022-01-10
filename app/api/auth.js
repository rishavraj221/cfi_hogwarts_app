import { apiClient } from "./client";

const signup = (Username, Email, Password) =>
  apiClient.post("/signup", {
    body: {
      Username,
      Email,
      Password,
    },
    resource: "signup",
  });

const confirmEmail = (Username, Password, verificationCode) =>
  apiClient.post("/confirmemail", {
    body: {
      Username,
      Password,
      verificationCode,
    },
    resource: "confirmEmail",
  });

const login = (Username, Password) =>
  apiClient.post("/login", {
    body: {
      Username,
      Password,
    },
    resource: "login",
  });

export { signup, login, confirmEmail };
