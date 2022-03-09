import { getDynamoUser } from "../api/dynamo";

export const getUserFromDB = async (username, setLoading, showErrorToast) => {
  try {
    setLoading(true);
    const { data } = await getDynamoUser(username);
    setLoading(false);
    // console.log(data);
    if (!data.Item) return showErrorToast("Something went wrong!");
    else {
      return data.Item;
    }
  } catch (ex) {
    showErrorToast("Something went wrong!");
    setLoading(false);
    console.log(ex);
  }
};
