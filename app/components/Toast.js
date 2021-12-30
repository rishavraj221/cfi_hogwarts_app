import Toast from "react-native-toast-message";

const showErrorToast = (message) => {
  Toast.show({
    type: "error",
    text1: message || "Something went wrong",
  });
};

const showSuccessToast = (message) => {
  Toast.show({
    type: "success",
    text1: message,
  });
};

export { showErrorToast, showSuccessToast };
